import Header from '@/components/common/header';
import { ThemeProvider } from './theme-provider';

interface ApplicationProps {
   children: React.ReactNode;
}

const AppProvider = ({ children }: ApplicationProps) => {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <Header />
         {children}
      </ThemeProvider>
   );
};

export default AppProvider;
