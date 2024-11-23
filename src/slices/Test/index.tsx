import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Test`.
 */
export type TestProps = SliceComponentProps<Content.TestSlice>;

/**
 * Component for "Test" Slices.
 */
const Test = ({ slice }: TestProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for test (variation: {slice.variation}) Slices
    </section>
  );
};

export default Test;
