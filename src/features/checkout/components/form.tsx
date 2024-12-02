'use client';

import ButtonLoading from '@/components/custom/buttons/button-loading';
import InputLabel from '@/components/custom/input/input-label';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { HTTPStatus } from '@/configs';
import { toast } from '@/hooks/use-toast';
import countriesList from '@/lib/countries.json';
import { useAppSelector } from '@/stores';
import { useCreateReservationMutation } from '@/stores/features/reservation';
import { setReserveForm } from '@/stores/features/stay';
import { IHotelReservation, IReserveForm } from '@/stores/features/stay/type';
import { ErrorType } from '@/types/error';
import { generateTimeSlotsFromNow, timeFormatString } from '@/utilities/time';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Country, isValidPhoneNumber } from 'react-phone-number-input';
import { useDispatch } from 'react-redux';
import * as z from 'zod';
import { PhoneInput } from './phone-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
   email: z.string().email({ message: "Oops, that email won't work, please enter a valid one." }),
   lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
   firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
   phoneNumber: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
   citizenship: z.string(),
   message: z.string(),
   arrive: z.string().min(1, { message: 'Arrival time is required' }),
   specialRequest: z.string(),
   freePaperless: z.boolean().default(false).optional(),
   bookingFor: z.enum(['main', 'someone']),
   areYouWork: z.enum(['yes', 'no']),
   company: z
      .object({
         companyName: z.string().optional(),
         vatNumber: z.string().optional(),
      })
      .optional(),
});

type FormInfoProps = {
   data?: IHotelReservation;
   isConfirm: boolean;
   setIsConfirm: (value: boolean) => void;
   scrollIntoView: () => void;
};

type CountryType = {
   label: string;
   value: string;
};

