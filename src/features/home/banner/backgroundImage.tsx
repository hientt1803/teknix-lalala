import { ImageFieldImage } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

export const BackgroundImage = ({ image }: { image: ImageFieldImage }) => {
  return (
    <PrismicNextImage
      field={image}
      alt=""
      className="absolute z-0 h-full w-full bg-fixed bg-top object-cover"
      loading="lazy"
    />
  );
};

export const BackGroundImageSkeleton = () => {
  return (
    <div className="relative space-y-5 overflow-hidden rounded-2xl border border-neutral-100 bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-neutral-100/10 before:bg-gradient-to-r before:from-transparent before:via-neutral-100/70 before:to-transparent dark:border-neutral-700 dark:before:via-neutral-100/10">
      <div className="h-[60.625rem] rounded-lg bg-neutral-100/80"></div>
      <div className="space-y-3">
        <div className="h-[60.625rem] w-full bg-neutral-100/50"></div>
      </div>
    </div>
  );
};
