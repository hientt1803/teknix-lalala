import { User } from 'lucide-react';
import dynamic from 'next/dynamic';

const GroupPeopleInput = dynamic(
   () => import('./selectGuestInput').then((mod) => mod.GroupPeopleInput),
   {
      loading: () => (
         <div className="w-full flex justify-start items-center gap-1">
            <User className="text-neutral-400 w-5 h-5" />
            <div className="text-neutral-600 text-sm font-medium">
               2 adults · 0 children · 1 room
            </div>
         </div>
      ),
   },
);

export const InputSearchGuest = () => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">Guest</div>

         {/* Custom guest input */}
         <GroupPeopleInput />
      </div>
   );
};
