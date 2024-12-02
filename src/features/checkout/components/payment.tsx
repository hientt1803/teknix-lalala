'use client';

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
import { PayWithCreditCard } from './payment-card';
import CreditCardUser from './credit-card-user';

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
         <h3 className="text-xl font-semibold">Pay with</h3>
         <span className="text-sm text-neutral-400 mt-3">Choose your payment gateway.</span>
         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5" />
         <div className="mt-6">
            <RadioGroup
               value={paymentValue}
               onValueChange={setPaymentValue}
               className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
               {dataPayments?.map((pay) => (
                  <div key={pay.id}>
                     <RadioGroupItem value={pay.id} id={pay.id} className="peer sr-only" />
                     <Label
                        htmlFor={pay.id}
                        className="flex flex-col space-y-1 items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-400 [&:has([data-state=checked])]:border-blue-400 cursor-pointer"
                     >
                        <div className="relative aspect-video flex justify-center items-center">
                           <div className="size-10 text-[#635bff]">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2304 1536">
                                 <path
                                    fill="currentColor"
                                    d="M1597 775q0 69-21 106q-19 35-52 35q-23 0-41-9V683q29-30 57-30q57 0 57 122m438-36h-110q6-98 56-98q51 0 54 98M476 874q0-59-33-91.5T342 725q-36-13-52-24t-16-25q0-26 38-26q58 0 124 33l18-112q-67-32-149-32q-77 0-123 38q-48 39-48 109q0 58 32.5 90.5T266 833q39 14 54.5 25.5T336 886q0 31-48 31q-29 0-70-12.5T146 874l-18 113q72 41 168 41q81 0 129-37q51-41 51-117m295-215l19-111h-96V413l-129 21l-18 114l-46 8l-17 103h62v219q0 84 44 120q38 30 111 30q32 0 79-11V899q-32 7-44 7q-42 0-42-50V659zm316 25V545q-15-3-28-3q-32 0-55.5 16T970 604l-10-56H829v471h150V713q26-31 82-31q16 0 26 2m37 335h150V548h-150zm622-249q0-122-45-179q-40-52-111-52q-64 0-117 56l-8-47h-132v645l150-25v-151q36 11 68 11q83 0 134-56q61-65 61-202m-468-348q0-33-23-56t-56-23t-56 23t-23 56t23 56.5t56 23.5t56-23.5t23-56.5m898 357q0-113-48-176q-50-64-144-64q-96 0-151.5 66T1777 785q0 128 63 188q55 55 161 55q101 0 160-40l-16-103q-57 31-128 31q-43 0-63-19q-23-19-28-66h248q2-14 2-52m128-651v1280q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V128q0-52 38-90t90-38h2048q52 0 90 38t38 90"
                                 ></path>
                              </svg>
                           </div>
                        </div>
                        <span className="capitalize">{pay.name}</span>
                     </Label>
                  </div>
               ))}
               <div key={'credit'}>
                  <RadioGroupItem value={'credit'} id={'credit'} className="peer sr-only" />
                  <Label
                     htmlFor={'credit'}
                     className="flex flex-col space-y-1 items-center justify-between text-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-400 [&:has([data-state=checked])]:border-blue-400 cursor-pointer"
                  >
                     <div className="relative aspect-video flex justify-center items-center">
                        {/* <img
                                    src={"/credit-card.png"}
                                    className="w-full h-full object-contain"
                                    alt="Credit Card Logo"
                                /> */}
                        <div className="size-10">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 199">
                              <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805"></path>
                              <path fill="#ff5f00" d="M93.298 16.903h69.15v124.251h-69.15z"></path>
                              <path
                                 fill="#eb001b"
                                 d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125"
                              ></path>
                              <path
                                 fill="#f79e1b"
                                 d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
                              ></path>
                           </svg>
                        </div>
                     </div>
                     <span className="capitalize">Credit Cards</span>
                  </Label>
               </div>
            </RadioGroup>
            {paymentValue === 'credit' && (
               <>
                  {/* <div className="w-14 border-b border-neutral-200 my-5 space-y-8" /> */}
                  <CreditCardUser />
               </>
            )}
            <div className="pt-8 flex flex-1 justify-end">
               <ButtonLoading
                  onClick={handleConfirmPayment}
                  loading={isLoadingCreatePayment}
                  // disabled={true}
                  disabled={!paymentValue}
                  className="relative h-auto inline-flex items-center justify-center rounded-lg transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6   disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0 "
               >
                  Confirm and pay
               </ButtonLoading>
            </div>
         </div>
      </div>
   );
};

export default Payment;
