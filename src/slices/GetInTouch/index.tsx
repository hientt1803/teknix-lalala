import Bounded from '@/components/common/containers/bounded';
import ContactForm from '@/features/slice-global/contact/contact-form';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `GetInTouch`.
 */
export type GetInTouchProps = SliceComponentProps<Content.GetInTouchSlice>;

/**
 * Component for "GetInTouch" Slices.
 */
const GetInTouch = ({ slice }: GetInTouchProps): JSX.Element => {
   return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactForm />
            <div className="">
               LIST IAMGES 
            </div>
         </div>
      </Bounded>
   );
};

export default GetInTouch;
