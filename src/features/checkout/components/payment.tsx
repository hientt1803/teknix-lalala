"use client"

import ButtonLoading from '@/components/custom/buttons/button-loading';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores/hook';
import {
   IPaymentRequest,
   useCreatePaymentMutation,
   useGetPaymentMethodsQuery,
} from '@/stores/features/payment';
import { IReserveForm } from '@/stores/features/stay/type';
import { useState } from 'react';
import PaymentForm from './payment-form';

type Props = {
   isConfirm?: boolean;
   hotel: IReserveForm;
};
const Payment = ({ isConfirm, hotel }: Props) => {
   // redux
   const reservationId = useAppSelector((state) => state.reservationSlice.currentReservation);
   const globalCurrency = useAppSelector((state) => state.globalSlice.searchGlobal.currency.code);

   // api
   const { data: dataPayments, isLoading: isLoadingPayment } = useGetPaymentMethodsQuery({});

   const [createPayment, { isLoading: isLoadingCreatePayment }] = useCreatePaymentMutation();
   const [paymentValue, setPaymentValue] = useState('');
   const handleConfirmPayment = async () => {
      try {
         const req: IPaymentRequest = {
            payment_method: paymentValue,
            reservation_id: reservationId.id,
            currency:
               hotel?.rate?.payment_options?.payment_types[0]?.show_currency_code ||
               globalCurrency ||
               'USD',
         };

         const res = await createPayment(req).unwrap();
         if (res) {
            console.log(res);

            window.location.href = res.payment_link.payment_link.href;
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div
         className={cn({
            hidden: !isConfirm,
         })}
      >
         <h3 className="text-2xl font-semibold">Pay with</h3>
         <span className="text-base text-slate-400 mt-3">Choose your payment gateway.</span>
         <div className="w-14 border-b border-slate-200 my-5" />
         <div className="mt-6">
            <RadioGroup
               value={paymentValue}
               onValueChange={setPaymentValue}
               className="grid grid-cols-4 gap-4"
            >
               {dataPayments?.map((pay) => (
                  <div key={pay.id}>
                     <RadioGroupItem value={pay.id} id={pay.id} className="peer sr-only" />
                     <Label
                        htmlFor={pay.id}
                        className="flex flex-col space-y-1 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-400 [&:has([data-state=checked])]:border-blue-400 cursor-pointer"
                     >
                        <div className="relative aspect-video flex justify-center items-center">
                           {/* <img
                                        src={pay.logo}
                                        className=" w-full h-full  object-cover"
                                        alt="Pay Logo"
                                    /> */}
                           <i className="lab la-stripe text-6xl"></i>
                        </div>
                        <span className="capitalize">{pay.name}</span>
                     </Label>
                  </div>
               ))}
               <div key={'credit'}>
                  <RadioGroupItem value={'credit'} id={'credit'} className="peer sr-only" />
                  <Label
                     htmlFor={'credit'}
                     className="flex flex-col space-y-1 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-400 [&:has([data-state=checked])]:border-blue-400 cursor-pointer"
                  >
                     <div className="relative aspect-video flex justify-center items-center">
                        {/* <img
                                    src={"/credit-card.png"}
                                    className="w-full h-full object-contain"
                                    alt="Credit Card Logo"
                                /> */}
                        <i className="lab la-cc-visa text-6xl"></i>
                     </div>
                     <span className="capitalize">Credit Cards</span>
                  </Label>
               </div>
            </RadioGroup>
            {paymentValue === 'credit' && (
               <>
                  <div className="w-14 border-b border-slate-200 my-5" />
                  <PaymentForm />
               </>
            )}
            <div className="pt-8 flex flex-1 justify-end">
               <ButtonLoading
                  onClick={handleConfirmPayment}
                  loading={isLoadingCreatePayment}
                  // disabled={true}
                  disabled={!paymentValue}
                  className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6   disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0 "
               >
                  Confirm and pay
               </ButtonLoading>
            </div>
         </div>
      </div>
   );
};

export default Payment;
