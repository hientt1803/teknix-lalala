import { Checkbox } from '@/components/ui/checkbox';
import { Description } from '@radix-ui/react-toast';
import { Caravan, CarFront, CarTaxiFront, IdCard, Plane, PlaneTakeoff } from 'lucide-react';

const datas = [
   {
      name: "I'm interested in requesting an airport shuttle",
      icon: <Caravan className="size-10 stroke-[1.3] text-neutral-700 dark:text-neutral-400" />,
      description:
         'We’ll tell your accommodations that you’re interested, so they can provide details and costs.',
   },
   {
      name: 'I’ll need a flight for my trip',
      icon: <Plane className="size-10 stroke-[1.3] text-neutral-700 dark:text-neutral-400" />,
      description:
         'Flexible flight options from Can Tho to Danang starting at VND 4,096,346 round-trip. Finish booking this stay to get flight recommendations that match your selected dates.',
   },
   {
      name: "I'm interested in renting a car",
      icon: <CarFront className="size-10 stroke-[1.3] text-neutral-700 dark:text-neutral-400" />,
      description:
         ' Make the most of your trip – check out car rental options in your booking confirmation.',
   },
   {
      name: 'Want to book a taxi or shuttle ride in advance?',
      icon: <IdCard className="size-10 stroke-[1.3] text-neutral-700 dark:text-neutral-400" />,
      description:
         "Avoid surprises – get from the airport to your accommodations without any hassle. We'll add taxi options to your booking confirmation.",
   },
];
const AddYourStay = () => {
   return (
      <div>
         <h3 className="text-xl font-semibold">Add to your stay</h3>
         <span className="text-sm text-neutral-400  mt-3">Optional choose your stay</span>
         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5" />

         <div className="flex flex-col gap-2 divide-y divide-neutral-100 dark:divide-neutral-700">
            {datas.map((data, index) => (
               <div className="flex flex-nowrap justify-between items-center" key={index}>
                  <div className="flex items-start space-x-3 py-3 lg:w-4/5">
                     <Checkbox className='size-5' id={index + ''} />
                     <label
                        htmlFor={index + ''}
                        className="text-sm leading-none flex flex-col gap-2"
                     >
                        <span className="font-normal">{data.name}</span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                           {data.description}
                        </span>
                     </label>
                  </div>
                  <div className="flex-shrink">{data.icon}</div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AddYourStay;
