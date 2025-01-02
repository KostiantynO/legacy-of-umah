// src\app\page.tsx
import { Container } from '@/components/Container';
import { PreviewList } from '@/components/PreviewList/PreviewList';

const HomePage = () => {
  return (
    <main className="h-full font-[family-name:var(--font-geist-sans)]">
      <Container>
        <PreviewList />
      </Container>
    </main>
  );
};

export default HomePage;
