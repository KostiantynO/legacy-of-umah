// src\components\Nav.tsx
import { LinkItem } from './Nav/LinkItem';

import type { NavLink } from '@/types/pages';

const links: NavLink[] = [
  { href: '/', text: 'Home' },
  // { href: '/posts', text: 'Posts' },
];

export const Nav = () => {
  const linksList = links.map(({ href, text }) => (
    <LinkItem key={href} href={href}>
      {text}
    </LinkItem>
  ));

  return (
    <nav>
      <ul className="flex gap-x-4">{linksList}</ul>
    </nav>
  );
};
