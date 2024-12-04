import { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { newComponent } from '@/slices/NewsSection';

export const NewHeader = ({ slice }: { slice: Content.NewsSectionSlice }) => {
  return (
    <div className="flex items-end justify-between gap-2">
      <div className="flex flex-col items-start justify-start gap-1">
        <PrismicRichText
          field={slice.primary.heading}
          components={newComponent}
        />
        <PrismicRichText field={slice.primary.body} components={newComponent} />
      </div>
      <Button className="rounded-full px-7 py-6">
        View more <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
