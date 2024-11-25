import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `AskAndQuestions`.
 */
export type AskAndQuestionsProps = SliceComponentProps<Content.AskAndQuestionsSlice>;

/**
 * Component for "AskAndQuestions" Slices.
 */
const AskAndQuestions = ({ slice }: AskAndQuestionsProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for ask_and_questions (variation: {slice.variation}) Slices
      </section>
   );
};

export default AskAndQuestions;
