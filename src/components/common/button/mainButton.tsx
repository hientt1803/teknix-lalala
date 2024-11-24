import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

type MainButtonType = {
   text?: string;
   className?: string;
   variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
   color?: string;
   rightIcon?: React.ReactNode;
   leftIcon?: React.ReactNode;
   children?: React.ReactNode;
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
   } = props;

   return (
      <Button
         variant={variant}
         color={color}
         className={cn(
            `bg-[#fefa17] hover:bg-neutral-50 text-black hover:text-black font-medium rounded-[1.75rem] text-xl px-5 py-7 transition-all duration-200 ease-in-out overflow-hidden`,
            className,
         )}
      >
         {leftIcon}

         {children ? <>{children}</> : <>{text || 'View More'}</>}

         {rightIcon}
      </Button>
   );
};
