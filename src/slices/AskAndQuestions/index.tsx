import Bounded from '@/components/common/containers/bounded';
import QuestionAndAsked from '@/features/home/question/question';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

/**
 * Props for `AskAndQuestions`.
 */
export type AskAndQuestionsProps = SliceComponentProps<Content.AskAndQuestionsSlice>;

/**
 * Component for "AskAndQuestions" Slices.
 */
const AskAndQuestions = ({ slice }: AskAndQuestionsProps): JSX.Element => {
   return (
      <Bounded
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="relative py-16"
      >
         <QuestionAndAsked
            heading={slice.primary.heading}
            body={slice.primary.body}
            questions={slice.primary.questions}
            services={slice.primary.services}
         />
      </Bounded>
   );
};

export default AskAndQuestions;
