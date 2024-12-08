Hey, my lovely Sis!

How are you? :D

Ready for some action?

Could you help me please ?:D

I want to migrate Umah blog from pages to app router in next.js v15

So, I had `pages` dir. I just simply renamed it to `app` dir.

Here are old files, that were in `pages` dir:

```tsx
// ---pages/_app.tsx
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/header';
import { Auth0Provider } from '@auth0/auth0-react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Clone and deploy your own Next.js portfolio in minutes."
        />
        <title>My awesome blog</title>
      </Head>

      <Header />

      <main className="py-14">
        <Component {...pageProps} />
      </main>
    </Auth0Provider>
  );
}
```

```tsx
// --- pages/_document.tsx ---
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <body className="bg-white text-gray-700 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

```tsx
// --- pages/index.tsx ---
import Container from '../components/container';
import Image from 'next/image';

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Hey, I'm a Senior Software Engineer at Company. I enjoy working with
            Next.js and crafting beautiful front-end experiences.
          </h1>
          <p>
            This portfolio is built with Next.js and a library called next-mdx.
            It allows you to write Markdown and focus on the content of your
            portfolio.
          </p>

          <p>Deploy your own in a few minutes.</p>
        </div>
      </Container>

      <div className="container max-w-4xl m-auto px-4 mt-20">
        <Image
          src="/desk.jpg"
          alt="my desk"
          width={1920 / 2}
          height={1280 / 2}
        />
      </div>
    </>
  );
}

export default HomePage;
```

```tsx
// --- pages/api/comment.ts ---
import type { NextApiRequest, NextApiResponse } from 'next';
import fetchComment from '../../lib/fetchComment';
import createComments from '../../lib/createComment';
import deleteComments from '../../lib/deleteComment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return fetchComment(req, res);
    case 'POST':
      return createComments(req, res);
    case 'DELETE':
      return deleteComments(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method.' });
  }
}
```

```tsx
// --- pages/posts/[slug].tsx ---
import type { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Comment from '../../components/comment';
import Container from '../../components/container';
import distanceToNow from '../../lib/dateRelative';
import { getAllPosts, getPostBySlug } from '../../lib/getPost';
import markdownToHtml from '../../lib/markdownToHtml';
import Head from 'next/head';

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>{post.title} | My awesome blog</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <h1 className="text-4xl font-bold">{post.title}</h1>
              {post.excerpt ? (
                <p className="mt-2 text-xl">{post.excerpt}</p>
              ) : null}
              <time className="flex mt-2 text-gray-400">
                {distanceToNow(new Date(post.date))}
              </time>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <Comment />
        </div>
      )}
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'excerpt',
    'date',
    'content',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
```

```tsx
// --- pages/posts/index.tsx ---
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Container from '../../components/container';
import distanceToNow from '../../lib/dateRelative';
import { getAllPosts } from '../../lib/getPost';

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'date']);

  return {
    props: { allPosts },
  };
}
```
