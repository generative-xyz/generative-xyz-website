import NextLink from 'next/link';
import { ReactNode } from 'react';

type LinkProps = {
  onClick?: () => void;
  children: ReactNode;
  href: string;
  className?: string;
};

export default function Link({
  onClick,
  children,
  className,
  href,
  ...rest
}: LinkProps) {
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
      className={className}
      {...rest}
      passHref
    >
      {children}
    </NextLink>
  );
}
