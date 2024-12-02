'use client';

import { useProgressStore } from '@/hooks/use-progress';

const NProgressbar: React.FC = () => {
   const { progress, isVisible } = useProgressStore();

   if (!isVisible) return null;

   return (
      <div className="fixed top-0 left-0 w-full z-[9999]">
         <div
            className="h-1 bg-gradient-to-r from-[#e59c48] via-[#a6557e] to-[#5ea698] rounded-full"
            style={{
               width: `${progress}%`,
               transition: 'width 0.5s ease-in-out',
            }}
         />
      </div>
   );
};

export default NProgressbar;
