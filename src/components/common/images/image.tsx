'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
   fallback?: React.ReactNode;
   className?: string; // Class dành cho thẻ div
}

const Image: React.FC<ImageProps> = ({
   src,
   alt,
   fallback = null,
   className, // className dành cho div
   ...rest
}) => {
   const [hasError, setHasError] = useState(false);

   const handleError = () => {
      setHasError(true);
   };

   return (
      <div className={cn('relative', className)}>
         {!hasError ? (
            <img
               src={src}
               alt={alt}
               {...rest}
               onError={handleError}
               className="object-cover w-full h-full"
            />
         ) : (
            <div className="flex items-center justify-center w-full h-full border border-slate-300 rounded-2xl">
               {fallback ? (
                  fallback
               ) : (
                  <svg
                     className="w-32 h-32 text-slate-300"
                     xmlns="http://www.w3.org/2000/svg"
                     width="1em"
                     height="1em"
                     viewBox="0 0 24 24"
                  >
                     <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                     >
                        <path d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9" />
                        <path d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5" />
                        <path d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5" />
                     </g>
                  </svg>
               )}
            </div>
         )}
      </div>
   );
};

export default Image;
