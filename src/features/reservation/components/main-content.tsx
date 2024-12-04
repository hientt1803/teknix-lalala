import { getReservationHistoryData } from '@/services/reservation';

import GuestSection from './guest-section';
import InfoSection from './info-section';
import PriceSection from './price-section';

const MainContent = async ({ id }: { id: string }) => {
  const data = await getReservationHistoryData(id);
  const {
    rate_meta_data,
    checkin_date,
    checkout_date,
    num_guests,
    hotel_data,
    status,
    meta_data,
    total_discount,
  } = data;
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="col-span-2 flex flex-col gap-5">
        <InfoSection
          hotel_data={hotel_data[0]}
          rateMetaData={rate_meta_data}
          checkin_date={checkin_date}
          checkout_date={checkout_date}
          num_guests={num_guests}
          status={status}
        />
        <GuestSection meta_data={meta_data} />
        {/* <PaymentSection /> */}
      </div>
      <div className="col-span-1">
        <PriceSection
          paymentOptions={rate_meta_data.payment_options}
          total_discount={total_discount}
        />
      </div>
    </div>
  );
};

export default MainContent;
