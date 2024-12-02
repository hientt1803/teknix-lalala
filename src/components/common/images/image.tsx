'use client';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
   fallback?: React.ReactNode;
   className?: string; // Class dành cho thẻ div
   classNameImage?: string; // Class dành cho thẻ div
}

const Image: React.FC<ImageProps> = ({
   src,
   alt,
   fallback,
   className, // className dành cho div
   classNameImage,
   ...rest
}) => {
   const [hasError, setHasError] = useState(true);

   useEffect(() => {
      // Reset trạng thái khi src thay đổi
      setHasError(false);
   }, [src]);

   const handleError = () => {
      setHasError(true); // Đánh dấu trạng thái lỗi khi load ảnh
   };

   return (
      <div className={cn('relative overflow-hidden', className)}>
         {/* Hiển thị ảnh nếu không lỗi */}
         {!hasError ? (
            <img
               src={src}
               alt={alt}
               {...rest}
               onError={handleError} // Xử lý lỗi
               className={cn('w-full h-full object-cover ', classNameImage)}
               loading="lazy"
            />
         ) : (
            // Hiển thị fallback khi xảy ra lỗi
            <div className="flex items-center justify-center w-full h-full border border-neutral-100 dark:border-neutral-800 rounded">
               {fallback ? (
                  fallback
               ) : (
                  <div className="h-full w-full flex flex-1 justify-center items-center bg-neutral-100 dark:bg-neutral-700">
                     <svg
                        className="w-32 h-32 text-white dark:text-neutral-400"
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
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default Image;
