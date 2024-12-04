import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MainButtonType = {
  text?: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  color?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
};

export const MainButton = (props: MainButtonType) => {
  const {
    className,
    text,
    variant = 'default',
    color = '#fefa17',
    rightIcon,
    leftIcon,
    children,
    fullWidth = false,
  } = props;

  return (
    <Button
      variant={variant}
      color={color}
      className={cn(
        `overflow-hidden rounded-[1.75rem] bg-[#fefa17] px-5 py-7 text-xl font-medium text-black transition-all duration-200 ease-in-out hover:bg-neutral-50 hover:text-black`,
        className,
        fullWidth && 'w-full',
      )}
    >
      {leftIcon}

      {children ? <>{children}</> : <>{text || 'View More'}</>}

      {rightIcon}
    </Button>
  );
};
