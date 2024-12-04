import { Label } from '@radix-ui/react-label';
import { Mail } from 'lucide-react';
import { useId } from 'react';
import { boolean, optional } from 'zod';

import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputLabelProps extends InputProps {
  label?: string;
  rightLabel?: React.ReactNode;
  sizes?: 'small' | 'medium';
  requiredLabel?: boolean;
}

const InputLabel = ({
  label,
  required = false,
  requiredLabel = false,
  rightLabel,
  sizes = 'medium',
  className,
  id,
  ...props
}: InputLabelProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="block">
      {label && (
        <span className="mb-1 flex items-center justify-between text-neutral-800">
          <Label
            className={cn('text-neutral-900 dark:text-neutral-300', {
              'text-sm font-medium': sizes === 'small',
              'text-base': sizes === 'medium',
            })}
            htmlFor={inputId}
          >
            {label} {required && <span className="text-red-500">*</span>}
            {!required && requiredLabel && (
              <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                (optional)
              </span>
            )}
          </Label>
          {rightLabel}
        </span>
      )}

      <Input
        id={inputId}
        className={cn(
          'focus:border-primary-300 focus:ring-primary-200 mt-1 block h-11 min-h-11 w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-800',
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default InputLabel;
