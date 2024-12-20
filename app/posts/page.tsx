import Link from 'next/link';

import Container from '../../components/container';
import distanceToNow from '../../lib/dateRelative';
import { getAllPosts } from '../../lib/getPost';

import type { InferGetStaticPropsType } from 'next';

export const NotePage = ({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      {allPosts.length ? (
        allPosts.map(post => (
          <article key={post.slug} className="mb-10">
            <Link
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className="text-lg leading-6 font-bold"
            >
              {post.title}
            </Link>
            <p>{post.excerpt}</p>
            <div className="text-gray-400">
              <time>{distanceToNow(new Date(post.date))}</time>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  );
};

export const getStaticProps = async () => {
  const allPosts = await getAllPosts(['slug', 'title', 'excerpt', 'date']);

  return {
    props: { allPosts },
  };
};
