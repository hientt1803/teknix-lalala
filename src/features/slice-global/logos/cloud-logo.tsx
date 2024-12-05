import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';

export const CloudLogo = (slice: Content.LogosSectionSlice) => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full md:px-8">
        <div
          className="group relative mt-6 flex items-center justify-center gap-6 overflow-hidden p-2"
          style={{
            maskImage: `${slice.primary.is_marquee && 'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)'}`,
          }}
        >
          {slice.primary.is_marquee ? (
            <>
              {Array.from({ length: 5 })
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                  >
                    {slice.primary.logos.map((logo, key) => (
                      <PrismicNextImage
                        key={key}
                        field={logo.image}
                        className="h-10 w-fit px-2 brightness-0 transition-all duration-500 hover:brightness-100 dark:invert"
                        alt={``}
                      />
                    ))}
                  </div>
                ))}
            </>
          ) : (
            <>
              {slice.primary.logos.map((logo, key) => (
                <PrismicNextImage
                  key={key}
                  field={logo.image}
                  className="h-10 w-fit px-2 brightness-0 transition-all duration-500 hover:brightness-100 dark:invert"
                  alt={``}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
