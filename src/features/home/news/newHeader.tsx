import { MainButton } from '@/components/common/button/mainButton';
import { newComponent } from '@/slices/NewsSection';
import { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export const NewHeader = ({ slice }: { slice: Content.NewsSectionSlice }) => {
   return (
      <div className="flex justify-between items-end gap-2">
         <div className="flex flex-col justify-start items-start gap-1">
            <PrismicRichText field={slice.primary.heading} components={newComponent} />
            <PrismicRichText field={slice.primary.body} components={newComponent} />
         </div>
         <MainButton
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="bg-black text-white hover:bg-neutral-800 hover:text-neutral-100"
         >
            View more
         </MainButton>
      </div>
   );
};
