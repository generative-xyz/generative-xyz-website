import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

type LinkProps = {
  onClick?: () => void;
  href: string;
  className?: string;
};

export default function Link({
  onClick,
  children,
  className,
  href,
  ...rest
}: PropsWithChildren<LinkProps>) {
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
