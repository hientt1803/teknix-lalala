import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import { SearchGroup } from '@/components/common/searchGroup/searchGroup';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import MainContent from './components/main-content';

type FlightFeaturesType = Content.FlightListingSlice;

const FlightFeatures = ({ primary }: FlightFeaturesType) => {
   const { title, body, button_text } = primary;
   return (
      <div className="w-full relative lg:py-40  flex flex-col justify-center items-center">
         <Bounded className="flex flex-col gap-8">
            <SearchGroup typeProp="flight" />
            <div className="bg-indigo-100 rounded-2xl pt-5 flex-1">
               <div className="grid grid-cols-4 place-items-center">
                  <div className="col-span-1 relative">
                     <Image
                        src="/assets/images/flight/woman-guide.svg"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="col-span-2">
                     <div className="flex flex-col gap-2 h-full justify-start items-start">
                        <PrismicRichText
                           field={title}
                           components={{
                              heading2: ({ children }) => (
                                 <h2 className="text-neutral-900 text-3xl font-bold">{children}</h2>
                              ),
                           }}
                        />
                        <PrismicRichText
                           field={body}
                           components={{
                              paragraph: ({ children }) => (
                                 <p className="text-neutral-600 text-base">{children}</p>
                              ),
                           }}
                        />
                        <Button className="px-7 py-5">{button_text}</Button>
                     </div>
                  </div>
                  <div className="col-span-1 relative">
                     <Image
                        src="/assets/images/flight/man-guide.svg"
                        className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            </div>
            <MainContent />
         </Bounded>
      </div>
   );
};

export default FlightFeatures;
