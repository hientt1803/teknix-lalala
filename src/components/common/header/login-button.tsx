import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import AuthDialogScreen from '@/features/auth/components/auth-dialog';
import AuthScreen from '@/features/auth/components/auth-screen';
import { useAppSelector } from '@/stores';
import { onClose, onOpen } from '@/stores/features/dialog';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
// const AuthScreen = dynamic(import('@/features/auth/components/auth-screen'), {
//     ssr: false,
//     loading: () => <div>Loading...</div>,

// });
const LoginButton = () => {
   const dispatch = useDispatch();
   const isOpen = useAppSelector((state) => state.dialogSlice.isOpen);
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
            <Button className="rounded-full hidden lg:flex" variant="secondary">
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
