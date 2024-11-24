import Header from '@/components/common/header';
import { ThemeProvider } from './theme-provider';
import StoreProvider from './store-provider';
import Footer from '@/components/common/footer';

interface ApplicationProps {
    children: React.ReactNode;
}

const AppProvider = ({ children }: ApplicationProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <StoreProvider>
                <Header />
                {children}
                <Footer />
            </StoreProvider>
        </ThemeProvider>
    );
};

export default AppProvider;
