'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { IHotelReservation } from '@/stores/features/stay/type';

// Dynamically import sections
const BannerSection = dynamic(() =>
  import('./sections/banner-section').then(mob => mob.BannerSection),
);
const AmenitiesSection = dynamic(() => import('./sections/amenity-section'));
const ReviewSection = dynamic(() => import('./sections/review-section'), {
  ssr: false,
});
const LocationSection = dynamic(() => import('./sections/location-section'));
const ThingToKnowSection = dynamic(
  () => import('./sections/thing-to-know-section'),
  { ssr: false },
);
const FaciliiesSection = dynamic(() => import('./sections/facilities-section'));
const HotelInfoSection = dynamic(() => import('./sections/hotel-info-section'));
const HowItWorkSection = dynamic(
  () => import('./sections/how-it-work-section'),
);
const VideoSection = dynamic(() => import('./sections/video-section'), {
  ssr: false,
});
const ListRoomSections = dynamic(() =>
  import('./sections/list-room-sections').then(mob => mob.ListRoomSections),
);

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
  // const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
  //    offset: 60,
  // });

  // state
  // const [isTargetInView, setIsTargetInView] = useState(false);
  const listRoomRefSection = useRef<HTMLDivElement>(null);
  const locationRefSection = useRef<HTMLDivElement>(null);

  // logic
  // useEffect(() => {
  //    const observer = new IntersectionObserver(
  //       (entries) => {
  //          const entry = entries[0];
  //          setIsTargetInView(entry.isIntersecting);
  //       },
  //       {
  //          root: null, // uses the viewport
  //          rootMargin: '0px',
  //          threshold: 0.1, // Adjust as needed (0.1 means 10% of target is in view)
  //       },
  //    );

  //    if (targetRef.current) {
  //       observer.observe(targetRef.current);
  //    }

  //    return () => {
  //       if (targetRef.current) {
  //          observer.unobserve(targetRef.current);
  //       }
  //    };
  // }, [targetRef]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({
      top: ref?.current?.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollIntoListRoomSection = () => {
    scrollToSection(listRoomRefSection);
  };
  const scrollIntoLocationSection = () => {
    scrollToSection(locationRefSection);
  };

  return (
    <div className="relative z-10 mt-11 flex flex-col">
      {/* MAIN INFO */}
      <div className="w-full">
        {/* MAIN */}
        <BannerSection
          data={data}
          scrollIntoListRoomSection={scrollIntoListRoomSection}
          scrollIntoLocationSection={scrollIntoLocationSection}
        />

        {/* FACILITES */}
        <FaciliiesSection facilities={data?.serp_filters || []} />

        {/* HOTEL INFO */}
        <HotelInfoSection
          data={data}
          scrollIntoListRoomSection={scrollIntoListRoomSection}
        />

        {/* LIST ROOM SECTION */}
        <div ref={listRoomRefSection}>
          <ListRoomSections id={id} />
        </div>

        {/* HOW IT WORKS */}
        <HowItWorkSection />

        {/* VIDEOS */}
        <VideoSection />

        {/* LOCATION */}
        <div ref={locationRefSection}>
          {data && <LocationSection hotelData={data} />}
        </div>

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
        <ReviewSection id={id} />
      </div>
    </div>
  );
};

export default MainContent;