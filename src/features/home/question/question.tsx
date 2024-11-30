import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import {
   Accordion,
   AccordionHeader,
   AccordionItem,
   AccordionPanel,
} from '@/components/custom/accordions/accordion';
import { Button } from '@/components/ui/button';
import { Content, RichTextField } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import {
   Bike,
   Building2,
   CarFront,
   Castle,
   Coffee,
   MapPinHouse,
   PlaneTakeoff,
   Plus,
} from 'lucide-react';

type QuestionAndAskedProps = {
   heading: RichTextField;
   body: RichTextField;
   services: Content.AskAndQuestionsSliceDefaultPrimaryServicesItem[];
   questions: Content.AskAndQuestionsSliceDefaultPrimaryQuestionsItem[];
};
const components: JSXMapSerializer = {
   heading2: ({ children }) => <Heading>{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
const QuestionAndAsked = ({ body, heading, questions, services }: QuestionAndAskedProps) => {
   const renderIcon = ({ icon }: Content.AskAndQuestionsSliceDefaultPrimaryServicesItem) => {
      switch (icon) {
         case 'active':
            return <Bike className="w-7 h-7" strokeWidth={1.3} />;
         case 'tour':
            return <Coffee className="w-7 h-7" strokeWidth={1.3} />;
         case 'destination':
            return <MapPinHouse className="w-7 h-7" strokeWidth={1.3} />;
         case 'car':
            return <CarFront className="w-7 h-7" strokeWidth={1.3} />;
         case 'flight':
            return <PlaneTakeoff className="w-7 h-7" strokeWidth={1.3} />;
         case 'hotal':
            return <Building2 className="w-7 h-7" strokeWidth={1.3} />;
         case 'property':
            return <Castle className="w-7 h-7" strokeWidth={1.3} />;
      }
   };
   return (
      <div className="flex flex-col justify-center items-center gap-8">
         <div className="flex flex-col items-center justify-center">
            <PrismicRichText field={heading} components={components} />
            <PrismicRichText field={body} components={components} />
         </div>
         <div className="flex flex-wrap gap-4 justify-center items-center max-w-3xl mt-6">
            {services.map((service, index) => (
               <div
                  className="flex items-center justify-center px-5 py-3 gap-2 border border-neutral-200 dark:border-neutral-700  rounded-[0.5rem] hover:shadow-lg hover:shadow-neutral-100 dark:hover:shadow-neutral-800 transition-shadow duration-200 cursor-pointer"
                  key={index}
               >
                  <div className="text-neutral-500 dark:text-neutral-400">{renderIcon(service)}</div>
                  <span className="text-neutral-800 font-normal dark:text-neutral-300">
                     {service.name}
                  </span>
               </div>
            ))}
         </div>
         <div className="flex-1 w-full">
            <Accordion>
               {questions.map((question, index) => (
                  <AccordionItem key={index} value={index.toString()}>
                     <AccordionHeader icon={<Plus />}>
                        <div className="flex items-center gap-6 p-8">
                           <h1 className="font-semibold text-4xl">0{index + 1}</h1>
                           <PrismicRichText
                              field={question.question}
                              components={{
                                 heading4: ({ children }) => (
                                    <h4 className="text-xl">{children}</h4>
                                 ),
                              }}
                           />
                        </div>
                     </AccordionHeader>
                     <AccordionPanel>
                        <div className="px-24 pb-8">
                           <PrismicRichText
                              field={question.ask}
                              components={{
                                 paragraph: ({ children }) => (
                                    <p className="text-lg text-neutral-600">{children}</p>
                                 ),
                              }}
                           />
                        </div>
                     </AccordionPanel>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   );
};

export default QuestionAndAsked;
