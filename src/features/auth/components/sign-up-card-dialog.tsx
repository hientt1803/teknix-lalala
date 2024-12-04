import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Image from '@/components/common/images/image';
import ButtonLoading from '@/components/custom/buttons/button-loading';
import DividerLabel from '@/components/custom/dividers/divider';
import InputIcon from '@/components/custom/input/input-icon';
import InputLabel from '@/components/custom/input/input-label';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import {
  IRequestRegister,
  RequestLogin,
  useLoginMutation,
  useRegisterMutation,
} from '@/stores/features/user';

import { SignInFlow } from '../types';
import Oauth from './oauth';

interface SignUpCardDialogProps {
  setState: (state: SignInFlow) => void;
  setIsLoading?: (state: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Oops, that email won't work, please enter a valid one.",
  }),
  password: z.string().min(8),
});
const SignUpCardDialog = ({ setState }: SignUpCardDialogProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: IRequestRegister = {
        email: values.email,
        password: values.password,
      };

      const res = await register(data).unwrap();
      if (res) {
        toast({
          title: 'Success',
          description: 'Create new an account succesfully!!',
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
    <div className="flex w-full flex-col items-start justify-start gap-3 p-5">
      <div className="flex w-full items-center gap-3">
        <Image src="/lalala.svg" className="w-16" />
        <h2 className="text-4xl font-semibold">Hello there!</h2>
      </div>
      <div className="flex w-full flex-nowrap items-center gap-2">
        <Button
          variant={'outline'}
          className="flex-grow border-neutral-200 bg-neutral-100 px-6 py-7 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <img src="/icons/google-icon.svg" className="h-6 w-6 flex-shrink" />
          <h3 className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            Sign in with Google
          </h3>
        </Button>
        <Button
          variant={'outline'}
          className="h-14 w-14 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
          size="icon"
        >
          <img src="/icons/facebook-icon.svg" className="h-6 w-6 flex-shrink" />
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className="h-14 w-14 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <img src="/icons/twitter-icon.svg" className="h-6 w-6 flex-shrink" />
        </Button>
      </div>

      <Form {...form}>
        <form
          className="grid w-full grid-cols-1 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* EMAIL INPUT */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
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
          {/* BUTTON SUBMITED */}
          <ButtonLoading
            loading={isLoading}
            type="submit"
            className="relative inline-flex h-auto w-fit items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 dark:focus:ring-offset-0 sm:px-6 sm:text-base"
          >
            Continune
          </ButtonLoading>
        </form>
      </Form>
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        Already have an account?{' '}
        <span
          className="cursor-pointer hover:text-neutral-400"
          onClick={() => setState('signIn')}
        >
          Sign in
        </span>
      </span>
    </div>
  );
};

export default SignUpCardDialog;
