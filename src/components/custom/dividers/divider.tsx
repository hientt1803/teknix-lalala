import { SeparatorProps } from '@radix-ui/react-separator';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface DividerProps extends SeparatorProps {
  label?: React.ReactNode;
  containerClassName?: string;
}

const DividerLabel = ({
  label,
  containerClassName = '', // Default empty string
  orientation = 'horizontal', // Default orientation
  ...props
}: DividerProps) => {
  const renderSeparator = () => (
    <Separator orientation={orientation} {...props} />
  );

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 overflow-hidden',
        orientation === 'vertical' ? 'flex-col' : 'flex-row', // Handle orientation with flex direction
        containerClassName,
      )}
    >
      {label ? (
        <>
          {renderSeparator()}
          {label}
          {renderSeparator()}
        </>
      ) : (
        renderSeparator()
      )}
    </div>
  );
};

export default DividerLabel;
