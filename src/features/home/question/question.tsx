import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import {
  ArrowRight,
  Box,
  CircleDollarSign,
  Plus,
  Stamp,
  Ticket,
} from 'lucide-react';

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@/components/custom/accordions/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { getListFAQs } from '@/services/global';
import { PrismicNextImage } from '@prismicio/next';
import { Button } from '@/components/ui/button';

const components: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
const QuestionAndAsked = async (slice: Content.AskAndQuestionsSlice) => {
  const listQuestion = await getListFAQs();

  // Group questions by category
  const groupedQuestions = listQuestion?.reduce(
    (accumulator, question) => {
      const category = question.category || 'general';
      accumulator[category] = accumulator[category] || [];
      accumulator[category].push(question);
      return accumulator;
    },
    {} as Record<string, typeof listQuestion>,
  );

  const uniqueCategories = Object.keys(groupedQuestions as Object);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'general': {
        return <Box className="h-7 w-7" strokeWidth={1.3} />;
      }
      case 'cancellation': {
        return <Ticket className="h-7 w-7" strokeWidth={1.3} />;
      }
      case 'loyalty': {
        return <Stamp className="h-7 w-7" strokeWidth={1.3} />;
      }
      case 'refund': {
        return <CircleDollarSign className="h-7 w-7" strokeWidth={1.3} />;
      }
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-8 overflow-hidden',
        slice?.variation == 'default'
          ? 'items-center justify-center'
          : 'items-start justify-start',
      )}
    >
      {slice?.variation == 'default' ? (
        <div className="flex flex-col items-center justify-center">
          <PrismicRichText
            field={slice?.primary?.heading}
            components={components}
          />
          <PrismicRichText
            field={slice?.primary?.body}
            components={components}
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <PrismicRichText
              field={slice?.primary?.heading}
              components={components}
            />
            <PrismicRichText
              field={slice?.primary?.description}
              components={components}
            />
          </div>

          <PrismicNextImage
            field={slice?.primary?.image}
            alt=""
            className="h-fit w-fit"
          />
        </div>
      )}

      {slice?.variation == 'default' ? (
        <Tabs defaultValue="general" className="w-full bg-transparent">
          <TabsList className="flex items-center flex-wrap gap-3 bg-transparent">
            {uniqueCategories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border border-neutral-200 px-5 py-3 transition-shadow duration-200 hover:shadow-lg hover:shadow-neutral-100 data-[state=active]:bg-neutral-200 dark:border-neutral-700 dark:hover:shadow-neutral-800 dark:data-[state=active]:bg-neutral-700"
              >
                <div className="text-neutral-500 dark:text-neutral-400">
                  {renderIcon(category)}
                </div>
                <span className="font-medium capitalize text-neutral-900 dark:text-neutral-300">
                  {category}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-10 w-full flex-1">
            {uniqueCategories.map(category => (
              <TabsContent
                key={category}
                value={category}
                className="w-full px-0 mt-36 md:mt-0"
              >
                <Accordion>
                  {groupedQuestions &&
                    groupedQuestions[category]?.map((question, index) => (
                      <AccordionItem key={index} value={index.toString()}>
                        <AccordionHeader icon={<Plus />}>
                          <div className="flex items-center gap-6 p-8">
                            <h1 className="text-4xl font-semibold">
                              0{index + 1}
                            </h1>
                            <h4 className="text-xl">{question.question}</h4>
                          </div>
                        </AccordionHeader>
                        <AccordionPanel>
                          <div className="px-24 pb-8">
                            <p
                              className="text-lg text-neutral-600"
                              dangerouslySetInnerHTML={{
                                __html: question.answer,
                              }}
                            />
                          </div>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                </Accordion>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      ) : (
        <div className="mt-10 w-full flex-1">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {listQuestion?.map((question, index) => (
              <Accordion key={index}>
                <AccordionItem value={index.toString()}>
                  <AccordionHeader icon={<Plus />}>
                    <div className="flex items-center gap-6 p-8">
                      <h1 className="text-4xl font-semibold">0{index + 1}</h1>
                      <h4 className="text-xl">{question.question}</h4>
                    </div>
                  </AccordionHeader>
                  <AccordionPanel>
                    <div className="px-24 pb-8">
                      <p
                        className="text-lg text-neutral-600"
                        dangerouslySetInnerHTML={{
                          __html: question.answer,
                        }}
                      />
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      )}

      {slice?.variation == 'grid' && (
        <Button className="ml-auto px-8 py-6 text-base">
          Contact Us <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
};

export default QuestionAndAsked;
