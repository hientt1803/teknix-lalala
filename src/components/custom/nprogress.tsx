'use client';

import { useProgressStore } from '@/hooks/use-progress';

const NProgressbar: React.FC = () => {
  const { progress, isVisible } = useProgressStore();

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-[9999] w-full">
      <div
        className="h-1 rounded-full bg-gradient-to-r from-[#e59c48] via-[#a6557e] to-[#5ea698]"
        style={{
          width: `${progress}%`,
          transition: 'width 0.5s ease-in-out',
        }}
      />
    </div>
  );
};

export default NProgressbar;
