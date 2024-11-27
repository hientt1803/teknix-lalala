import { Label } from '@radix-ui/react-label';
import { Input, InputProps } from '@/components/ui/input';
import { useId } from 'react';
import { cn } from '@/lib/utils';

interface InputLabelProps extends InputProps {
   label?: string;
   rightLabel?: React.ReactNode;
   sizes?: 'small' | 'medium';
}

const InputLabel = ({
   label,
   required,
   rightLabel,
   sizes = 'medium',
   id,
   ...props
}: InputLabelProps) => {
   const generatedId = useId();
   const inputId = id || generatedId;

   return (
      <div className="block">
         {label && (
            <span className="flex justify-between items-center text-slate-800 mb-1">
               <Label
                  className={cn('text-slate-900 dark:text-slate-300', {
                     'text-sm font-medium': sizes === 'small',
                     'text-base': sizes === 'medium',
                  })}
                  htmlFor={inputId}
               >
                  {label} {required && <span className="text-red-500">*</span>}
               </Label>
               {rightLabel}
            </span>
         )}
         <Input
            id={inputId}
            className="block w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
            {...props}
         />
      </div>
   );
};

export default InputLabel;