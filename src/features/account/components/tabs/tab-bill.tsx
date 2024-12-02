import Badge from '@/components/custom/badges/badge';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { datas, renderIcon } from '@/features/checkout/components/credit-card-user';
import { PayWithCreditCard } from '@/features/checkout/components/payment-card';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const TabChangeBill = () => {
   return (
      <div className="pt-14 sm:pt-20 pb-24 lg:pb-32">
         <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl font-semibold">Payments & payouts</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div className="max-w-2xl">
               <span className="text-xl font-semibold block">Payout methods</span>
               <br />
               <span className="text-neutral-700 dark:text-neutral-400 block">
                  When you receive a payment for a reservation, we call that payment to you a
                  &apos;payout.&apos; Our secure payment system supports several payout methods,
                  which can be set up below. Go to FAQ.
                  <br />
                  <br />
                  To get paid, you need to set up a payout method Airbnb releases payouts about 24
                  hours after a guest&apos;s scheduled check-in time. The time it takes for the
                  funds to appear in your account depends on your payout method. Learn more
               </span>
               <div className="pt-10">
                  <span className="text-xl font-semibold block">Credit card saved</span>
                  <br />
                  <div className="grid grid-cols-1 gap-3">
                     {datas.map((data, index) => (
                        <div
                           key={index}
                           className={cn(
                              'border cursor-pointer border-neutral-200 dark:border-neutral-700 rounded-lg p-3 flex items-center justify-between gap-3 peer-data-[state=checked]:border-blue-400 peer-data-[state=checked]:border-2 [&:has([data-state=checked])]:border-blue-400',
                           )}
                        >
                           <div className="flex items-center gap-2">
                              <div className="w-14 h-11 md:w-16 p-2 rounded-lg">
                                 {renderIcon(
                                    data.type as 'stripe' | 'master' | 'visa',
                                    'w-full h-full',
                                 )}
                              </div>
                              <div className="flex flex-col">
                                 <h3 className="text-sm font-medium">
                                    <span className="capitalize">{data.type}</span> ending in 2026
                                 </h3>
                                 <p className="text-xs font-normal text-muted-foreground">
                                    Exp. date {data.exp}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center gap-1">
                              <Badge
                                 className={cn('rounded-lg py-[5px] px-3 cursor-pointer', {
                                    'bg-red-100 text-red-700': data.status === 'expired',
                                    'bg-neutral-900 text-white': data.status === 'default',
                                    'bg-transparent text-blue-700 hover:bg-neutral-100':
                                       data.status === 'normal',
                                 })}
                              >
                                 {data.status === 'default' && 'Default'}
                                 {data.status === 'normal' && 'Set as Default'}
                                 {data.status === 'expired' && 'Expired'}
                              </Badge>
                              <Dialog>
                                 <DialogTrigger asChild>
                                    <Button
                                       size={'icon'}
                                       className="size-7 text-muted-foreground hover:text-rose-700 "
                                       variant="ghost"
                                    >
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="size-5"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             fill="currentColor"
                                             d="m15.241 3.721l.293 2.029H19.5a.75.75 0 0 1 0 1.5h-.769l-.873 10.185c-.053.62-.096 1.13-.165 1.542c-.07.429-.177.813-.386 1.169a3.25 3.25 0 0 1-1.401 1.287c-.372.177-.764.25-1.198.284c-.417.033-.928.033-1.55.033h-2.316c-.622 0-1.133 0-1.55-.033c-.434-.034-.826-.107-1.198-.284a3.25 3.25 0 0 1-1.401-1.287c-.21-.356-.315-.74-.386-1.169c-.069-.413-.112-.922-.165-1.542L5.269 7.25H4.5a.75.75 0 0 1 0-1.5h3.966l.293-2.029l.011-.061c.182-.79.86-1.41 1.71-1.41h3.04c.85 0 1.528.62 1.71 1.41zM9.981 5.75h4.037l-.256-1.776c-.048-.167-.17-.224-.243-.224h-3.038c-.073 0-.195.057-.243.224zm1.269 4.75a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0zm3 0a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0z"
                                          ></path>
                                       </svg>
                                    </Button>
                                 </DialogTrigger>
                                 <DialogContent className="max-w-[30rem]">
                                    <DialogHeader>
                                       <DialogTitle></DialogTitle>
                                       <DialogDescription></DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-8">
                                       <div className="flex flex-col items-center text-center justify-center gap-2">
                                          <h3 className="text-2xl font-bold px-10">
                                             Are you sure you want to delete this card?
                                          </h3>
                                          <p className="text-muted-foreground text-sm">
                                             This credit card will be deleted.
                                          </p>
                                       </div>
                                       <div className="bg-neutral-100 p-5 rounded-lg">
                                          <div className="flex flex-col gap-2">
                                             <div className="flex items-center gap-2 text-neutral-700">
                                                <svg
                                                   xmlns="http://www.w3.org/2000/svg"
                                                   width={24}
                                                   height={24}
                                                   viewBox="0 0 24 24"
                                                >
                                                   <path
                                                      fill="currentColor"
                                                      fillRule="evenodd"
                                                      d="M2.002 10h19.996c-.012-2.175-.108-3.353-.877-4.121C20.243 5 18.828 5 16 5H8c-2.828 0-4.243 0-5.121.879c-.769.768-.865 1.946-.877 4.121M22 12H2v2c0 2.828 0 4.243.879 5.121C3.757 20 5.172 20 8 20h8c2.828 0 4.243 0 5.121-.879C22 18.243 22 16.828 22 14zM7 15a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z"
                                                      clipRule="evenodd"
                                                   ></path>
                                                </svg>
                                                Credit card
                                             </div>
                                             <p>Visa ending in 7890</p>
                                          </div>
                                       </div>
                                       <div className="flex justify-center items-end gap-4">
                                          <DialogClose asChild>
                                             <Button variant="outline" className="py-5 px-6 w-full">
                                                Cancel
                                             </Button>
                                          </DialogClose>
                                          <Button
                                             variant="destructive"
                                             className="py-5 px-6 w-full"
                                          >
                                             Delete
                                          </Button>
                                       </div>
                                    </div>
                                 </DialogContent>
                              </Dialog>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-3 flex justify-end items-end">
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline" className="py-5">
                              <Plus className="size-5" />
                              Add New Card
                           </Button>
                        </DialogTrigger>
                        <DialogContent className="lg:min-w-[50rem]">
                           <DialogHeader>
                              <DialogTitle>Add new your card</DialogTitle>
                              <DialogDescription></DialogDescription>
                           </DialogHeader>
                           <div className="space-y-8">
                              <PayWithCreditCard />
                              <div className="flex justify-end items-end gap-4">
                                 <DialogClose asChild>
                                    <Button variant="outline" className="py-5 px-6">
                                       Close
                                    </Button>
                                 </DialogClose>
                                 <Button className="py-5 px-6">Save</Button>
                              </div>
                           </div>
                        </DialogContent>
                     </Dialog>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TabChangeBill;
