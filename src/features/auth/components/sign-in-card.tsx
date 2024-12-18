import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import ButtonLoading from '@/components/custom/buttons/button-loading';
import DividerLabel from '@/components/custom/dividers/divider';
import InputLabel from '@/components/custom/input/input-label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { RequestLogin, useLoginMutation } from '@/stores/features/user';

import { SignInFlow } from '../types';
import Oauth from './oauth';

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
  setIsLoading?: (state: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Oops, that email won't work, please enter a valid one.",
  }),
  password: z.string().min(4),
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
      <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-200 md:text-5xl md:leading-[115%]">
        Login
      </h2>
      <div className="mx-auto max-w-md space-y-6">
        <Oauth />
        <DividerLabel containerClassName="max-w-md mx-auto" label="Or" />
        <Form {...form}>
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                          className="text-sm font-normal dark:text-neutral-300"
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
              className="relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 dark:focus:ring-offset-0 sm:px-6 sm:text-base"
            >
              Continune
            </ButtonLoading>
          </form>
        </Form>
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user?{' '}
          <span
            className="cursor-pointer hover:text-neutral-400"
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
