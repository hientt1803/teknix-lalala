import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import { Button } from '@/components/ui/button';

/**
 * Props for `ThankSection`.
 */
export type ThankSectionProps = SliceComponentProps<Content.ThankSectionSlice>;

/**
 * Component for "ThankSection" Slices.
 */
const ThankSection = ({ slice }: ThankSectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20 py-20"
    >
      <div className="grid grid-cols-2 gap-8">
        <div className="relative">
          <div className="aspect-auto">
            <PrismicNextImage
              field={slice?.primary?.main_image}
              className="rounded-lg"
            />
          </div>
          <PrismicNextImage
            field={slice?.primary?.sub_image}
            className="absolute -bottom-14 right-20 rounded-lg"
          />
        </div>

        <div className="">
          <div className="box-detail-info">
            <h6 className="mb-5 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
              Welcome to Lalala!
            </h6>
            <p>
              We are in the process of creating an entirely new hotel booking
              experience, connecting you with thousands of hotels worldwide. At
              Lalala, we are committed to providing you with the most memorable
              and comfortable travel experiences.
            </p>
            <h6 className="my-5 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
              Explore our key features:
            </h6>
            <p className="mb-4">
              {' '}
              <strong>Easy Booking: </strong>With our convenient and flexible
              booking system,
              {`you'll`} be able to quickly search for and book your preferred
              accommodations.
            </p>
            <p className="mb-4">
              {' '}
              <strong>Discover Special Deals: </strong>Lalala offers you
              enticing deals and special discounts for popular travel
              destinations around the globe.
            </p>
            <p className="mb-4">
              {' '}
              <strong>24/7 Customer Support: </strong>Our customer support team
              is always ready to assist you anytime, ensuring that all your
              experiences are seamless.
            </p>
            <p className="text-xl-bold mb-4">Thank you for visiting!</p>
            <p>
              Stay connected with us to receive updates and special discounts
              when we officially launch. {`Don't`} miss out on the opportunity
              to experience amazing travel adventures with Lalala!
            </p>
          </div>

          <div>
            <div className="mb-2 mt-5 text-lg font-medium">Follow Us</div>
            <div className="flex items-center gap-2">
              <Button
                size={'icon'}
                variant={'secondary'}
                className="rounded-full p-0"
              >
                <Instagram className="size-4 stroke-black dark:stroke-neutral-300" />
              </Button>
              <Button
                size={'icon'}
                variant={'secondary'}
                className="rounded-full p-0"
              >
                <Facebook className="size-4 stroke-black dark:stroke-neutral-300" />
              </Button>
              <Button
                size={'icon'}
                variant={'secondary'}
                className="rounded-full p-0"
              >
                <Twitter className="size-4 stroke-black dark:stroke-neutral-300" />
              </Button>
              <Button
                size={'icon'}
                variant={'secondary'}
                className="rounded-full p-0"
              >
                <Youtube className="size-4 stroke-black dark:stroke-neutral-300" />
              </Button>
            </div>
            <div className="mt-5 text-lg font-medium text-neutral-500">
              Best regards,
            </div>
            <div className="text-lg font-semibold">Lalala Team</div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default ThankSection;
