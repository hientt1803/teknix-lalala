'use client';

import Image from '@/components/common/images/image';
import React, { useEffect, useRef } from 'react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface ImageViewerProps {
   images: string[];
   visible: boolean; // Parent controls visibility
   onClose: () => void; // Callback when closing the viewer
   indexImg: number; // The current index to start from
   onIndexChange: (index: number) => void; // Callback to update the index
}

const ImageViewer: React.FC<ImageViewerProps> = ({
   images,
   visible,
   onClose,
   indexImg,
   onIndexChange,
}) => {
   const thumbnailsRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (thumbnailsRef.current) {
         const container = thumbnailsRef.current;
         const selectedThumbnail = container.children[indexImg] as HTMLElement;

         if (selectedThumbnail) {
            // Get the container's width and the thumbnail's position
            const containerWidth = container.offsetWidth;
            const thumbnailWidth = selectedThumbnail.offsetWidth;

            // Calculate the desired scroll position
            const thumbnailOffset = selectedThumbnail.offsetLeft;
            const scrollPosition = thumbnailOffset - containerWidth / 2 + thumbnailWidth / 2;

            // Smoothly adjust the scroll position
            container.scrollTo({
               left: scrollPosition,
               behavior: 'smooth',
            });
         }
      }
   }, [indexImg]);

   return (
      <PhotoSlider
         images={images.map((item) => ({ src: item, key: item }))}
         visible={visible}
         onClose={(e) => {
            onClose();
            e?.preventDefault();
            e?.stopPropagation();
         }}
         index={indexImg}
         onIndexChange={onIndexChange}
         overlayRender={({ images }) => (
            <div className="max-w-7xl min-h-20 z-20 bg-zinc-100/5 absolute bottom-0 inset-x-0 mx-auto flex items-center justify-center gap-2">
               <div
                  ref={thumbnailsRef}
                  className="flex gap-2 overflow-x-scroll px-4 p-3 scrollbar-hide"
               >
                  {images.map((img, i) => (
                     <div
                        key={i}
                        className={`w-20 h-16 scrollbar-hide cursor-pointer flex-shrink-0 ${
                           i === indexImg
                              ? 'brightness-100 scale-125 z-20 border-4 border-white rounded-2xl overflow-hidden'
                              : 'brightness-50 contrast-125 hover:brightness-75 aspect-[4/3]'
                        }`}
                        onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           onIndexChange(i);
                        }}
                     >
                        <Image
                           className="object-cover w-full h-full"
                           src={img.src}
                           loading="lazy"
                           alt=""
                        />
                     </div>
                  ))}
               </div>
            </div>
         )}
      />
   );
};

export default ImageViewer;
