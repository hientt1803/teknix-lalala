import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Badge from '@/components/custom/badges/badge';
import { Button } from '@/components/ui/button';
import { imageComponent } from '@/slices/ImagesSection';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { Grip } from 'lucide-react';
import React from 'react';

export const ImageSection = ({ slice }: { slice: Content.ImagesSectionSlice }) => {
   return (
      <>
         {slice.variation === 'default' && (
            <Bounded>
               <div className="grid grid-cols-12 gap-6 place-content-center place-items-center">
                  <div className="col-span-12 md:col-span-6">
                     <div className="columns-2 lg:columns-3 gap-3 place-content-center place-items-center mx-auto">
                        {slice.primary.images.map((image, index) => (
                           <div
                              className="w-full md:max-w-[11.25rem] h-fit mb-3 rounded-[2.5rem] overflow-hidden"
                              key={index}
                           >
                              <PrismicNextImage
                                 field={image.image}
                                 alt=""
                                 loading="lazy"
                                 className="w-full h-full transform transition-transform group-hover:scale-110 duration-300"
                              />
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 mt-10 md:mt-0">
                     <div className="flex flex-col justify-start items-start gap-4">
                        <Badge color="white" className="px-7 py-2 text-lg cursor-pointer">
                           {slice.primary.tag || ''}
                        </Badge>
                        <PrismicRichText
                           field={slice.primary.heading}
                           components={imageComponent}
                        />
                        <PrismicRichText field={slice.primary.body} components={imageComponent} />
                     </div>
                  </div>
               </div>
            </Bounded>
         )}
         {slice.variation === 'center' && (
            <Bounded className="flex flex-col justify-center items-center gap-16">
               <Image
                  src="/assets/images/home/bg-video.png"
                  className="absolute bottom-0 object-cover w-full h-full z-0"
                  alt=""
               />
               <div className="flex flex-col justify-center items-center gap-4 max-w-md text-center">
                  <Badge color="white" className="px-5 bg-yellow-300  py-3 text-lg cursor-pointer">
                     {slice.primary.tag || ''}
                  </Badge>

                  <PrismicRichText field={slice.primary.heading} components={imageComponent} />
               </div>
               <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-5">
                     <div className="relative w-full h-full ">
                        <PrismicNextImage
                           className="w-full h-full object-cover rounded-3xl"
                           field={slice.primary.images[0]?.image}
                           alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                           <div className="bg-white relative rounded-full shadow-inner w-16 h-16">
                              <span className="absolute inset-0 flex items-center justify-center text-slate-900">
                                 <svg
                                    className="w-8 h-8"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                 >
                                    <path
                                       stroke="currentColor"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="1"
                                       d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                                    />
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-span-3">
                     <div className="h-full grid grid-cols-1 gap-5">
                        <div className="relative">
                           <PrismicNextImage
                              className="w-full h-full object-cover rounded-3xl aspect-[4/3]"
                              field={slice.primary.images[1]?.image}
                              alt=""
                           />
                           <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="bg-white relative rounded-full shadow-inner w-10 h-10">
                                 <span className="absolute inset-0 flex items-center justify-center text-slate-900">
                                    <svg
                                       className="w-5 h-5"
                                       width="24"
                                       height="24"
                                       fill="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                                       />
                                    </svg>
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="relative">
                           <PrismicNextImage
                              className="w-full h-full object-cover rounded-3xl aspect-[3/4]"
                              field={slice.primary.images[2]?.image}
                              alt=""
                           />
                           <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="bg-white relative rounded-full shadow-inner w-10 h-10">
                                 <span className="absolute inset-0 flex items-center justify-center text-slate-900">
                                    <svg
                                       className="w-5 h-5"
                                       width="24"
                                       height="24"
                                       fill="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                                       />
                                    </svg>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-span-4">
                     <div className="h-full grid grid-cols-1 gap-5">
                        <div className="relative">
                           <PrismicNextImage
                              className="w-full h-full object-cover rounded-3xl"
                              field={slice.primary.images[3]?.image}
                              alt=""
                           />
                           <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="bg-white relative rounded-full shadow-inner w-10 h-10">
                                 <span className="absolute inset-0 flex items-center justify-center text-slate-900">
                                    <svg
                                       className="w-5 h-5"
                                       width="24"
                                       height="24"
                                       fill="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                                       />
                                    </svg>
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="relative">
                           <PrismicNextImage
                              className="w-full h-full object-cover rounded-3xl"
                              field={slice.primary.images[4]?.image}
                              alt=""
                           />
                           <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="bg-white relative rounded-full shadow-inner w-10 h-10">
                                 <span className="absolute inset-0 flex items-center justify-center text-slate-900">
                                    <svg
                                       className="w-5 h-5"
                                       width="24"
                                       height="24"
                                       fill="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                                       />
                                    </svg>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <Button className="px-5 py-6 rounded-full bg-yellow-300 text-base" variant="ghost">
                  <Grip />
                  Load More Tours
               </Button>
            </Bounded>
         )}
      </>
   );
};
