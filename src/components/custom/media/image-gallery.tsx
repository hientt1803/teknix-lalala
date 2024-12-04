'use client';

import { LayoutGridIcon, Play } from 'lucide-react';
import { useState } from 'react';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import ModalShowAllGalley from './image-modal';

// const CredenzaImages = dynamic(() => import("./credenza-images"), {
//     ssr: false,
// });
type ImageGalleryProps = {
  type: 'default' | 'tour' | 'car' | 'flight';
  images: string[];
};

const ImageGalleryComp = ({ type, images }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="no-scrollbar">
      <div className="w-full rounded-md sm:rounded-xl">
        {type === 'default' && (
          <div
            onClick={handleOpen}
            className="relative grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-2"
          >
            <div className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl">
              <Image
                src={images[0]?.replace('{size}', '640x400') || '/location.png'}
                className={cn(
                  'absolute inset-0 h-full w-full rounded-md bg-gray-200 object-cover object-center sm:rounded-xl',
                )}
                alt="gallery-image"
                loading="lazy"
              />
            </div>
            <div className="relative overflow-hidden rounded-md bg-gray-200 sm:rounded-xl">
              <div className="aspect-[4/3] sm:aspect-[6/5]">
                <Image
                  src={
                    images[1]?.replace('{size}', '640x400') || '/location.png'
                  }
                  className={cn(
                    'absolute inset-0 h-full w-full rounded-md bg-gray-200 object-cover object-center sm:rounded-xl',
                  )}
                  alt="gallery-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-md bg-gray-200 sm:rounded-xl">
              <div className="aspect-[4/3] sm:aspect-[6/5]">
                <Image
                  src={
                    images[2]?.replace('{size}', '640x400') || '/location.png'
                  }
                  className={cn(
                    'absolute inset-0 h-full w-full rounded-md bg-gray-200 object-cover object-center sm:rounded-xl',
                  )}
                  alt="gallery-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-md bg-gray-200 sm:rounded-xl">
              <div className="aspect-[4/3] sm:aspect-[6/5]">
                <Image
                  src={
                    images[3]?.replace('{size}', '640x400') || '/location.png'
                  }
                  className={cn(
                    'absolute inset-0 h-full w-full rounded-md bg-gray-200 object-cover object-center sm:rounded-xl',
                  )}
                  alt="gallery-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="relative hidden overflow-hidden rounded-md bg-gray-200 sm:block sm:rounded-xl">
              <div className="aspect-[4/3] sm:aspect-[6/5]">
                <Image
                  src={
                    images[4]?.replace('{size}', '640x400') || '/location.png'
                  }
                  className={cn(
                    'absolute inset-0 h-full w-full rounded-md bg-gray-200 object-cover object-center sm:rounded-xl',
                  )}
                  alt="gallery-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-6 hidden items-center gap-2 md:flex">
              <Button
                onClick={handleOpen}
                className="z-10 rounded-full bg-yellow-400 px-6 py-6 text-base text-black hover:bg-neutral-200 hover:text-neutral-800 md:flex md:items-center md:justify-center"
              >
                <LayoutGridIcon className="mr-1 h-5 w-5" />
                See all photos
              </Button>
              <Button
                onClick={handleOpen}
                className="z-10 rounded-full bg-neutral-100 px-6 py-6 text-base text-black hover:bg-neutral-200 hover:text-neutral-800 md:flex md:items-center md:justify-center"
              >
                <div className="flex items-center justify-center rounded-full border border-neutral-800 p-1">
                  <Play className="h-5 w-5" />
                </div>
                Video Clips
              </Button>
            </div>

            <ModalShowAllGalley
              opened={open}
              setOpen={setOpen}
              images={images}
            />
            {/* <CredenzaImages open={open} setOpen={setOpen} /> */}
            {/* <Modal open={open} setOpen={setOpen} /> */}
          </div>
        )}
        {/* {type === "flight" && (
                    <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
                        <div className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
                            <img
                                src={
                                    "https://images.pexels.com/photos/1710482/pexels-photo-1710482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                }
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                            />
                        </div>
                        <div className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/3861783/pexels-photo-3861783.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden hidden sm:block">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <ButtonShowAll />
                    </div>
                )}
                {type === "tour" && (
                    <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
                        <div className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
                            <img
                                src={
                                    "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                }
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                            />
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/3851949/pexels-photo-3851949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden hidden sm:block">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <ButtonShowAll />
                    </div>
                )}
                {type === "car" && (
                    <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
                        <div className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
                            <img
                                src={
                                    "https://images.pexels.com/photos/381292/pexels-photo-381292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                }
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                            />
                        </div>
                        <div className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/2827753/pexels-photo-2827753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="relative rounded-md sm:rounded-xl overflow-hidden hidden sm:block">
                            <div className="aspect-[4/3] sm:aspect-[6/5]">
                                <img
                                    src={
                                        "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                    }
                                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                                />
                            </div>
                        </div>
                        <ButtonShowAll />
                    </div>
                )} */}
      </div>
    </div>
  );
};

export default ImageGalleryComp;
