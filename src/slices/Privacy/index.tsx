import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

/**
 * Props for `Privacy`.
 */
export type PrivacyProps = SliceComponentProps<Content.PrivacySlice>;
export const Components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

const paragraph = `<div className="box-detail-info"><p>At Lalala, we take your privacy seriously and are committed to  protecting your personal information. This Privacy Policy outlines how  we collect, use, disclose, and safeguard your data when you use our  website or services.</p><p> <strong>Information Collection: </strong>We may collect personal information such as your name, contact details,  payment information, and browsing activity when you interact with our  website or make a reservation.</p><p> <strong>Use of Information: </strong>We use the information collected to process your bookings, provide  customer support, improve our services, and communicate with you about  promotions or updates.</p><p> <strong>Disclosure of Information:</strong>We may share your information with third-party service providers,  business partners, or affiliates for purposes such as payment  processing, customer service, or marketing activities.</p><p> <strong>Data Security: </strong>We implement security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.</p><p> <strong>Cookies: </strong>We may use cookies and similar technologies to enhance your browsing  experience, analyze website traffic, and personalize content and  advertisements.</p><p> <strong>Third-Party Links: </strong>Our website may contain links to third-party websites or services. We  are not responsible for the privacy practices or content of these  websites.</p><p> <strong>Children's Privacy: </strong>Our services are not directed to individuals under the age of 18. We do  not knowingly collect personal information from children without  parental consent.</p><p> <strong>Changes to Privacy Policy: </strong>We reserve the right to update or modify this Privacy Policy at any  time. Any changes will be effective immediately upon posting on our  website.</p><p>If you have any questions or concerns about our Privacy Policy or the  handling of your personal information, please contact us at contact@Lalala.com.</p><h6>Thank you for visiting!</h6><p>By using our website or services, you consent to the terms of this  Privacy Policy. Please review this policy periodically for updates or  changes.</p></div>`;

/**
 * Component for "Privacy" Slices.
 */
const Privacy = ({ slice }: PrivacyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <Button className="rounded-full bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
          <Image
            src="/assets/images/about/real.svg"
            width={30}
            height={30}
            alt=""
          />
          <span className="text-base font-medium">{slice?.primary?.tag}</span>
        </Button>

        <PrismicRichText
          field={slice?.primary?.heading}
          components={Components}
        />

        <div className="text-lg">
          Last updated: {slice?.primary?.last_update}
        </div>
      </div>

      <div className="my-10 aspect-auto overflow-hidden rounded-2xl">
        <PrismicNextImage
          field={slice?.primary.image}
          alt=""
          className="h-fit w-full"
        />
      </div>

      {!slice?.primary?.hide_article && (
        <Bounded>
          <article
            className="prose mx-auto lg:prose-xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />

          <h6 className="my-10 text-2xl font-bold">Thank you for visiting!</h6>
          <p className="text-lg text-neutral-700 dark:text-neutral-500">
            By using our website or services, you consent to the terms of this
            Privacy Policy. Please review this policy periodically for updates
            or changes.
          </p>
          <div className="bmy-10">
            <p className="my-10 text-2xl font-bold">Follow us:</p>
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
            <p className="mt-10 text-lg text-neutral-500">Best regards, </p>
            <p className="neutral-1000 font-bold">Lalala Team</p>
          </div>
        </Bounded>
      )}
    </Bounded>
  );
};

export default Privacy;
