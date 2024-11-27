import ButtonLoading from '@/components/custom/buttons/button-loading';
import InputLabel from '@/components/custom/input/input-label';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { HTTPStatus } from '@/configs';
import { toast } from '@/hooks/use-toast';
import { useAppSelector } from '@/stores';
import { useCreateReservationMutation } from '@/stores/features/reservation';
import { setReserveForm } from '@/stores/features/stay';
import { IHotelReservation, IReserveForm } from '@/stores/features/stay/type';
import { ErrorType } from '@/types/error';
import { generateTimeSlotsFromNow, timeFormatString } from '@/utilities/time';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as z from 'zod';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from './phone-input';
import { Country, isValidPhoneNumber } from 'react-phone-number-input';
const formSchema = z.object({
   email: z.string().email({ message: "Oops, that email won't work, please enter a valid one." }),
   lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
   firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
   phoneNumber: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
   citizenship: z.string(),
   message: z.string(),
   arrive: z.string().min(1, { message: 'Arrival time is required' }),
});

type FormInfoProps = {
   data?: IHotelReservation;
   isConfirm: boolean;
   setIsConfirm: (value: boolean) => void;
   scrollIntoView: () => void;
};
const FormInfomation = ({ data, isConfirm, setIsConfirm, scrollIntoView }: FormInfoProps) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [createReservation, { isLoading: isLoadingCreate, error }] =
      useCreateReservationMutation();
   const hotel = useAppSelector((state) => state.staySlice.reserveForm);
   const form = useForm<z.infer<typeof formSchema>>({
      defaultValues: {
         email: hotel.meta_data?.booking_details?.email || '',
         lastName: hotel.meta_data?.booking_details?.last_name || '',
         firstName: hotel.meta_data?.booking_details?.first_name || '',
         phoneNumber:
            hotel.meta_data?.booking_details?.phone?.slice(
               1,
               hotel.meta_data.booking_details.phone.length,
            ) || '84',
         citizenship: hotel.meta_data?.booking_details?.country || '',
         message: '',
         arrive: '',
      },
      resolver: zodResolver(formSchema),
   });
   const [isErrorPhone, setIsErrorPhone] = useState(false);
   const dateStr = `${hotel.checkin_date}`;
   console.log(dateStr);

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
                        country: values.citizenship.substring(
                           values.citizenship.length - 3,
                           values.citizenship.length - 1,
                        ),
                        phone: values.phoneNumber,
                     },
                     additional: {
                        is_renting_car: false,
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
                  router.push(`/stay/${hotel.hotel_id}`);
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
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {/* LAST & FIRST NAME */}
               <div className="flex space-x-5  ">
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
                                    placeholder="Ex: David Ngo"
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
                                    placeholder="Ex: James"
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
                           <FormLabel className="text-slate-800 dark:text-slate-300 text-sm">
                              Phone number <span className="text-red-500">*</span>
                           </FormLabel>

                           <FormControl>
                              <PhoneInput
                                 placeholder="Enter a phone number"
                                 international
                                 readOnly={isConfirm}
                                 defaultCountry={(form.getValues().citizenship as Country) || 'VN'}
                                 className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11"
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
                        <FormItem>
                           <FormControl>
                              <InputLabel
                                 sizes="small"
                                 required
                                 type="text"
                                 readOnly
                                 label="Citizenship"
                                 placeholder="Ex: Viet Nam"
                                 id="city"
                                 {...field}
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
                     name="arrive"
                     render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                           <FormLabel className="text-slate-800 dark:text-slate-300 text-sm">
                              Arrival time <span className="text-red-500">*</span>
                           </FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isConfirm}
                           >
                              <FormControl>
                                 <SelectTrigger className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1">
                                    <SelectValue
                                    // placeholder="Select a time"
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
                     name="message"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-slate-800 dark:text-slate-300 text-sm">
                              Message
                           </FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Message"
                                 rows={4}
                                 readOnly={isConfirm}
                                 className="min-h-[150px] block w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              <span className="text-sm text-slate-500 block">
                                 Write a few sentences about yourself.
                              </span>
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>

            <div className="pt-8 flex flex-1 justify-end">
               <ButtonLoading
                  loading={isLoadingCreate}
                  disabled={isConfirm}
                  type="submit"
                  className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-0 "
               >
                  Confirm your info
               </ButtonLoading>
            </div>
         </form>
      </Form>
   );
};

export default FormInfomation;