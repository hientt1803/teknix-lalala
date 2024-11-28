'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IHotelReservation } from '@/stores/features/stay/type';

import { Button } from '@/components/ui/button';
import { useScrollIntoView } from '@/hooks/use-scroll';
import { useGetReviewByStayIdQuery } from '@/stores/features/review';

// Dynamically import sections
const MainSection = dynamic(() => import('./sections/main-section'));
const StaySection = dynamic(() => import('./sections/stay-section'));
const AmenitiesSection = dynamic(() => import('./sections/amenity-section'));
// const RoomRateSection = dynamic(() => import('./sections/room-rate-section'));
const AvailiableSection = dynamic(() => import('./sections/availiable-section'));
// const HostInfoSection = dynamic(() => import('./sections/host-info-section'));
const ReviewSection = dynamic(() => import('./sections/review-section'));
const LocationSection = dynamic(() => import('./sections/location-section'));
const ThingToKnowSection = dynamic(() => import('./sections/thing-to-know-section'));
const ReserveSection = dynamic(() => import('./sections/reserve-section'));

type Props = {
   id: string;
   data?: IHotelReservation;
};

const MainContent = ({ data, id }: Props) => {
   // api
   const { data: hotelReview, isLoading } = useGetReviewByStayIdQuery({
      id: id,
   });

   // hooks
   const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
      offset: 60,
   });

   // state
   const [isTargetInView, setIsTargetInView] = useState(false);
   const reviewRefSection = useRef<HTMLDivElement>(null);

   // logic
   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            const entry = entries[0];
            setIsTargetInView(entry.isIntersecting);
         },
         {
            root: null, // uses the viewport
            rootMargin: '0px',
            threshold: 0.1, // Adjust as needed (0.1 means 10% of target is in view)
         },
      );

      if (targetRef.current) {
         observer.observe(targetRef.current);
      }

      return () => {
         if (targetRef.current) {
            observer.unobserve(targetRef.current);
         }
      };
   }, [targetRef]);

   const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      window.scrollTo({
         top: ref?.current?.offsetTop,
         behavior: 'smooth',
      });
   };

   const scrollIntoReviewSection = () => {
      scrollToSection(reviewRefSection);
   };

   return (
      <div className="relative z-10 mt-11 flex flex-col lg:flex-row">
         {/* MAIN INFO */}
         <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
            {/* MAIN */}
            <MainSection
               data={data}
               id={id}
               hotelReview={hotelReview}
               scrollIntoReviewSection={scrollIntoReviewSection}
            />
            {/* STAY INFO */}
            <StaySection desc={data?.description_struct} />
            {/* ROOM RATE */}
            {/* <RoomRateSection /> */}
            {/* AVAILABLE */}
            <div ref={targetRef}>
               <AvailiableSection id={id} />
            </div>
            {/* AMENITIES */}
            <AmenitiesSection amenites={data?.amenity_groups} />
            {/* HOST INFORMATION */}
            {/* <HostInfoSection /> */}
            {/* LOCATION */}
            {data && <LocationSection hotelData={data} />}
            {/* THING TO KNOW */}
            <ThingToKnowSection
               policies={data?.policy_struct}
               front_desk_time_start={data?.front_desk_time_start}
               front_desk_time_end={data?.front_desk_time_end}
               check_in_time={data?.check_in_time}
               check_out_time={data?.check_out_time}
            />
            {/* REVIEWS */}
            <div ref={reviewRefSection}>
               <ReviewSection id={id} />
            </div>
         </div>
         {/* RESERVE */}
         <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
            <div className="sticky top-28">
               <ReserveSection id={id} scrollIntoView={scrollIntoView} />
            </div>
         </div>
         {/* RESERVE MOBILE */}
         {!isTargetInView && (
            <Button
               onClick={() => {
                  scrollIntoView();
               }}
               className="flex lg:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-slate-900 text-white shadow-2xl rounded-full z-30 space-x-3 text-sm cursor-pointer"
            >
               <i className="text-lg las la-map-signs"></i>
               <span>View all room</span>
            </Button>
         )}
      </div>
   );
};

export default MainContent;
