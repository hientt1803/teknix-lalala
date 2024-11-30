import { ImageFieldImage } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

export const BackgroundImage = ({ image }: { image: ImageFieldImage }) => {
   return (
      <PrismicNextImage
         field={image}
         alt=""
         className="absolute w-full h-full object-cover z-0 bg-fixed bg-top"
         loading="lazy"
      />
   );
};

export const BackGroundImageSkeleton = () => {
   return (
      <div className="relative space-y-5 border border-neutral-100 dark:border-neutral-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-neutral-100/10 before:bg-gradient-to-r before:from-transparent before:via-neutral-100/70 dark:before:via-neutral-100/10 before:to-transparent">
         <div className="h-[60.625rem] rounded-lg bg-neutral-100/80"></div>
         <div className="space-y-3">
            <div className="h-[60.625rem] w-full bg-neutral-100/50"></div>
         </div>
      </div>
   );
};
