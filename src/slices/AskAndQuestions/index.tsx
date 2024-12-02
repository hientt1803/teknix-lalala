import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const QuestionAndAsked = dynamic(() =>
   import('@/features/home/question/question').then((mod) => mod.default),
);

/**
 * Props for `AskAndQuestions`.
 */
export type AskAndQuestionsProps = SliceComponentProps<Content.AskAndQuestionsSlice>;

/**
 * Component for "AskAndQuestions" Slices.
 */
const AskAndQuestions = ({ slice }: AskAndQuestionsProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="relative py-16 w-screen"
      >
         <Image src="/assets/images/home/bg-faq.png" className="absolute bottom-0 left-0" alt="" />
         <Image
            src="/assets/images/home/bg-payment-plane.svg"
            className="hidden md:absolute top-0 right-0"
            alt=""
         />
         <Bounded>
            <QuestionAndAsked
               heading={slice.primary.heading}
               body={slice.primary.body}
               // questions={slice.primary.questions}
               // services={slice.primary.services}
            />
         </Bounded>
      </section>
   );
};

export default AskAndQuestions;
