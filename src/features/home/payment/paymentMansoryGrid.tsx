import Bounded from '@/components/common/containers/bounded';
import Badge from '@/components/custom/badges/badge';
import { cn } from '@/lib/utils';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { CheckIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

export const PaymentCaroucel = dynamic(
   () => import('./paymentCaroucel').then((mod) => mod.PaymentCaroucel),
   {
      ssr: false,
   },
);

export const PaymentMansoryGrid = ({ slice }: { slice: Content.PaymentSectionSlice }) => {
   return (
      <Bounded className="w-full h-full flex flex-col justify-center items-center">
         <div className="w-full h-full mx-auto flex justify-between items-center gap-2 z-10">
            <div className="grid grid-cols-12 gap-10">
               {/* List image */}
               <div
                  className={cn(
                     slice.variation == 'default' ? 'col-span-12 md:col-span-6 order-1' : 'col-span-12 md:col-span-4 order-2',
                  )}
               >
                  {slice.variation == 'default' ? (
                     <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-6">
                           <div className="aspect-square rounded-xl overflow-hidden">
                              <PrismicNextImage
                                 field={slice.primary.images[0]?.image}
                                 alt=""
                                 className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                 loading="lazy"
                              />
                           </div>
                        </div>
                        <div className="col-span-6 mt-12">
                           <div className="aspect-square rounded-xl overflow-hidden">
                              <PrismicNextImage
                                 field={slice.primary.images[1]?.image}
                                 alt=""
                                 className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                 loading="lazy"
                              />
                           </div>
                        </div>
                        <div className="col-span-6 -mt-12">
                           <div className="aspect-square rounded-xl overflow-hidden">
                              <PrismicNextImage
                                 field={slice.primary.images[2]?.image}
                                 alt=""
                                 className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                 loading="lazy"
                              />
                           </div>
                        </div>
                        <div className="col-span-6">
                           <div className="aspect-square rounded-xl overflow-hidden">
                              <PrismicNextImage
                                 field={slice.primary.images[3]?.image}
                                 alt=""
                                 className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                 loading="lazy"
                              />
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="relative">
                        <div className="aspect-square rounded-xl overflow-hidden z-10">
                           <PrismicNextImage
                              field={slice.primary.images[0]?.image}
                              alt=""
                              className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                              loading="lazy"
                           />
                        </div>

                        <div className="aspect-auto rounded-xl overflow-hidden absolute -bottom-24 left-0 md:-left-44">
                           <PrismicNextImage
                              field={slice.primary.images[1]?.image}
                              alt=""
                              className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                              loading="lazy"
                           />
                        </div>

                        <div className="aspect-square rounded-xl overflow-hidden absolute -bottom-40 right-10">
                           <PrismicNextImage
                              field={slice.primary.images[2]?.image}
                              alt=""
                              className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                              loading="lazy"
                           />
                        </div>

                        <div className="aspect-square absolute -top-12 -right-12 -z-[1]">
                           <PrismicNextImage
                              field={slice.primary.images[3]?.image}
                              alt=""
                              className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                              loading="lazy"
                           />
                        </div>
                     </div>
                  )}
               </div>

               {/* Content */}
               <div
                  className={cn(
                     slice.variation == 'default'
                        ? 'mt-20 col-span-12 md:col-span-6 order-2'
                        : 'col-span-12 md:col-span-6 md:col-start-2 order-1',
                  )}
               >
                  <Badge
                     className="bg-[#f2f4f6] py-4 px-5 text-neutral-900 text-sm font-medium mb-5"
                     color="gray"
                  >
                     {slice.primary.tag || ''}
                  </Badge>

                  <div className="mb-5">
                     <PrismicRichText
                        field={slice?.primary?.heading}
                        components={{
                           heading2: ({ children }) => (
                              <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                                 {children}
                              </h2>
                           ),
                        }}
                     />
                  </div>

                  <div className="mb-5">
                     {slice.variation === 'default' && (
                        <PrismicRichText
                           field={slice?.primary?.title}
                           components={{
                              paragraph: ({ children }) => (
                                 <p className="text-neutral-800 dark:text-neutral-300 text-base sm:text-xl">
                                    {children}
                                 </p>
                              ),
                           }}
                        />
                     )}
                  </div>

                  <div className="my-10">
                     <div className="grid grid-cols-12 gap-3">
                        {slice.primary.benefits.map((bene, index) => (
                           <div
                              className={cn(
                                 slice.variation == 'default' ? 'col-span-6' : 'col-span-12',
                              )}
                              key={index}
                           >
                              <div className="flex gap-2 items-center">
                                 <CheckIcon className="w-6 h-6 text-green-600" />
                                 <span className="text-md text-black dark:text-neutral-200">
                                    {bene.text}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {slice?.variation == 'default' && (
                     <PrismicRichText
                        field={slice?.primary?.payment_label}
                        components={{
                           paragraph: ({ children }) => <p className="text-sm">{children}</p>,
                        }}
                     />
                  )}

                  <div
                     className={slice.variation == 'default' ? 'mt-4 w-full' : 'mt-8 max-w-[25rem]'}
                  >
                     <PaymentCaroucel payments={slice.primary.payments} />
                  </div>
               </div>
            </div>
         </div>
      </Bounded>
   );
};
