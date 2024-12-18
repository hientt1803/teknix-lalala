import { cn } from '@/lib/utils';

type BadgeProps = {
  children: string | React.ReactNode;
  color?:
    | 'blue'
    | 'red'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'gray'
    | 'orange'
    | 'teal'
    | 'white';
  className?: string;
  onClick?: () => void;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'white',
  className,
  onClick,
}) => {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
    red: { bg: 'bg-red-100', text: 'text-red-800' },
    green: { bg: 'bg-green-100', text: 'text-green-800' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-800' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-800' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-800' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-800' },
    white: { bg: 'bg-white', text: 'text-neutral-900' },
  };

  const selectedColor = colorClasses[color];

  return (
    <span
      onClick={onClick && onClick}
      className={cn(
        'inline-flex truncate rounded-full px-2.5 py-1 text-xs font-medium',
        selectedColor.bg,
        selectedColor.text,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
