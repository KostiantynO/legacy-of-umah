// src\app\lore\[slug]\page.tsx
import { Container } from '@/components/Container';
import { getSlugs } from '@/components/PreviewList/lib/getSlugs';

import { Article } from './Article';

export const generateStaticParams = async () =>
  (await getSlugs()).map(slug => ({ slug }));

const LorePage = async ({ params }: { params: { slug: string } }) => {
  // eslint-disable-next-line no-warning-comments
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { slug } = await params;

  return (
    <Container>
      <Article slug={slug} />
      {/* <Comments /> */}
    </Container>
  );
};

export default LorePage;
