import { RichTextField } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import React from 'react';

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cards } from '@/slices/TopAuthor/mock';

type TopAuthorProps = {
  heading: RichTextField;
  body: RichTextField;
};

const components: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
const TopAuthor = ({ heading, body }: TopAuthorProps) => {
  return (
    <>
      <div className="1920:max-w-screen-1920 absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform bg-neutral-100 dark:bg-neutral-900 xl:max-w-[1340px] xl:rounded-[40px]"></div>
      <div className="relative">
        <div className="relative mb-10 text-neutral-900">
          <div className="max-w-screen-1920 mx-auto mb-4 w-full text-center">
            <PrismicRichText field={heading} components={components} />
            <PrismicRichText field={body} components={components} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
          {cards.map((author, index) => (
            <Link
              key={index}
              className="flex flex-col overflow-hidden rounded-3xl bg-white transition-shadow hover:shadow-xl dark:bg-neutral-950"
              href="#"
            >
              <div className="relative flex-shrink-0">
                <div className="flex aspect-[7/3] w-full md:aspect-[7/4]">
                  {/* <Image
                              alt=""
                              className="absolute object-cover inset-0 w-full h-full"
                              src={author.card_image_url}
                              loading="lazy"
                           /> */}
                </div>
                <div className="absolute inset-x-3 top-3 flex">
                  <div className="flex items-center justify-center rounded-full bg-neutral-100 px-4 py-1 text-xs font-medium leading-none dark:bg-neutral-700">
                    {author.id}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="ml-3 h-5 w-5 text-yellow-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative flex -translate-y-7 flex-col items-center px-6 pt-[1px] text-center">
                <svg
                  className="h-12 text-white dark:text-neutral-700"
                  viewBox="0 0 135 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M101.911 19.8581C99.4421 17.4194 97.15 14.8065 94.6816 12.1935C94.3289 11.671 93.8 11.3226 93.271 10.8C92.9184 10.4516 92.7421 10.2774 92.3895 9.92903C85.8658 3.83226 76.8737 0 67.1763 0C57.4789 0 48.4868 3.83226 41.7868 9.92903C41.4342 10.2774 41.2579 10.4516 40.9053 10.8C40.3763 11.3226 40.0237 11.671 39.4947 12.1935C37.0263 14.8065 34.7342 17.4194 32.2658 19.8581C23.45 28.7419 11.6368 30.4839 0 30.8323V54H16.5737H32.2658H101.734H110.374H134.176V30.6581C122.539 30.3097 110.726 28.7419 101.911 19.8581Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="absolute top-2">
                  <Avatar>
                    {/* <AvatarImage src={author.user_image_url} className="object-cover" /> */}
                    <AvatarFallback>L</AvatarFallback>
                  </Avatar>
                </span>
                <div className="mt-6">
                  <h2 className="text-base font-medium">
                    <span className="line-clamp-1">{author.author}</span>
                  </h2>
                  <span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
                    @{author.job}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-5 sm:space-y-0">
          <Button className="rounded-full px-8 py-6" variant="outline">
            Show me more
          </Button>
          <Button className="rounded-full px-8 py-6"> Become a host</Button>
        </div>
      </div>
    </>
  );
};

export default TopAuthor;
