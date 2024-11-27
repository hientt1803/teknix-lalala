'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useCallback } from 'react';

interface IGroupInputQuantity {
   quantity: number;
   setQuantity?: (newQuantity: number) => void | any;
   buttonClassName?: string;
   inputClassName?: string;
   wrapperClassName?: string;
}

export const GroupInputQuantity = ({
   quantity,
   setQuantity,
   buttonClassName,
   inputClassName,
   wrapperClassName,
}: IGroupInputQuantity) => {
   const handleOnChangeQuantity = useCallback(
      (action: string) => {
         switch (action) {
            case 'incr':
               if (quantity < 6) {
                  setQuantity && setQuantity(quantity + 1);
               }
               break;

            case 'descr':
               if (quantity > 1) {
                  setQuantity && setQuantity(quantity - 1);
               }
               break;

            default:
               return quantity;
         }
      },
      [quantity, setQuantity],
   );

   const handleOnChangeQuantityInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const newQuantity = Number(e.target.value);
         if (newQuantity > 0) {
            setQuantity && setQuantity(newQuantity);
         }
      },
      [setQuantity],
   );

   return (
      <span className={cn('flex gap-1 overflow-hidden', wrapperClassName)}>
         {/* Decrement Button */}
         <Button
            variant="ghost"
            size="icon"
            className={cn(
               'border border-neutral-300 rounded-full mr-1 text-xl text-neutral-900',
               quantity <= 1 && 'text-neutral-900 cursor-not-allowed',
               buttonClassName,
            )}
            onClick={() => handleOnChangeQuantity('descr')}
            disabled={quantity <= 1}
         >
            -
         </Button>

         {/* Input */}
         <Input
            type="number"
            value={quantity}
            onChange={handleOnChangeQuantityInput}
            className={cn(
               'text-center text-xl p-0 border-none focus:ring-0 focus:outline-none',
               quantity && quantity.toString().length > 1 ? 'w-12' : 'w-9',
               inputClassName,
            )}
         />

         {/* Increment Button */}
         <Button
            variant="ghost"
            size="icon"
            className={cn(
               'border border-neutral-300 rounded-full mr-1 text-xl text-neutral-900',
               quantity >= 6 && 'text-neutral-900 cursor-not-allowed',
               buttonClassName,
            )}
            onClick={() => handleOnChangeQuantity('incr')}
            disabled={quantity >= 6}
         >
            +
         </Button>
      </span>
   );
};
