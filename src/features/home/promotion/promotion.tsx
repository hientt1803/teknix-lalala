import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

type PromotionProps = {
   promotions: Content.PromotionSectionSliceDefaultPrimaryPromotionsItem[];
};

const components: JSXMapSerializer = {
   heading2: ({ children }) => <Heading size="sm">{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
const Promotion = ({ promotions }: PromotionProps) => {
   return (
      <div className="grid sm:grid-cols-2 gap-5">
         {promotions.map((promotion, index) => (
            <div
               key={index}
               className="relative flex w-full group rounded-2xl z-0 overflow-hidden flex-1"
            >
               <div className="aspect-video w-full h-80"></div>
               <PrismicNextImage
                  alt=""
                  field={promotion.background_image}
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 absolute inset-0 h-full w-full text-transparent"
               />
               <div className="absolute inset-y-0 inset-x-0 p-4 sm:p-12 text-white">
                  <div className="flex flex-col h-full justify-between items-start w-[40%]">
                     <PrismicRichText field={promotion.heading} components={components} />
                     <Button className="px-8 py-6 rounded-full">
                        {promotion.button_text}
                        <ArrowRight className="w-4 h-4" />
                     </Button>
                  </div>
               </div>
               <div className="aspect-video w-full h-full z-[1]"></div>
            </div>
         ))}
      </div>
   );
};

export default Promotion;
