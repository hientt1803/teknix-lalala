import { BackgroundImage } from "@/features/home/banner/BackgroundImage";
import { MainContent } from "@/features/home/banner/mainContent";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation == "default" && (
        <div className="relative">
          <BackgroundImage />
          <MainContent />
        </div>
      )}
    </section>
  );
};

export default Hero;
