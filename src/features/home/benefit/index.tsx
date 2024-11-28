import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { ArrowRight } from 'lucide-react';

type BenefitSectionProps = {
   benefit: Content.BenefitSliceDefaultPrimary;
};
const BenefitSection = ({ benefit }: BenefitSectionProps) => {
   return (
      <Bounded className="relative py-16">
         <div className="grid grid-cols-1 md:grid-cols-12 col-span-2 gap-5">
            <div className="col-span-3 row-span-2">
               <div className="p-8 relative rounded-3xl bg-indigo-300 bg-[url('/assets/images/home/bg-support.png')] bg-no-repeat bg-bottom bg-cover">
                  <div className="flex flex-col gap-10 z-10">
                     <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-semibold">24/7 Support</h3>
                        <p className="text-slate-700">
                           We are here to help, before, during, and even after your trip.
                        </p>
                     </div>
                     <div className="flex flex-col gap-5">
                        <Image
                           className="aspect-video rounded-3xl"
                           src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage3/support.png"
                        />
                        <Image
                           className="aspect-square rounded-3xl"
                           src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage3/support2.png"
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-span-4 row-span-2">
               <div className="grid grid-cols-1 gap-5 grid-rows-2 h-full">
                  <div className="p-12 row-span-1 relative rounded-3xl bg-green-200 bg-[url('/assets/images/home/bg-bestprice.png')] bg-no-repeat bg-bottom bg-cover">
                     <div className="flex flex-col gap-10 z-10">
                        <div className="flex flex-col gap-2">
                           <h3 className="text-2xl font-semibold">Best Price</h3>
                           <p className="text-slate-700">
                              Price match within 48 hours of order confirmation
                           </p>
                        </div>
                        <Button
                           variant="outline"
                           className="px-7 w-fit bg-yellow-300 py-6 rounded-full"
                        >
                           View More <ArrowRight className="w-5 h-5" />
                        </Button>
                     </div>
                  </div>
                  <div className="p-12 row-span-1 relative rounded-3xl bg-blue-300 bg-[url('/assets/images/home/bg-explore.png')] bg-no-repeat bg-bottom bg-cover">
                     <div className="flex flex-col gap-10 z-10">
                        <div className="flex flex-col gap-2">
                           <h3 className="text-2xl font-semibold">Save your time!</h3>
                           <p className="text-slate-700">
                              Explore, Book, Soar: Your Journey Awaits!
                           </p>
                        </div>
                        <Button
                           variant="outline"
                           className="px-7 w-fit bg-yellow-300 py-6 rounded-full"
                        >
                           View More <ArrowRight className="w-5 h-5" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-span-5 row-span-2">
               <div className="p-5 relative w-full h-full">
                  <PrismicNextImage
                     className="block md:absolute object-contain h-full w-full -top-10 z-0"
                     field={benefit.main_image}
                  />
                  <div className="absolute left-10 bottom-10 rounded-full w-40 h-40 z-10 border-4 border-white bg-yellow-300 flex flex-col gap-1 justify-center items-center">
                     <span className='text-xs'>Save 39%</span>
                     <h3 className='text-3xl font-bold'>$899</h3>
                     <p className='text-base underline'>BOOK NOW</p>
                  </div>
               </div>
            </div>
         </div>
      </Bounded>
   );
};

export default BenefitSection;
