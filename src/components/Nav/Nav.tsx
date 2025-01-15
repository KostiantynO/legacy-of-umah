// src\components\Nav\Nav.tsx
import { BackButton } from './BackButton';
import { HomeButton } from './HomeButton';
// import { LinkItem } from './LinkItem';

// import type { NavLink } from '@/types/pages';

// const links: NavLink[] = [
//   { href: '/', text: 'Home' },
//   //
// ];

export const Nav = ({ prev }: { prev: string | null }) => {
  // const linksList = links.map(({ href, text }) => (
  //   <LinkItem key={href} href={href}>
  //     {text}
  //   </LinkItem>
  // ));

  return (
    <nav className="flex items-center justify-between">
      <div>{prev && <BackButton prev={prev} />}</div>
      {/* <ul className="flex gap-x-4">{linksList}</ul> */}
      <HomeButton />
    </nav>
  );
};
