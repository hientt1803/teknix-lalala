import Link from 'next/link';
import { SignInFlow } from '../types';

import { RequestLogin, useLoginMutation } from '@/stores/features/user';
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';
import DividerLabel from '@/components/custom/dividers/divider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Oauth from './oauth';
import InputLabel from '@/components/custom/input/input-label';
import ButtonLoading from '@/components/custom/buttons/button-loading';
import { ArrowRight } from 'lucide-react';
import InputIcon from '@/components/custom/input/input-icon';
import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';

interface SignInCardDialogProps {
   setState: (state: SignInFlow) => void;
   setIsLoading?: (state: boolean) => void;
}

const formSchema = z.object({
   email: z.string().email({ message: "Oops, that email won't work, please enter a valid one." }),
   password: z.string().min(4),
});

const SignInCardDialog = ({ setState }: SignInCardDialogProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [login, { isLoading }] = useLoginMutation();
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         const loginData: RequestLogin = {
            email: values.email,
            password: values.password,
         };

         const res = await login(loginData).unwrap();
         if (res) {
            toast({
               title: 'Success',
               description: 'Login succesfully!!',
               variant: 'success',
            });

            const redirectUrl = searchParams.get('redirect');
            if (redirectUrl) {
               if (redirectUrl) {
                  router.push(redirectUrl);
               } else {
                  router.push('/');
               }
            }
         }
      } catch (error) {
         console.error('Form submission error', error);
         toast({
            title: 'Error',
            description: 'Some thing went error',
            variant: 'destructive',
         });
      }
   };

   return (
    <div className="w-full flex flex-col justify-start items-start gap-3 p-5">
    <div className="flex items-center gap-3 w-full">
       <Image src="/lalala.svg" className="w-16" />
       <h2 className="text-4xl font-semibold">Hello there!</h2>
    </div>
    <div className="flex gap-2 items-center flex-nowrap w-full">
       <Button
          variant={'outline'}
          className="py-7 px-6 flex-grow border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700"
       >
          <img src="/icons/google-icon.svg" className="flex-shrink w-6 h-6" />
          <h3 className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
             Sign in with Google
          </h3>
       </Button>
       <Button
          variant={'outline'}
          className="h-14 w-14 border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700"
          size="icon"
       >
          <img src="/icons/facebook-icon.svg" className="flex-shrink w-6 h-6" />
       </Button>
       <Button
          variant={'outline'}
          size="icon"
          className="h-14 w-14 border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700"
       >
          <img src="/icons/twitter-icon.svg" className="flex-shrink w-6 h-6" />
       </Button>
    </div>
    <Form {...form}>
       <form className="grid grid-cols-1 gap-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          {/* EMAIL INPUT */}
          <FormField
             control={form.control}
             name="email"
             render={({ field }) => (
                <FormItem>
                   <FormControl>
                      {/* <InputLabel
                         label="Email"
                         type="email"
                         placeholder="example@gmail.com"
                         {...field}
                      /> */}
                      <InputIcon
                         type="email"
                         icon="email"
                         label="Email"
                         className="bg-neutral-100"
                         placeholder="example@gmail.com"
                         {...field}
                      />
                   </FormControl>
                   <FormMessage />
                </FormItem>
             )}
          />

          {/* PASSWORD INPUT */}
          <FormField
             control={form.control}
             name="password"
             render={({ field }) => (
                <FormItem>
                   <FormControl>
                      {/* <InputLabel
                         type="password"
                         label="Pasword"
                         placeholder="********"
                         rightLabel={
                            <Link className="text-sm font-normal dark:text-neutral-300" href="#">
                               Forgot password?
                            </Link>
                         }
                         {...field}
                      /> */}
                      <InputIcon
                         type="password"
                         icon="password"
                         label="Password"
                         className="bg-neutral-100"
                         placeholder="********"
                         {...field}
                      />
                   </FormControl>
                   <FormMessage />
                </FormItem>
             )}
          />
          <div className="flex w-full justify-end items-end">
             <span className="text-xs hover:underline cursor-pointer text-neutral-600">
                Forgot password?
             </span>
          </div>

          {/* BUTTON SUBMITED */}
          <ButtonLoading
             loading={isLoading}
             type="submit"
             className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-0 w-fit mt-6"
          >
             Login <ArrowRight className="w-5 h-5" />
          </ButtonLoading>
       </form>
    </Form>
    <span className="block text-center text-neutral-700 dark:text-neutral-300 mt-8">
       New user?{' '}
       <span
          className="cursor-pointer hover:text-neutral-400"
             onClick={() => setState('signUp')}
       >
          Create an account
       </span>
    </span>
 </div>
   );
};

export default SignInCardDialog;
