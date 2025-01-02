// src\components\Footer.tsx
import { Container } from './Container';

export const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-700 bg-gray-800">
      <Container className="text-center">
        <p className="text-gray-400">
          © {currYear} Legacy of Umah by Ash. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};
