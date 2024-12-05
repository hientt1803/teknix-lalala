'use client';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
  className?: string; // Class dành cho thẻ div
  classNameImage?: string; // Class dành cho thẻ div
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
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
      {hasError ? (
        // Hiển thị fallback khi xảy ra lỗi
        <div className="flex h-full w-full items-center justify-center rounded border border-neutral-100 dark:border-neutral-800">
          {fallback || (
            <div className="flex h-full w-full flex-1 items-center justify-center bg-neutral-100 dark:bg-neutral-700">
              <svg
                className="h-32 w-32 text-white dark:text-neutral-400"
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
      ) : (
        <img
          src={src}
          alt={alt}
          {...rest}
          onError={handleError} // Xử lý lỗi
          className={cn('h-full w-full object-cover', classNameImage)}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Image;
