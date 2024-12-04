import { Loader2Icon } from 'lucide-react';

import { Button, ButtonProps } from '../ui/button';

interface ButtonLoadingProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const ButtonLoading = ({ children, loading, ...props }: ButtonLoadingProps) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonLoading;
