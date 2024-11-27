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

interface SignInCardProps {
   setState: (state: SignInFlow) => void;
   setIsLoading?: (state: boolean) => void;
}

const formSchema = z.object({
   email: z.string().email({ message: "Oops, that email won't work, please enter a valid one." }),
   password: z.string().min(8),
});
const SignInCard = ({ setState }: SignInCardProps) => {
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
      <div className="container mb-24 lg:mb-32">
         <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-slate-900 dark:text-slate-200 justify-center">
            Login
         </h2>
         <div className="max-w-md mx-auto space-y-6">
            <Oauth />
            <DividerLabel containerClassName="max-w-md mx-auto" label="Or" />
            <Form {...form}>
               <form className="grid grid-cols-1 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                  {/* EMAIL INPUT */}
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <InputLabel
                                 label="Email"
                                 type="email"
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
                              <InputLabel
                                 type="password"
                                 label="Pasword"
                                 placeholder="********"
                                 rightLabel={
                                    <Link
                                       className="text-sm font-normal dark:text-slate-300"
                                       href="#"
                                    >
                                       Forgot password?
                                    </Link>
                                 }
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* BUTTON SUBMITED */}
                  <ButtonLoading
                     loading={isLoading}
                     type="submit"
                     className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-0"
                  >
                     Continune
                  </ButtonLoading>
               </form>
            </Form>
            <span className="block text-center text-slate-700 dark:text-slate-300">
               New user?{' '}
               <span
                  className="cursor-pointer hover:text-slate-400"
                  onClick={() => setState('signUp')}
               >
                  Create an account
               </span>
            </span>
         </div>
      </div>
   );
};

export default SignInCard;
