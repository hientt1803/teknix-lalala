import { User } from 'lucide-react';
import dynamic from 'next/dynamic';

const GroupPeopleInput = dynamic(
  () => import('./selectGuestInput').then(module_ => module_.GroupPeopleInput),
  {
    loading: () => (
      <div className="flex w-full items-center justify-start gap-1">
        <User className="h-5 w-5 text-neutral-400" />
        <div className="text-sm font-medium text-neutral-600">
          1 adults · 0 children · 1 room
        </div>
      </div>
    ),
  },
);

export const InputSearchGuest = ({ title = 'Guest' }: { title?: string }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        {title}
      </div>

      {/* Custom guest input */}
      <GroupPeopleInput />
    </div>
  );
};
