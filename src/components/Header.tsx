// src\components\Header.tsx
import { Container } from './Container';
import { Nav } from './Nav';

export const Header = () => {
  return (
    <header className="h-16">
      <Container>
        <Nav />
      </Container>
    </header>
  );
};
