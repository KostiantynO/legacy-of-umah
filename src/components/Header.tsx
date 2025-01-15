// src\components\Header.tsx
import { Container } from './Container';
import { Nav } from './Nav/Nav';

export const Header = ({ prev }: { prev: string | null }) => {
  return (
    <header>
      <Container>
        <Nav prev={prev} />
      </Container>
    </header>
  );
};
