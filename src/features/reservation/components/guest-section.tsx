import InputLabel from '@/components/custom/input/input-label';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { MetaData } from '@/stores/features/reservation';
const data = [
   {
      name: 'Smoking room',
      value: 'smoking',
   },
   {
      name: 'Late check in',
      value: 'late',
   },
   {
      name: 'Early check in',
      value: 'early',
   },
   {
      name: 'Room on a high floor',
      value: 'high',
   },
   {
      name: 'Large bed',
      value: 'large',
   },
   {
      name: 'Airport tranfer',
      value: 'airport',
   },
   {
      name: 'Breakfast included',
      value: 'breakfast',
   },
   {
      name: 'Twin beds',
      value: 'twin',
   },
];

interface GuestSectionProps {
   meta_data: MetaData;
}
const GuestSection = ({ meta_data }: GuestSectionProps) => {
    const {booking_details} = meta_data
   return (
      <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-neutral-50 rounded-2xl">
         <h1 className="text-3xl font-bold p-5">🧑🏻‍💻 Guest Details</h1>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="p-5 space-y-5">
            <div className="bg-zinc-100/80 px-5 py-4 rounded-lg font-bold">Main Guest</div>
            <div className="grid grid-cols-6 gap-5">
               {/* <div className="col-span-1">
                  <div className="block">
                     <Label
                        className={cn(
                           'text-slate-900 mb-1 dark:text-slate-300 text-sm font-medium',
                        )}
                     >
                        Title
                     </Label>
                     <Select>
                        <SelectTrigger className="py-6 rounded-2xl">
                           <SelectValue placeholder="Title" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectItem value="mr">Mr</SelectItem>
                              <SelectItem value="mrs">Mrs</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </div>
               </div> */}
               <div className="col-span-3">
                  <InputLabel
                     label="First Name"
                     placeholder="Enter your first name"
                     sizes="small"
                     className="py-6 rounded-2xl"
                     value={booking_details.first_name}
                     readOnly
                  />
               </div>
               <div className="col-span-3">
                  <InputLabel
                     label="Last Name"
                     placeholder="Enter your last name"
                     sizes="small"
                     className="py-6 rounded-2xl"
                     value={booking_details.last_name}
                     readOnly
                  />
               </div>
               <div className="col-span-3">
                  <InputLabel
                     label="Email"
                     placeholder="Enter your email"
                     sizes="small"
                     className="py-6 rounded-2xl"
                     value={booking_details.email}
                     readOnly
                  />
                  <span className="text-xs text-neutral-400">
                     (Booking voucher will be sent to this email ID)
                  </span>
               </div>
               <div className="col-span-3">
                  <InputLabel
                     label="Phone number"
                     placeholder="Enter your phone number"
                     sizes="small"
                     className="py-6 rounded-2xl"
                     value={booking_details.phone}
                     readOnly
                  />
               </div>
            </div>
            <div className="bg-[#d1ecf1] text-[#107181] text-sm px-5 py-4 rounded-lg">
               <span className="font-bold">Subcrible</span> to prefill all details and get access to
               secret deals
            </div>
            <div className="rounded-2xl border border-slate-100 divide-y">
               <div className="flex items-center justify-between  p-5">
                  <h2 className="text-xl font-bold">Special request</h2>
                  <p />
               </div>
               <div className="flex flex-wrap gap-5 p-5">
                  {data.map((item) => (
                     <div className="flex items-center space-x-2" key={item.value}>
                        <Checkbox
                           id={item.value}
                           className="bg-neutral-200 border-neutral-200 rounded"
                        />
                        <label
                           htmlFor={item.value}
                           className="text-sm text-neutral-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           {item.name}
                        </label>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default GuestSection;
