'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGridIcon, Play } from 'lucide-react';
import { useState } from 'react';
import ModalShowAllGalley from './image-modal';
import Image from '@/components/common/images/image';

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
         <div className="rounded-md sm:rounded-xl w-full">
            {type === 'default' && (
               <div
                  onClick={handleOpen}
                  className="relative grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-2"
               >
                  <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
                     <Image
                        src={images[0]?.replace('{size}', '640x400') || '/location.png'}
                        className={cn(
                           'absolute inset-0 object-cover object-center rounded-md w-full h-full sm:rounded-xl bg-gray-200',
                        )}
                        alt="gallery-image"
                        loading="lazy"
                     />
                  </div>
                  <div className="relative rounded-md sm:rounded-xl overflow-hidden bg-gray-200">
                     <div className="aspect-[4/3] sm:aspect-[6/5]">
                        <Image
                           src={images[1]?.replace('{size}', '640x400') || '/location.png'}
                           className={cn(
                              'absolute inset-0 object-cover object-center rounded-md sm:rounded-xl w-full h-full bg-gray-200',
                           )}
                           alt="gallery-image"
                           loading="lazy"
                        />
                     </div>
                  </div>
                  <div className="relative rounded-md sm:rounded-xl overflow-hidden bg-gray-200">
                     <div className="aspect-[4/3] sm:aspect-[6/5]">
                        <Image
                           src={images[2]?.replace('{size}', '640x400') || '/location.png'}
                           className={cn(
                              'absolute inset-0 object-cover object-center rounded-md sm:rounded-xl w-full h-full bg-gray-200',
                           )}
                           alt="gallery-image"
                           loading="lazy"
                        />
                     </div>
                  </div>
                  <div className="relative rounded-md sm:rounded-xl overflow-hidden bg-gray-200">
                     <div className="aspect-[4/3] sm:aspect-[6/5]">
                        <Image
                           src={images[3]?.replace('{size}', '640x400') || '/location.png'}
                           className={cn(
                              'absolute inset-0 object-cover object-center rounded-md sm:rounded-xl w-full h-full bg-gray-200',
                           )}
                           alt="gallery-image"
                           loading="lazy"
                        />
                     </div>
                  </div>
                  <div className="relative rounded-md sm:rounded-xl overflow-hidden hidden sm:block bg-gray-200">
                     <div className="aspect-[4/3] sm:aspect-[6/5]">
                        <Image
                           src={images[4]?.replace('{size}', '640x400') || '/location.png'}
                           className={cn(
                              'absolute inset-0 object-cover object-center rounded-md sm:rounded-xl w-full h-full bg-gray-200',
                           )}
                           alt="gallery-image"
                           loading="lazy"
                        />
                     </div>
                  </div>
                  <div className="absolute hidden md:flex items-center gap-2 left-6 bottom-3">
                     <Button
                        onClick={handleOpen}
                        className="md:flex md:items-center md:justify-center text-base px-6 py-6 rounded-full bg-yellow-400 text-black hover:bg-slate-200 hover:text-slate-800 z-10"
                     >
                        <LayoutGridIcon className="w-5 h-5 mr-1" />
                        See all photos
                     </Button>
                     <Button
                        onClick={handleOpen}
                        className=" md:flex md:items-center md:justify-center text-base px-6 py-6 rounded-full bg-neutral-100 text-black hover:bg-slate-200 hover:text-slate-800 z-10"
                     >
                        <div className="border border-neutral-800 rounded-full p-1 flex justify-center items-center">
                           <Play className="w-5 h-5" />
                        </div>
                        Video Clips
                     </Button>
                  </div>

                  <ModalShowAllGalley opened={open} setOpen={setOpen} images={images} />
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
