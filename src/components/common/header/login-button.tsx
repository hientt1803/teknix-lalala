import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AuthDialogScreen from '@/features/auth/components/auth-dialog';
import { useAppSelector } from '@/stores/hook';
import { onClose, onOpen } from '@/stores/features/dialog';
// const AuthScreen = dynamic(import('@/features/auth/components/auth-screen'), {
//     ssr: false,
//     loading: () => <div>Loading...</div>,

// });
const LoginButton = () => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector(state => state.dialogSlice.isOpen);
  const handleChange = () => {
    if (isOpen) {
      dispatch(onClose());
    } else {
      dispatch(onOpen());
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogTrigger asChild>
        <Button className="hidden rounded-full lg:flex" variant="secondary">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* <ScrollArea> */}
        <AuthDialogScreen />
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
