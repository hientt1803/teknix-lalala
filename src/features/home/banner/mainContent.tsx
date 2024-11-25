import { MainButton } from '@/components/common/button/mainButton';
import Bounded from '@/components/common/containers/bounded';
import { heroComponents } from '@/slices/Hero';
import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

export const MainContent = ({ slice }: { slice: Content.HeroSlice }) => {
   return (
      <Bounded className="w-full h-full flex flex-col justify-center items-center">
         <div className="w-full flex flex-col justify-start items-start gap-3 z-10">
            <div className="mb-5">
               <PrismicRichText field={slice.primary.sub_heading} components={heroComponents} />
            </div>

            <div className="mb-3">
               <PrismicRichText field={slice.primary.heading} components={heroComponents} />
            </div>

            <div className="flex items-center flex-wrap gap-8">
               {slice?.primary?.benefits?.map((benefit, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                     <Image
                        src="/assets/images/home/banner-tick.png"
                        alt="Banner Stick"
                        width={25}
                        height={25}
                        loading="lazy"
                     />

                     <div className="text-sm font-medium text-neutral-50">{benefit.name}</div>
                  </div>
               ))}
            </div>

            {/* button section */}
            <div className="mt-20 flex justify-start items-center gap-4">
               <PrismicNextLink field={slice?.primary?.button_link}>
                  <MainButton
                     text={slice.primary.button_text || ''}
                     rightIcon={<ArrowRight className="w-6 h-6 ml-3" />}
                     className="text-black"
                  />
               </PrismicNextLink>
               <MainButton
                  text={slice.primary.video_text || ''}
                  variant="ghost"
                  className="bg-transparent text-white hover:bg-transparent hover:text-white"
                  leftIcon={
                     <span className="bg-white rounded-full flex justify-center items-center p-4">
                        <Play className="w-5 h-5 text-black" />
                     </span>
                  }
               />
            </div>
         </div>
      </Bounded>
   );
};
