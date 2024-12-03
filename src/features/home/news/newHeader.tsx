import { Button } from '@/components/ui/button';
import { newComponent } from '@/slices/NewsSection';
import { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

export const NewHeader = ({ slice }: { slice: Content.NewsSectionSlice }) => {
   return (
      <div className="flex justify-between items-end gap-2">
         <div className="flex flex-col justify-start items-start gap-1">
            <PrismicRichText field={slice.primary.heading} components={newComponent} />
            <PrismicRichText field={slice.primary.body} components={newComponent} />
         </div>
         <Button className='py-6 px-7 rounded-full'>
            View more <ArrowRight className="w-5 h-5" />
         </Button>
      </div>
   );
};
