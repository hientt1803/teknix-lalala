import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputLabel from '@/components/custom/input/input-label';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

// Define the form schema using zod
const schema = z.object({
   cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, 'Card number is invalid'),
   cardHolder: z.string().min(2, 'Name must have at least 2 characters'),
   expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date'),
   cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
   message: z.string().optional(),
});

const PaymentForm = () => {
   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         cardNumber: '',
         cardHolder: '',
         expirationDate: '',
         cvc: '',
         message: '',
      },
   });

   // Format card number to only allow numbers and add a space every 4 digits
   const formatCardNumber = (value: string) => {
      return value
         .replace(/\D/g, '') // Remove all non-numeric characters
         .replace(/(.{4})/g, '$1 ') // Insert a space every 4 digits
         .trim(); // Remove any trailing spaces
   };

   // Format expiration date as MM/YY
   const formatExpirationDate = (value: string) => {
      return value
         .replace(/\D/g, '') // Remove all non-numeric characters
         .replace(/(\d{2})(\d{1,2})?/, '$1/$2') // Add a '/' after MM
         .substring(0, 5); // Limit to MM/YY format
   };

   // Format CVC to only accept 3-4 numeric characters
   const formatCVC = (value: string) => {
      return value.replace(/\D/g, '').substring(0, 4); // Limit to 4 digits max
   };

   const onSubmit = (values: z.infer<typeof schema>) => {
      console.log('Form Data:', values);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 space-y-5">
            <FormField
               control={form.control}
               name="cardNumber"
               render={({ field }) => (
                  <FormItem>
                     <InputLabel
                        sizes="small"
                        {...field}
                        label="Card number"
                        placeholder="1111 2222 3333 4444"
                        className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3"
                        onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
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
                        className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3"
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
                           className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3"
                           onChange={(e) => field.onChange(formatExpirationDate(e.target.value))}
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
                           className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3"
                           onChange={(e) => field.onChange(formatCVC(e.target.value))}
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <FormField
               control={form.control}
               name="message"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                        Message
                     </FormLabel>
                     <FormControl>
                        <Textarea
                           {...field}
                           placeholder="Write a few sentences about yourself."
                           rows={4}
                           className="min-h-[150px] block w-full border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal px-4 py-3 mt-1"
                        />
                     </FormControl>
                     <FormDescription>
                        <span className="text-sm text-neutral-500 block">
                           Write a few sentences about yourself.
                        </span>
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <button
               type="submit"
               className="mt-4 w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
               Submit Payment
            </button>
         </form>
      </Form>
   );
};

export default PaymentForm;
