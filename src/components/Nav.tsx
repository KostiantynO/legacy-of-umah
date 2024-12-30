import Link from 'next/link';

export interface NavLink {
  href: string;
  text: string;
}

const links: NavLink[] = [
  { href: '/', text: 'About' },
  { href: '/posts', text: 'Posts' },
];

const LinkItem = ({ href, text }: NavLink) => (
  <li>
    <Link href={href}>{text}</Link>
  </li>
);

export const Nav = () => {
  const linksList = links.map(LinkItem);

  return (
    <nav>
      <ul className="flex gap-x-4">{linksList}</ul>
    </nav>
  );
};
