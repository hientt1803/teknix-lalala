import { MainButton } from '@/components/common/button/mainButton';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export const MainContent = () => {
   return (
      <div className="flex flex-col justify-start items-start gap-3">
         <div className="flex items-center gap-1">
            <Image
               src="/assets/images/banner-earth.png"
               alt="Banner Eartg"
               width={30}
               height={30}
               loading="lazy"
            />
            <Heading as="h6">as</Heading>
         </div>
         <Heading as="h1">as</Heading>

         {Array(3)
            .fill(1)
            .map((_, index) => (
               <div className="flex gap-1 items-center">
                  <Image
                     src="/assets/images/banner-tick.png"
                     alt="Banner Stick"
                     width={30}
                     height={30}
                     loading="lazy"
                  />

                  <Paragraph as="b" size="sm">
                     par
                  </Paragraph>
               </div>
            ))}

         {/* button section */}
         <div className="mt-20 flex justify-start items-center gap-4">
            <MainButton
               text="Contact Us"
               rightIcon={<ChevronRight className="w-4 h-4 ml-3" />}
               className="text-black"
            />
            <MainButton
               text="How it Work?"
               leftIcon={<Play className="w-4 h-4 mr-1 bg-white p-3 text-black" />}
            />
         </div>
      </div>
   );
};
