'use client';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React, { ReactElement, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Type for AccordionContext
interface AccordionContextType {
  isActive: boolean;
  value: string;
  onChangeIndex: (value: string) => void;
}

// Create AccordionContext with proper typing
const AccordionContext = React.createContext<AccordionContextType | undefined>(
  undefined,
);
const useAccordion = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion');
  }
  return context;
};

// AccordionContainer
export function AccordionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-2 gap-1', className)}>{children}</div>
  );
}

// AccordionWrapper
export function AccordionWrapper({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

// Accordion
export function Accordion({
  children,
  multiple = false,
  defaultValue,
}: {
  children: ReactNode;
  multiple?: boolean;
  defaultValue?: string | string[];
}) {
  const [activeIndex, setActiveIndex] = React.useState<
    string | string[] | null
  >(multiple ? defaultValue || [] : defaultValue || null);

  const onChangeIndex = (value: string) => {
    setActiveIndex(currentActiveIndex => {
      if (!multiple) {
        return value === currentActiveIndex ? null : value;
      }

      if (
        Array.isArray(currentActiveIndex) &&
        currentActiveIndex.includes(value)
      ) {
        return currentActiveIndex.filter(index => index !== value);
      }

      return [
        ...(Array.isArray(currentActiveIndex) ? currentActiveIndex : []),
        value,
      ];
    });
  };

  return (
    <>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null; // Ensure child is a valid React element
        const value = child.props.value;
        const isActive = multiple
          ? Array.isArray(activeIndex) && activeIndex.includes(value)
          : activeIndex === value;

        return (
          <AccordionContext.Provider value={{ isActive, value, onChangeIndex }}>
            {child}
          </AccordionContext.Provider>
        );
      })}
    </>
  );
}

// AccordionItem
export function AccordionItem({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  const { isActive } = useAccordion();

  const cardVariants: Variants = {
    collapsed: {
      height: 'fit-content',
      minHeight: '80px',
      opacity: 0.8,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
  };

  return (
    <motion.div
      className={`mb-2 overflow-hidden rounded-xl ${
        isActive
          ? 'active border border-neutral-100 bg-white hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900'
          : 'border border-neutral-200 bg-transparent dark:border-neutral-600'
      }`}
      variants={cardVariants}
      initial="collapsed"
      animate={isActive ? 'expanded' : 'collapsed'}
    >
      {children}
    </motion.div>
  );
}

// AccordionHeader
export function AccordionHeader({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  const { isActive, value, onChangeIndex } = useAccordion();

  const chevronVariants: Variants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 135 },
  };

  return (
    <motion.div
      className={`flex cursor-pointer items-center justify-between gap-4 p-4 font-semibold text-black transition-all hover:text-black dark:text-white dark:hover:bg-neutral-600 ${
        isActive
          ? 'active bg-white dark:bg-neutral-700'
          : 'bg-white dark:bg-neutral-800'
      }`}
      onClick={() => onChangeIndex(value)}
    >
      {children}

      <Button
        size="icon"
        variant={isActive ? 'default' : 'ghost'}
        className={cn('rounded-lg')}
      >
        {icon ? (
          <motion.div
            variants={chevronVariants}
            animate={isActive ? 'expanded' : 'collapsed'}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {icon}
          </motion.div>
        ) : (
          <motion.div
            variants={chevronVariants}
            animate={isActive ? 'expanded' : 'collapsed'}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <ChevronDown />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}

// AccordionPanel
export function AccordionPanel({ children }: { children: ReactNode }) {
  const { isActive } = useAccordion();

  const panelVariants: Variants = {
    collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
    expanded: { height: 'auto', opacity: 1, overflow: 'hidden' },
  };

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={panelVariants}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className="bg-white dark:bg-neutral-900"
        >
          <motion.article
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            className="bg-transparent p-3 text-black"
          >
            {children}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
