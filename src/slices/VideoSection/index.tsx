import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import VideoSectionComp from '@/components/custom/video';

/**
 * Props for `VideoSection`.
 */
export type VideoSectionProps = SliceComponentProps<Content.VideoSectionSlice>;
const components: JSXMapSerializer = {
    heading2: ({ children }) => <Heading>{children}</Heading>,
    paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "VideoSection" Slices.
 */
const VideoSection = ({ slice }: VideoSectionProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="py-16"
        >
            {/* HEADING */}
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
                <div className="max-w-2xl">
                    <PrismicRichText
                        field={slice.primary.heading}
                        components={components}
                    />
                    <PrismicRichText field={slice.primary.body} components={components} />
                </div>
            </div>
            {/* VIDEO SECTION */}
            <VideoSectionComp videos={slice} />
        </Bounded>
    );
};

export default VideoSection;
