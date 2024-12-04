import { motion } from 'framer-motion';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface TabContextProps {
  selected: string;
  setSelected: (text: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

interface TabProps {
  children: ReactNode;
  defaultTab?: string;
}

const Tab = ({ children, defaultTab }: TabProps) => {
  const [selected, setSelected] = useState<string>(defaultTab || '');

  useEffect(() => {
    if (!defaultTab && React.Children.count(children) > 0) {
      // Find the first Tab.Trigger element and use its text as the default tab
      const firstTab = React.Children.toArray(children).find(
        (child: ReactNode) =>
          React.isValidElement(child) && child.type === Tab.Trigger,
      ) as ReactElement;

      if (firstTab) {
        setSelected(firstTab.props.text);
      }
    }
  }, [defaultTab, children]);

  return (
    <TabContext.Provider value={{ selected, setSelected }}>
      <div className="flex w-full flex-col">{children}</div>
    </TabContext.Provider>
  );
};

interface TabTriggerProps {
  text: string;
  className?: string;
}

const TabTrigger = ({ text, className }: TabTriggerProps) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('TabTrigger must be used within a Tab');
  }

  const { selected, setSelected } = context;

  const isSelected = selected === text;

  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        isSelected
          ? 'text-white'
          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
      } relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${className}`}
    >
      <span className="relative z-10">{text}</span>
      {isSelected && (
        <motion.span
          layoutId="tab"
          transition={{ type: 'spring', duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-md bg-red-500"
        ></motion.span>
      )}
    </button>
  );
};

interface TabContentProps {
  text: string;
  children: ReactNode;
}

const TabContent = ({ text, children }: TabContentProps) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('TabContent must be used within a Tab');
  }

  const { selected } = context;

  if (selected !== text) {
    return null;
  }

  return <div className="mt-4">{children}</div>;
};

Tab.Trigger = TabTrigger;
Tab.Content = TabContent;

export default Tab;
