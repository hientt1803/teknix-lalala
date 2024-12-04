import { User } from 'lucide-react';

export const InputSearchGuestSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        Guest
      </div>
      <div className="flex w-full items-center justify-start gap-1">
        <User className="h-5 w-5 text-neutral-400" />
        <div className="text-sm font-medium text-neutral-600">
          1 adults · 0 children · 1 room
        </div>
      </div>
    </div>
  );
};
