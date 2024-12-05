import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { propertyList } from '@/slices/StaySection/mock';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import React from 'react';
import dynamic from 'next/dynamic';

export const StayCard = dynamic(() =>
  import('@/components/custom/cards/stay-card').then(
    module_ => module_.default,
  ),
);

const components: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

export const StaysSection = (slice: Content.StaySectionSlice) => {
  return (
    <div className="relative">
      <div className="relative mb-8 flex flex-col">
        {/* HEADING */}
        <div className="nc-Section-Heading relative mb-10 flex flex-col justify-between text-neutral-900 dark:text-neutral-50 sm:flex-row sm:items-end md:mb-12">
          <div className="max-w-2xl">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.body}
              components={components}
            />
          </div>
        </div>
        {/* TABS */}
        <div className="flex items-center gap-3">
          {[
            'All',
            'Luxury',
            'Standard',
            'Villa',
            'Cottage',
            'Townhouses',
            'Shared Space',
          ].map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="min-w-32 rounded-full px-7 py-6 text-base"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      {/* CARD LIST */}
      <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {propertyList.map((pro, index) => (
          <StayCard {...pro} key={index} />
        ))}
      </div>
    </div>
  );
};
