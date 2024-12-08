import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import matter from 'gray-matter';

import type { Post } from '../interfaces';

const postsDirectory = join(process.cwd(), '_posts');

export const getPostSlugs = async () => readdir(postsDirectory);

export const getPostBySlug = async (slug: string, fields: string[] = []) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Post = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
};

export const getAllPosts = async (fields: string[] = []) => {
  const slugs = await getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
