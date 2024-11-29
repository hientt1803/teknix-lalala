'use client';

import { IHotelReservation } from '@/stores/features/stay/type';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import ImageGalleryComp from '@/components/custom/media/image-gallery';
import { Button } from '@/components/ui/button';
import { useScrollIntoView } from '@/hooks/use-scroll';
import { MostFacilities } from './sections/most-facilities';
import { NewHeaderSection } from './sections/new-header-section';

// Dynamically import sections
// const MainSection = dynamic(() => import('./sections/main-section'));
const StaySection = dynamic(() => import('./sections/stay-section'));
const AmenitiesSection = dynamic(() => import('./sections/amenity-section'));
// const RoomRateSection = dynamic(() => import('./sections/room-rate-section'));
const AvailiableSection = dynamic(() => import('./sections/availiable-section'));
// const HostInfoSection = dynamic(() => import('./sections/host-info-section'));
const ReviewSection = dynamic(() => import('./sections/review-section'));
const LocationSection = dynamic(() => import('./sections/location-section'));
const ThingToKnowSection = dynamic(() => import('./sections/thing-to-know-section'));
const ReserveSection = dynamic(() => import('./sections/reserve-section'));
const FaciliiesSection = dynamic(() => import('./sections/facilities-section'));
const HotelInfoSection = dynamic(() => import('./sections/hotel-info-section'));
const HowItWorkSection = dynamic(() => import('./sections/how-it-work-section'));
const VideoSection = dynamic(() => import('./sections/video-section'));

type Props = {
   id: string;
   data?: IHotelReservation;
};

const MainContent = ({ data, id }: Props) => {
   // api
   // const { data: hotelReview } = useGetReviewByStayIdQuery({
   //    id: id,
   // });

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
      <div>
         {/* NEW HEADER */}
         {/* <NewHeaderSection data={data} id={id} scrollIntoReviewSection={scrollIntoReviewSection} /> */}

         {/* IMAGE GALLERY */}
         {/* <div className="mt-8 mb-5">
            {data?.images.length ? (
               // <ImagesGalleryLazy images={data?.images ?? []} type="default" />
               <ImageGalleryComp images={data?.images ?? []} type="default" />
            ) : (
               <p>No images available</p>
            )}
         </div> */}

         {/* <MostFacilities facilities={data?.serp_filters} /> */}
         {/* MAIN INFO */}
         <div className="relative z-10 mt-11 flex flex-col">
            <div className="w-full">
               {/* MAIN */}
               {/* <MainSection
                  data={data}
                  id={id}
                  hotelReview={hotelReview}
                  scrollIntoReviewSection={scrollIntoReviewSection}
               /> */}
               {/* FACILITES */}
               <FaciliiesSection facilities={data?.serp_filters || []} />
               {/* HOTEL INFO */}
               <HotelInfoSection data={data} scrollIntoReviewSection={scrollIntoReviewSection} />
               {/* STAY INFO */}
               {/* <StaySection desc={data?.description_struct} /> */}
               {/* ROOM RATE */}
               {/* <RoomRateSection /> */}
               {/* AVAILABLE */}
               <div ref={targetRef}>
                  <AvailiableSection id={id} />
               </div>
               {/* HOW IT WORKS */}
               <HowItWorkSection />
               {/* VIDEOS */}
               <VideoSection />
               {/* HOST INFORMATION */}
               {/* <HostInfoSection /> */}
               {/* LOCATION */}
               {data && <LocationSection hotelData={data} />}
               {/* AMENITIES */}
               <AmenitiesSection amenites={data?.amenity_groups} />
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
            {/* <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
               <div className="sticky top-28">
                  <ReserveSection id={id} scrollIntoView={scrollIntoView} />
               </div>
            </div> */}
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
      </div>
   );
};

export default MainContent;
