// 'use client';
import Badge from '@/components/custom/badges/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { PaymentOptions } from '@/stores/features/reservation';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { CircleHelpIcon } from 'lucide-react';
import { useMemo } from 'react';

interface PriceSectionProps {
   paymentOptions: PaymentOptions;
   total_discount: number;
}
const PriceSection = ({ paymentOptions, total_discount }: PriceSectionProps) => {
   const { tax_data, show_amount, show_currency_code } = paymentOptions.payment_types[0];
   const totalPrice = Number(show_amount) - total_discount;

   const taxes = useMemo(() => {
      const taxes = tax_data?.taxes || [];

      const includedTaxes = taxes.filter((tax) => tax.included_by_supplier === true);
      const notIncludedTaxes = taxes.filter((tax) => tax.included_by_supplier === false);

      return {
         includedTaxes,
         notIncludedTaxes,
      };
   }, [paymentOptions]);
   return (
      <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-neutral-50 rounded-2xl">
         <h1 className="text-xl font-bold p-5">Price Summary</h1>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="p-5 grid grid-cols-1 gap-4 text-slate-600">
            <div className="flex justify-between items-center">
               <span className="text-sm">Room Charges</span>
               <span>{formatCurrencyWithCodeAsSuffix(show_amount, show_currency_code)}</span>
            </div>
            <div className="flex justify-between items-center">
               <p className="text-sm flex items-center gap-2">
                  Total Discount
                  {total_discount !== 0 && (
                     <Badge color="red" className="px-2 py-[1px] rounded text-white bg-rose-600">
                        10% off
                     </Badge>
                  )}
               </p>
               <span
                  className={cn({
                     'text-teal-600': total_discount > 0,
                  })}
               >
                  {formatCurrencyWithCodeAsSuffix(total_discount, show_currency_code)}
               </span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm">Price after discount</span>
               <span>{formatCurrencyWithCodeAsSuffix(totalPrice, show_currency_code)}</span>
            </div>
         </div>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="p-5 grid grid-cols-1 gap-4 text-slate-600">
            <div className="flex justify-between items-start space-x-5">
               <p className="text-sm text-slate-800  dark:text-slate-400">
                  Approximate price in VND: the currency rate might change at the time of payment.
               </p>

               {/* Tooltip wrapper cho CircleHelpIcon */}
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <span className="cursor-pointer">
                           <CircleHelpIcon className="w-4 h-4" />
                        </span>
                     </TooltipTrigger>
                     <TooltipContent side="top" align="center" className="max-w-xs">
                        <p className="text-slate-500">
                           This is an estimate and the final amount might vary depending on the
                           currency exchange rate at the time of payment.
                        </p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
            {taxes.includedTaxes.map((tax, index) => (
               <div key={index} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{tax.name.replaceAll('_', ' ')}</span>
                  <span>{formatCurrencyWithCodeAsSuffix(tax.amount, tax.currency_code)}</span>
               </div>
            ))}
         </div>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="p-5 grid grid-cols-1 gap-4 text-slate-600">
            {taxes.notIncludedTaxes.map((tax, index) => (
               <div key={index} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{tax.name.replaceAll('_', ' ')}</span>
                  <span>{formatCurrencyWithCodeAsSuffix(tax.amount, tax.currency_code)}</span>
               </div>
            ))}
         </div>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="flex justify-between items-center p-5">
            <div className="text-lg font-bold">Total Price</div>
            <div className="text-lg font-bold">
               {formatCurrencyWithCodeAsSuffix(show_amount, show_currency_code)}
            </div>
         </div>
      </div>
   );
};

export default PriceSection;
