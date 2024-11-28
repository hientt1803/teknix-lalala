import dynamic from 'next/dynamic';

const GroupPeopleInput = dynamic(() =>
   import('./selectGuestInput').then((mod) => mod.GroupPeopleInput),
);

export const InputSearchGuest = () => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">Guest</div>

         {/* Custom guest input */}
         <GroupPeopleInput />
      </div>
   );
};
