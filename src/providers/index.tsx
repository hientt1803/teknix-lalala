import MainLayout from '@/layouts/mainLayout';
import StoreProvider from './store-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';
import dynamic from 'next/dynamic';

export const ScrollToTopButton = dynamic(
   () => import('@/components/custom/buttons/scroll-to-top-button').then((mod) => mod.default),
   {
      ssr: false,
   },
);

const NProgressbarLazy = dynamic(() => import('@/components/custom/nprogress'), {
   ssr: false,
});

interface ApplicationProps {
   children: React.ReactNode;
}

const AppProvider = ({ children }: ApplicationProps) => {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <StoreProvider>
            <div vaul-drawer-wrapper="" className="bg-background">
               <MainLayout>{children}</MainLayout>
               <Toaster />
               <ScrollToTopButton />
               <NProgressbarLazy />
            </div>
         </StoreProvider>
      </ThemeProvider>
   );
};

export default AppProvider;
