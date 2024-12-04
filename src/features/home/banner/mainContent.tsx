import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

import { MainButton } from '@/components/common/button/main-button';
import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';

const heroComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      className="1920:text-7xl z-[1] text-5xl font-medium text-white md:text-6xl"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <Paragraph as="p" className="text-base text-white dark:text-white">
      {children}
    </Paragraph>
  ),
};

export const MainContent = ({ slice }: { slice: Content.HeroSlice }) => {
  return (
    <Bounded className="flex w-full flex-col items-center justify-center">
      <div className="z-10 flex w-full flex-col items-center justify-center gap-1 text-center md:items-start md:justify-start md:gap-3 md:text-start">
        <div className="mb-3">
          <PrismicRichText
            field={slice.primary.sub_heading}
            components={heroComponents}
          />
        </div>

        <div className="mb-2">
          <PrismicRichText
            field={slice.primary.heading}
            components={heroComponents}
          />
        </div>

        <div className="hidden md:block">
          <div className="flex flex-wrap items-center gap-8">
            {slice?.primary?.benefits?.map((benefit, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Image
                  src="/assets/images/home/banner-tick.png"
                  alt="Banner Stick"
                  width={25}
                  height={25}
                  loading="lazy"
                />

                <div className="1920:text-base text-sm text-neutral-50">
                  {benefit.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* button section */}
        <div className="mt-6 flex items-center justify-start gap-4 xl:mt-8">
          <PrismicNextLink field={slice?.primary?.button_link}>
            <MainButton
              text={slice.primary.button_text || ''}
              rightIcon={<ArrowRight className="ml-1 h-5 w-5" />}
              className="text-base text-black"
            />
          </PrismicNextLink>
          <MainButton
            text={slice.primary.video_text || ''}
            variant="ghost"
            className="bg-transparent text-base text-white hover:bg-transparent hover:text-white"
            leftIcon={
              <span className="flex items-center justify-center rounded-full bg-white p-4">
                <Play className="h-5 w-5 text-black" />
              </span>
            }
          />
        </div>
      </div>
    </Bounded>
  );
};
