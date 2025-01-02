// src\components\Header.tsx
import { Container } from './Container';
import { Nav } from './Nav';

export const Header = () => {
  return (
    <header className="h-16 border-b border-gray-700 bg-gray-800">
      <Container>
        <Nav />
      </Container>
    </header>
  );
};
