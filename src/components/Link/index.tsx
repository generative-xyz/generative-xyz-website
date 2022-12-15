import NextLink from 'next/link';
import { ReactNode } from 'react';

type LinkProps = {
  onClick?: () => void;
  children: ReactNode;
  href: URL | '#';
};

export default function Link({ onClick, children, href, ...rest }: LinkProps) {
  return (
    <NextLink
      href={href}
      onClick={
        onClick
          ? e => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      {...rest}
      passHref
    >
      {children}
    </NextLink>
  );
}
