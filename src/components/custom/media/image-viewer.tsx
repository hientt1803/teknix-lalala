'use client';

import 'react-photo-view/dist/react-photo-view.css';

import React, { useEffect, useRef } from 'react';
import { PhotoSlider } from 'react-photo-view';

import Image from '@/components/common/images/image';

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
        const scrollPosition =
          thumbnailOffset - containerWidth / 2 + thumbnailWidth / 2;

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
      images={images.map(item => ({ src: item, key: item }))}
      visible={visible}
      onClose={e => {
        onClose();
        e?.preventDefault();
        e?.stopPropagation();
      }}
      index={indexImg}
      onIndexChange={onIndexChange}
      overlayRender={({ images }) => (
        <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex min-h-20 max-w-7xl items-center justify-center gap-2 bg-zinc-100/5">
          <div
            ref={thumbnailsRef}
            className="scrollbar-hide flex gap-2 overflow-x-scroll p-3 px-4"
          >
            {images.map((img, index) => (
              <div
                key={index}
                className={`scrollbar-hide h-16 w-20 flex-shrink-0 cursor-pointer ${
                  index === indexImg
                    ? 'z-20 scale-125 overflow-hidden rounded-2xl border-4 border-white brightness-100'
                    : 'aspect-[4/3] brightness-50 contrast-125 hover:brightness-75'
                }`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onIndexChange(index);
                }}
              >
                <Image
                  className="h-full w-full object-cover"
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
