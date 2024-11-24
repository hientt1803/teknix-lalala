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
};

export const MainButton = (props: MainButtonType) => {
   const { className, text, variant = 'default', color = '#fefa17', rightIcon, leftIcon } = props;
   return (
      <Button variant={variant} color={color} className={cn(className)}>
         {leftIcon}

         {text || 'View More'}

         {rightIcon}
      </Button>
   );
};
