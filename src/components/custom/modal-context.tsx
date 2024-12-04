import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface FramerModalProps {
  children: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function FramerModal({
  children,
  open: controlledOpen,
  setOpen: controlledSetOpen,
}: FramerModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen === undefined ? internalOpen : controlledOpen;
  const setOpen =
    controlledSetOpen === undefined ? setInternalOpen : controlledSetOpen;
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-20 flex h-screen w-full cursor-zoom-out flex-col items-center justify-center border bg-white/90 backdrop-blur-sm dark:bg-black/90"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border bg-white/5 p-6 backdrop-blur-2xl"
            >
              <button
                className="absolute right-2 top-2"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
