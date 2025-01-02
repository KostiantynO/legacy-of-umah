// src\components\Nav\LinkItem.tsx
import Link from "next/link";

import type { ReactNode } from "react";

export const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <li>
    <Link href={href}>{children}</Link>
  </li>
);
