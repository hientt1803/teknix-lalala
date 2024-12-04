import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';

export const QuestionAndAsked = dynamic(() =>
  import('@/features/home/question/question').then(module_ => module_.default),
);

/**
 * Props for `AskAndQuestions`.
 */
export type AskAndQuestionsProps =
  SliceComponentProps<Content.AskAndQuestionsSlice>;

/**
 * Component for "AskAndQuestions" Slices.
 */
const AskAndQuestions = ({ slice }: AskAndQuestionsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-screen py-20"
    >
      {slice.variation == 'default' && (
        <>
          <Image
            src="/assets/images/home/bg-faq.png"
            className="absolute bottom-0 left-0"
            alt=""
          />
          <Image
            src="/assets/images/home/bg-payment-plane.svg"
            className="right-0 top-0 hidden md:absolute"
            alt=""
          />
        </>
      )}
      <Bounded>
        <QuestionAndAsked {...slice} />
      </Bounded>
    </section>
  );
};

export default AskAndQuestions;
