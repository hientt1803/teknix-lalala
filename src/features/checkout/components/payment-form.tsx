import 'react-credit-cards-2/dist/es/styles-compiled.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputLabel from '@/components/custom/input/input-label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Cards from 'react-credit-cards-2';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Define the form schema using zod
const schema = z.object({
   cardNumber: z.string(),
   cardHolder: z.string().min(2, 'Name must have at least 2 characters'),
   expirationDate: z
      .string()
      .refine((value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), 'Invalid expiration date'),
   cvc: z.string().refine((value) => /^\d{3,4}$/.test(value), 'CVC must be 3 or 4 digits'),
});

const PaymentForm = () => {

   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         cardNumber: '',
         cardHolder: '',
         expirationDate: '',
         cvc: '',
      },
   });

   const onSubmit = (values: z.infer<typeof schema>) => {
      console.log('Form Data:', values);
   };


   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-7 gap-5">
         <div className="relative">
            {/* <Cards
               number={cardValue.cardNumber}
               expiry={cardValue.expirationDate}
               cvc={cardValue.cvc}
               name={cardValue.cardHolder}
               preview
               issuer={issuer}
            /> */}
         </div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
               <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                     <FormItem>
                        <InputLabel
                           sizes="small"
                           {...field}
                           label="Card number"
                           pattern="[\d| ]{16,22}"
                           placeholder="1111 2222 3333 4444"
                           className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 bg-white rounded-lg text-sm h-11 px-4"
                           
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="cardHolder"
                  render={({ field }) => (
                     <FormItem>
                        <InputLabel
                           sizes="small"
                           {...field}
                           label="Card holder"
                           placeholder="JOHN DOE"
                           className="block uppercase w-full border-neutral-200 focus:border-primary-300 bg-white rounded-lg text-sm h-11 px-4"
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex space-x-5">
                  <FormField
                     control={form.control}
                     name="expirationDate"
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <InputLabel
                              sizes="small"
                              {...field}
                              label="Expiration date"
                              placeholder="MM/YY"
                              className="block w-full border-neutral-200 focus:border-primary-300 bg-white rounded-lg text-sm h-11 px-4"
                                pattern="\d\d/\d\d"
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="cvc"
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <InputLabel
                              sizes="small"
                              {...field}
                              label="CVC"
                              placeholder="123"
                              className="block w-full border-neutral-200 focus:border-primary-300 bg-white rounded-lg text-sm h-11 px-4"
                              pattern="\d{3,4}"
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex items-end justify-end">
                  <Button type="submit" className="py-6 px-5 rounded-lg">
                     <Plus className="size-5" />
                     Add card
                  </Button>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default PaymentForm;
