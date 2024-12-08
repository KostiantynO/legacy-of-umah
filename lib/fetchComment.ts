import { clearUrl } from './clearUrl';
import redis from './redis';

import type { Comment } from '../interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

export const fetchComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { referer } = req.headers;

  if (!referer) {
    res.status(500).json({ message: 'No referer.' });
    return;
  }

  const url = clearUrl(referer);

  if (!redis) {
    res.status(500).json({ message: 'Failed to connect to redis.' });
    return;
  }

  try {
    // get data
    const rawComments = await redis.lrange(url, 0, -1);

    // string data to object
    const comments = rawComments.map(c => {
      const comment: Comment = JSON.parse(c);
      delete comment.user.email;
      return comment;
    });

    res.status(200).json(comments);
    return;
  } catch (_) {
    res.status(400).json({ message: 'Unexpected error occurred.' });
    return;
  }
};
