import dynamic from 'next/dynamic';

import { AuthSkeleton } from '@/features/auth/components/auth-screen';

const AuthContainer = dynamic(
  () => import('@/features/auth/index').then(mob => mob.AuthContainer),
  {
    ssr: false,
    loading: () => <AuthSkeleton />,
  },
);
const AuthPage = () => {
  return <AuthContainer />;
};

export default AuthPage;
