import Image from '@/components/common/images/image';
import Badge from '@/components/custom/badges/badge';
import { Rating } from '@/components/custom/rating/rating';
import { RateMetaData } from '@/stores/features/reservation';
import { calculateNightsAndDays } from '@/utilities/datetime';
import { replaceSize } from '@/utilities/string';
import { formatDate } from 'date-fns';
import { Clock, MapPin, Sun } from 'lucide-react';
interface InfoSectionProps {
   hotel_data: {
      latitude: number;
      star_rating: number;
      id: string;
      longitude: string;
      images: string[];
      address: string;
      name: string;
   };
   rateMetaData: RateMetaData;
   checkout_date: string;
   checkin_date: string;
   num_guests: number;
   status: string;
}
const InfoSection = async ({
   hotel_data,
   rateMetaData,
   checkin_date,
   checkout_date,
   num_guests,
   status,
}: InfoSectionProps) => {
   const { images, name, address, star_rating } = hotel_data;
   const { nights, days } = calculateNightsAndDays(checkin_date, checkout_date);
   if (!hotel_data) return null;
   return (
      <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl">
         <h1 className="text-3xl font-bold p-5">🏢 Hotel infomation</h1>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="grid grid-cols-4 gap-5 p-5 items-center">
            <Image
               src={replaceSize(images[0])}
               className="aspect-[4/3] rounded-2xl col-span-1"
               alt=""
            />
            <div className="col-span-3 space-y-2">
               <Badge color="orange" className="font-medium capitalize">
                  {status}
               </Badge>
               <h2 className="text-2xl font-bold">{name || 'Loading...'}</h2>
               <p className="flex items-center text-slate-400 gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{address || 'Loading...'}</span>
               </p>
               <div className="flex items-center gap-3">
                  <Rating
                     rating={star_rating}
                     variant="yellow"
                     className="text-orange-600"
                     size={15}
                     disabled
                  />
                  <span className="text-sm font-semibold">{star_rating}/5.0</span>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-3 gap-5 px-5">
            <div className="p-5 rounded-2xl bg-zinc-50 flex flex-col gap-1 justify-between">
               <span className="text-sm">Check-in</span>
               <h3 className="text-xl font-bold">{formatDate(checkin_date, 'dd MMM yyyy')}</h3>
               <p className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(checkin_date, 'p')}</span>
               </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 flex flex-col gap-1 justify-between">
               <span className="text-sm">Check out</span>
               <h3 className="text-xl font-bold">{formatDate(checkout_date, 'dd MMM yyyy')}</h3>
               <p className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(checkout_date, 'p')}</span>
               </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-50 flex flex-col gap-1 justify-between">
               <span className="text-sm">Rooms & Guests</span>
               <h3 className="text-xl font-bold">{num_guests} G - 1 R</h3>
               <p className="flex items-center gap-1 text-sm text-slate-600">
                  <Sun className="w-4 h-4" />
                  <span>
                     {nights} Nights - {days} Days
                  </span>
               </p>
            </div>
         </div>
         <div className="p-5">
            <div className="rounded-2xl border border-slate-100 divide-y">
               <div className="flex items-center justify-between  p-5">
                  <h2 className="text-xl font-bold">Deluxe Pool View with Breakfast</h2>
                  <p className="text-sm text-blue-700">View Cancellation Policy</p>
               </div>
               <div className="flex flex-col gap-3 p-5">
                  <h5 className="font-bold">Price Included</h5>
                  <ul className="flex flex-col gap-3 text-base text-slate-600">
                     {rateMetaData?.meal_data?.has_breakfast && (
                        <li className="flex items-center gap-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.2rem"
                              height="1.2rem"
                              viewBox="0 0 24 24"
                              className="text-teal-500"
                           >
                              <path
                                 fill="currentColor"
                                 fillRule="evenodd"
                                 d="M9.592 3.2a6 6 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.71 2.71 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a6 6 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.71 2.71 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.71 2.71 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a6 6 0 0 1-.399-.495a2.7 2.7 0 0 1-.408-.985a6 6 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.71 2.71 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a6 6 0 0 1-.632-.068a2.7 2.7 0 0 1-.985-.408a6 6 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.71 2.71 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0z"
                                 clipRule="evenodd"
                              ></path>
                           </svg>
                           Free Breakfast.
                        </li>
                     )}
                     {!rateMetaData?.meal_data?.no_child_meal && (
                        <li className="flex items-center gap-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.2rem"
                              height="1.2rem"
                              viewBox="0 0 24 24"
                              className="text-teal-500"
                           >
                              <path
                                 fill="currentColor"
                                 fillRule="evenodd"
                                 d="M9.592 3.2a6 6 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.71 2.71 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a6 6 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.71 2.71 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.71 2.71 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a6 6 0 0 1-.399-.495a2.7 2.7 0 0 1-.408-.985a6 6 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.71 2.71 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a6 6 0 0 1-.632-.068a2.7 2.7 0 0 1-.985-.408a6 6 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.71 2.71 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0z"
                                 clipRule="evenodd"
                              ></path>
                           </svg>
                           Free Meal for Kids Below the age of 12 years
                        </li>
                     )}
                     <li className="flex items-center gap-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="1.2rem"
                           height="1.2rem"
                           viewBox="0 0 24 24"
                           className="text-teal-500"
                        >
                           <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M9.592 3.2a6 6 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.71 2.71 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a6 6 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.71 2.71 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.71 2.71 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a6 6 0 0 1-.399-.495a2.7 2.7 0 0 1-.408-.985a6 6 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.71 2.71 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a6 6 0 0 1-.632-.068a2.7 2.7 0 0 1-.985-.408a6 6 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.71 2.71 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0z"
                              clipRule="evenodd"
                           ></path>
                        </svg>
                        {rateMetaData?.payment_options?.payment_types[0]?.cancellation_penalties
                           ?.free_cancellation_before
                           ? 'Free cancellation'
                           : 'On Cancellation, You will not get any refund'}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default InfoSection;
