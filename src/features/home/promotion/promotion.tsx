import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

type PromotionProps = {
  promotions: Content.PromotionSectionSliceDefaultPrimaryPromotionsItem[];
};

const components: JSXMapSerializer = {
  heading2: ({ children }) => <Heading size="sm">{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
const Promotion = ({ promotions }: PromotionProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {promotions.map((promotion, index) => (
        <div
          key={index}
          className="group relative z-0 flex w-full flex-1 overflow-hidden rounded-2xl"
        >
          <div className="aspect-video h-80 w-full"></div>
          <PrismicNextImage
            alt=""
            field={promotion.background_image}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover text-transparent transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 inset-y-0 p-4 text-white sm:p-12">
            <div className="flex h-full w-[40%] flex-col items-start justify-between">
              <PrismicRichText
                field={promotion.heading}
                components={components}
              />
              <Button className="rounded-full px-8 py-6">
                {promotion.button_text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="z-[1] aspect-video h-full w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default Promotion;