const FormInfomation = ({ data, isConfirm, setIsConfirm, scrollIntoView }: FormInfoProps) => {
   //   next api
   const router = useRouter();
   const pathname = usePathname();

   // redux
   const hotel = useAppSelector((state) => state.staySlice.reserveForm);
   const dispatch = useDispatch();

   // state
   const [countries, setCountries] = useState<CountryType[]>([]);
   const [selectedCountry, setSelectedCountry] = useState<CountryType>();
   const [countryInputOpened, setCountryInputOpened] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      defaultValues: {
         email: hotel.meta_data?.booking_details?.email || '',
         lastName: hotel.meta_data?.booking_details?.last_name || '',
         firstName: hotel.meta_data?.booking_details?.first_name || '',
         phoneNumber: '',
         // phoneNumber:
         //    hotel.meta_data?.booking_details?.phone?.slice(
         //       1,
         //       hotel.meta_data.booking_details.phone.length,
         //    ) || '84',
         // citizenship: hotel.meta_data?.booking_details?.country || '',
         citizenship: '',
         message: '',
         arrive: '',
         specialRequest: '',
         bookingFor: 'main',
         areYouWork: 'yes',
      },
      resolver: zodResolver(formSchema),
   });
   const [isErrorPhone, setIsErrorPhone] = useState(false);

   // api
   const [createReservation, { isLoading: isLoadingCreate, error }] =
      useCreateReservationMutation();

   useEffect(() => {
      const fetchData = async () => {
         const data = countriesList;

         const formattedCountries = data.map(
            (country: { name: { common: string }; cca2: string }) => ({
               label: country.name.common,
               value: country.cca2,
            }),
         );
         setCountries(formattedCountries);
      };

      fetchData();
   }, []);

   // logic
   const dateStr = `${hotel.checkin_date}`;
   const timeSlots = generateTimeSlotsFromNow(dateStr);

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         if (!isErrorPhone) {
            try {
               const reservationForm: IReserveForm = hotel;
               const rate = hotel.rate;
               const reqReservation: IReserveForm = {
                  book_hash: reservationForm.book_hash,
                  hotel_id: reservationForm.hotel_id,
                  match_hash: reservationForm.match_hash,
                  num_guests: reservationForm.num_guests,
                  room_id: reservationForm.room_id,
                  meta_data: {
                     booking_details: {
                        first_name: values.firstName,
                        last_name: values.lastName,
                        email: values.email,
                        // country: values.citizenship.substring(
                        //    values.citizenship.length - 3,
                        //    values.citizenship.length - 1,
                        // ),
                        country: selectedCountry?.value,
                        phone: values.phoneNumber,
                     },
                     additional: {
                        is_renting_car: false,
                        special_request: values.specialRequest || '',
                     },
                     is_trip_booking: false,
                     arrival_time: '',
                     is_main_guest: true,
                  },
                  coupon_code: '',
                  checkin_date: `${reservationForm.checkin_date.substring(
                     0,
                     reservationForm.checkin_date.lastIndexOf('T') + 1,
                  )}${timeFormatString(values.arrive)}`,
                  checkout_date: `${reservationForm.checkout_date.substring(
                     0,
                     reservationForm.checkout_date.lastIndexOf('T') + 1,
                  )}${data?.check_out_time || '00:00'}`,
               };

               const res = await createReservation(reqReservation).unwrap();
               if (res) {
                  const updateReservation: IReserveForm = {
                     ...reqReservation,
                     rate: rate,
                  };
                  dispatch(setReserveForm(updateReservation));
                  toast({
                     title: 'Success',
                     description: 'Create reservation successfuly!',
                     variant: 'success',
                  });
                  setIsConfirm(true);
                  history.pushState(null, '', `/checkout?reservation=${res.id}`);
                  //   window.location.
                  //   router.push(`/checkout?reservation=${res.id}`, { scroll: true });

                  scrollIntoView();
               }
            } catch (e) {
               const error = e as ErrorType;
               console.log(error);
               setIsConfirm(false);
               toast({
                  title: 'Error',
                  description: `${
                     error.data.statusCode === HTTPStatus.INTERNAL_SERVER_ERROR
                        ? 'Your room is booked; please choose another one to reserve.'
                        : error.data.message
                  }`,
                  variant: 'destructive',
               });

               if (error.status === HTTPStatus.INTERNAL_SERVER_ERROR) {
                  const reservationForm: IReserveForm = hotel;
                  const updateReservation: IReserveForm = {
                     ...reservationForm,
                     meta_data: {
                        booking_details: {
                           first_name: values.firstName,
                           last_name: values.lastName,
                           email: values.email,
                           country: values.citizenship.substring(
                              values.citizenship.length - 3,
                              values.citizenship.length - 1,
                           ),
                           phone: values.phoneNumber,
                        },
                     },
                     book_hash: '',
                     match_hash: '',
                     room_id: '',
                     rate: undefined,
                     coupon_code: '',
                     checkin_date: `${reservationForm.checkin_date.substring(
                        0,
                        reservationForm.checkin_date.lastIndexOf('T') + 1,
                     )}${values.arrive}`,
                     checkout_date: `${reservationForm.checkout_date.substring(
                        0,
                        reservationForm.checkout_date.lastIndexOf('T') + 1,
                     )}${data?.check_out_time || '00:00'}`,
                  };
                  dispatch(setReserveForm(updateReservation));
                  router.push(`/hotel/${hotel.hotel_id}`);
               }
            }
         } else {
            toast({
               title: 'Error',
               description: 'Your room is booked; please choose another one to reserve.',
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Form {...form}>
         <form className="mt-7" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
               <div className="space-y-1">
                  {/* EMAIL INPUT */}
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <InputLabel
                                 required
                                 sizes="small"
                                 label="Email"
                                 type="email"
                                 readOnly={isConfirm}
                                 placeholder="example@gmail.com"
                                 {...field}
                                 className="rounded-lg"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {/* LAST & FIRST NAME */}
               <div className="flex space-x-5">
                  <div className="flex-1 space-y-1">
                     <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <InputLabel
                                    sizes="small"
                                    required
                                    label="Last name"
                                    type="text"
                                    readOnly={isConfirm}
                                    placeholder="Ex: John Doe"
                                    className="rounded-lg"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex-1 space-y-1">
                     <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <InputLabel
                                    sizes="small"
                                    required
                                    label="First name"
                                    type="text"
                                    readOnly={isConfirm}
                                    placeholder="Ex: Doe"
                                    className="rounded-lg"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <div className="space-y-1">
                  {/* <InputPhoneNumber
                            readOnly={isConfirm}
                            value={form.getValues().phoneNumber}
                            onChange={(city, phone, isError) => {
                                form.setValue("phoneNumber", phone);
                                form.setValue("citizenship", city);
                                setIsErrorPhone(isError);
                            }}
                        /> */}
                  <FormField
                     control={form.control}
                     name="phoneNumber"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                              Phone number <span className="text-red-500">*</span>
                           </FormLabel>

                           <FormControl>
                              <PhoneInput
                                 placeholder="Enter a phone number"
                                 international
                                 readOnly={isConfirm}
                                 defaultCountry={(form.getValues().citizenship as Country) || 'VN'}
                                 className="w-full rounded-lg border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 bg-white text-sm font-normal h-11"
                                 {...field}
                                 onCountryChange={(c) => form.setValue('citizenship', c || '')}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-1">
                  <FormField
                     control={form.control}
                     name="citizenship"
                     render={({ field }) => (
                        <FormItem className="flex flex-col justify-start items-start gap-1">
                           <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                              Country <span className="text-red-500">*</span>
                           </FormLabel>

                           <FormControl>
                              {/* <InputLabel
                                 sizes="small"
                                 required
                                 type="text"
                                 readOnly
                                 label="Citizenship"
                                 placeholder="Ex: Viet Nam"
                                 id="city"
                                 {...field}
                              /> */}
                              {/* <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                                 disabled={isConfirm}
                              >
                                 <FormControl>
                                    <SelectTrigger className="w-full border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1">
                                       <SelectValue
                                          placeholder="Select your country"
                                          defaultValue={field.value}
                                       />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {countries.map((country, index) => (
                                       <SelectItem key={index} value={country.value}>
                                          {country.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select> */}
                              <Popover
                                 open={countryInputOpened}
                                 onOpenChange={(open) => {
                                    if (open == false) {
                                       setCountryInputOpened(false);
                                    }
                                 }}
                              >
                                 <PopoverTrigger asChild>
                                    <Input
                                       value={
                                          selectedCountry
                                             ? countries?.find(
                                                  (country) =>
                                                     country.value === selectedCountry.value,
                                               )?.label
                                             : 'Select your country...'
                                       }
                                       className="text-start rounded-lg cursor-pointer border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white text-sm font-normal min-h-11 px-4 py-3"
                                       onClick={() => {
                                          setCountryInputOpened(!countryInputOpened);
                                       }}
                                    />
                                 </PopoverTrigger>
                                 <PopoverContent
                                    className="p-0"
                                    align="start"
                                    style={{ width: 'var(--radix-popover-trigger-width)' }}
                                 >
                                    <Command className="w-full">
                                       <CommandInput placeholder="Find your country" />
                                       <CommandList>
                                          <CommandEmpty>No results found.</CommandEmpty>
                                          <CommandGroup>
                                             {countries.map((country, index) => (
                                                <CommandItem
                                                   key={index}
                                                   value={country.label}
                                                   onSelect={(currentValue) => {
                                                      setSelectedCountry({
                                                         label: country.label,
                                                         value: country.value,
                                                      });
                                                      setCountryInputOpened(false);
                                                   }}
                                                   onChange={field.onChange}
                                                >
                                                   {country.label}
                                                </CommandItem>
                                             ))}
                                          </CommandGroup>
                                       </CommandList>
                                    </Command>
                                 </PopoverContent>
                              </Popover>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-1">
                  <FormField
                     control={form.control}
                     name="arrive"
                     render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                           <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                              Arrival time <span className="text-red-500">*</span>
                           </FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isConfirm}
                           >
                              <FormControl>
                                 <SelectTrigger className="w-full rounded-lg border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white text-sm font-normal h-11 px-4 py-3 mt-1">
                                    <SelectValue
                                       placeholder="Select arrival time"
                                       // defaultValue={field.value}
                                    />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {/* <SelectGroup> */}
                                 {timeSlots.map((time, index) => (
                                    <SelectItem key={index} value={time}>
                                       {time}
                                    </SelectItem>
                                 ))}
                                 {/* </SelectGroup> */}
                              </SelectContent>
                           </Select>
                           <FormDescription>
                              <span className="flex flex-nowrap gap-1 items-center">
                                 <i className="las la-exclamation-circle text-lg"></i>
                                 Late check in ultil {data?.check_out_time}
                              </span>
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-1">
                  <FormField
                     control={form.control}
                     name="specialRequest"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                              Message
                           </FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Message"
                                 rows={4}
                                 readOnly={isConfirm}
                                 className="min-h-[150px] rounded-lg block w-full border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white text-sm font-normal h-11 px-4 py-3 mt-1"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              <span className="text-sm text-neutral-500 block">
                                 Write a few sentences about yourself.
                              </span>
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-1">
                  <FormField
                     control={form.control}
                     name="freePaperless"
                     render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                           <div className="flex items-center space-x-2">
                              <FormControl>
                                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="space-y-1 leading-none">
                                 <span>Yes, I want free paperless confirmation (recommended)</span>
                                 <FormDescription className="font-normal">
                                    You can manage your mobile notifications in the We'll text you a
                                    link to download our app
                                 </FormDescription>
                              </FormLabel>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
               <div className="space-y-1">
                  <FormField
                     control={form.control}
                     name="bookingFor"
                     render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                           <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                              Who are you booking for?
                           </FormLabel>
                           <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                           >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                 <FormControl>
                                    <RadioGroupItem value="main" />
                                 </FormControl>
                                 <FormLabel className="font-light text-neutral-600 dark:text-neutral-400 text-sm">
                                    I'm the main guest
                                 </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                 <FormControl>
                                    <RadioGroupItem value="someone" />
                                 </FormControl>
                                 <FormLabel className="font-light text-neutral-600 dark:text-neutral-400 text-sm">
                                    I'm booking for someone esle
                                 </FormLabel>
                              </FormItem>
                           </RadioGroup>

                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-1">
                  <FormField
                     control={form.control}
                     name="areYouWork"
                     render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                           <FormLabel className="text-neutral-800 dark:text-neutral-300 text-sm">
                              Are you traveling for work?
                           </FormLabel>
                           <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-1"
                           >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                 <FormControl>
                                    <RadioGroupItem value={'yes'} />
                                 </FormControl>
                                 <FormLabel className="font-light text-neutral-600 dark:text-neutral-400 text-sm">
                                    Yes
                                 </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                 <FormControl>
                                    <RadioGroupItem value="no" />
                                 </FormControl>
                                 <FormLabel className="font-light text-neutral-600 dark:text-neutral-400 text-sm">
                                    No
                                 </FormLabel>
                              </FormItem>
                           </RadioGroup>

                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {form.getValues('areYouWork') === 'yes' && (
                  <div className="flex space-x-5">
                     <div className="flex-1 space-y-1">
                        <FormField
                           control={form.control}
                           name="company.companyName"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <InputLabel
                                       sizes="small"
                                       requiredLabel
                                       label="Company Name"
                                       type="text"
                                       readOnly={isConfirm}
                                       placeholder="Ex: Texnik Comporation"
                                       className="rounded-lg"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div className="flex-1 space-y-1">
                        <FormField
                           control={form.control}
                           name="company.vatNumber"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <InputLabel
                                       sizes="small"
                                       label="Vat Number"
                                       requiredLabel
                                       type="text"
                                       readOnly={isConfirm}
                                       placeholder="000 000"
                                       className="rounded-lg"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
               )}
            </div>

            <div className="pt-8 flex flex-1 justify-end">
               <ButtonLoading
                  loading={isLoadingCreate}
                  disabled={isConfirm}
                  type="submit"
                  className="relative h-auto inline-flex items-center justify-center rounded-lg transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-0 "
               >
                  Confirm your info
               </ButtonLoading>
            </div>
         </form>
      </Form>
   );
};

export default FormInfomation;
