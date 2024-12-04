import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputLabel from '@/components/custom/input/input-label';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

// Define the form schema using zod
const schema = z.object({
  cardNumber: z.string(),
  cardHolder: z.string().min(2, 'Name must have at least 2 characters'),
  expirationDate: z
    .string()
    .refine(
      value => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value),
      'Invalid expiration date',
    ),
  cvc: z
    .string()
    .refine(value => /^\d{3,4}$/.test(value), 'CVC must be 3 or 4 digits'),
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
    <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
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
                  className="focus:border-primary-300 focus:ring-primary-200 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm focus:ring"
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
                  className="focus:border-primary-300 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm uppercase"
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
                    className="focus:border-primary-300 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm"
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
                    className="focus:border-primary-300 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm"
                    pattern="\d{3,4}"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-end justify-end">
            <Button type="submit" className="rounded-lg px-5 py-6">
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
