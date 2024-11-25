import MainLayout from '@/layouts/mainLayout';
import StoreProvider from './store-provider';
import { ThemeProvider } from './theme-provider';

interface ApplicationProps {
   children: React.ReactNode;
}

const AppProvider = ({ children }: ApplicationProps) => {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <StoreProvider>
            {/* <Header /> */}
            <MainLayout>{children}</MainLayout>
            {/* <Footer /> */}
         </StoreProvider>
      </ThemeProvider>
   );
};

export default AppProvider;
