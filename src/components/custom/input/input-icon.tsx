import { Lock, LucideIcon, User } from 'lucide-react';
import React from 'react';

import { Input, InputProps } from '@/components/ui/input'; // Assume Input has exported props
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputIconProps extends InputProps {
  label?: string; // Optional label text
  icon: 'email' | 'password';
}

const InputIcon: React.FC<InputIconProps> = ({
  label,
  icon,
  id,
  className,
  ...rest
}) => {
  return (
    <div className="block">
      {label && (
        <Label htmlFor={id} className="mb-3 text-sm font-normal">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={id}
          className={cn(
            'h-14 w-full rounded-md border-gray-200 ps-10 text-sm shadow-sm sm:text-base',
            className,
          )}
          {...rest} // Pass all additional props to Input
        />

        <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
          {icon === 'email' && <User className="h-5 w-5" />}
          {icon === 'password' && <Lock className="h-5 w-5" />}
        </span>
      </div>
    </div>
  );
};

export default InputIcon;
