import {
   Accordion,
   AccordionHeader,
   AccordionItem,
   AccordionPanel,
} from '@/components/custom/accordions/accordion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const PaymentSection = () => {
   return (
      <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-neutral-50 rounded-2xl">
         <h1 className="text-3xl font-bold p-5">💳 Payment Options</h1>
         <div className="border-b border-b-neutral-200 w-full" />
         <div className="p-5">
            <div className="bg-indigo-100/80 px-5 py-4 rounded-lg flex items-center justify-between">
               <div className="flex items-center justify-center gap-2">
                  <svg
                     className="w-16 h-16 text-indigo-600"
                     xmlns="http://www.w3.org/2000/svg"
                     width="1.2rem"
                     height="1.2rem"
                     viewBox="0 0 24 24"
                  >
                     <path
                        fill="currentColor"
                        d="m10.348 3.169l-7.15 3.113a2 2 0 0 0-1.03 2.608l4.92 11.895a1.96 1.96 0 0 0 2.59 1.063l7.142-3.11a2 2 0 0 0 1.036-2.611l-4.92-11.894a1.96 1.96 0 0 0-2.588-1.064M16 3a2 2 0 0 1 1.995 1.85L18 5v3.5a1 1 0 0 1-1.993.117L16 8.5V5h-1a1 1 0 0 1-.117-1.993L15 3zm3.08 2.61a1 1 0 0 1 1.31-.53c.257.108.505.21.769.314a2 2 0 0 1 1.114 2.479l-.056.146l-2.298 5.374a1 1 0 0 1-1.878-.676l.04-.11l2.296-5.371l-.366-.148l-.402-.167a1 1 0 0 1-.53-1.312z"
                     ></path>
                  </svg>

                  <div className="flex flex-col gap-1">
                     <h4 className="font-bold text-xl">Get Additional Discount</h4>
                     <p className="text-sm text-neutral-600">
                        Subcible to access saved payments and discounts!
                     </p>
                  </div>
               </div>
               <Button>Subcrible Now</Button>
            </div>
         </div>
         <div className="p-5">
            <Accordion>
               <AccordionItem value="credit">
                  <AccordionHeader icon={<Plus />}>
                     <div className="flex p-2 items-center gap-2">
                        <svg
                           className="w-8 h-8 text-indigo-700"
                           xmlns="http://www.w3.org/2000/svg"
                           width="1.2rem"
                           height="1.2rem"
                           viewBox="0 0 24 24"
                        >
                           <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.3}
                              d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 2h18M7 15h.01M11 15h2"
                           ></path>
                        </svg>
                        <span className="text-lg font-normal">Credit or Debit Card</span>
                     </div>
                  </AccordionHeader>
                  <AccordionPanel>Payment Form</AccordionPanel>
               </AccordionItem>
               <AccordionItem value="net">
                  <AccordionHeader icon={<Plus />}>
                     <div className="flex p-2 items-center gap-2">
                        <svg
                           className="w-8 h-8 text-indigo-700"
                           xmlns="http://www.w3.org/2000/svg"
                           width="1.2rem"
                           height="1.2rem"
                           viewBox="0 0 24 24"
                        >
                           <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.3}
                           >
                              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8"></path>
                              <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"></path>
                           </g>
                        </svg>
                        <span className="text-lg font-normal">Pay with Net Banking</span>
                     </div>
                  </AccordionHeader>
                  <AccordionPanel>Payment Form</AccordionPanel>
               </AccordionItem>
               <AccordionItem value="paypal">
                  <AccordionHeader icon={<Plus />}>
                     <div className="flex p-2 items-center gap-2">
                        <svg
                           className="w-8 h-8 text-indigo-700"
                           xmlns="http://www.w3.org/2000/svg"
                           width="1.2rem"
                           height="1.2rem"
                           viewBox="0 0 24 24"
                        >
                           <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.3}
                              d="M10 13h2.5c2.5 0 5-2.5 5-5c0-3-1.9-5-5-5H7c-.5 0-1 .5-1 1L4 18c0 .5.5 1 1 1h2.8L9 14c.1-.6.4-1 1-1m7.5-5.8C19.2 8.2 20 10 20 12c0 2.5-2.5 4.5-5 4.5h-2.6l-.6 3.6a1 1 0 0 1-1 .8H8.1a.5.5 0 0 1-.5-.6l.2-1.4"
                           ></path>
                        </svg>
                        <span className="text-lg font-normal">Pay with Net Banking</span>
                     </div>
                  </AccordionHeader>
                  <AccordionPanel>Payment Form</AccordionPanel>
               </AccordionItem>
            </Accordion>
            <div className="text-sm text-neutral-600 mt-5 ml-2">
               By processing, You accept Booking{' '}
               <span className="text-indigo-700">Terms of Services</span> and{' '}
               <span className="text-indigo-700">Policy</span>
            </div>
         </div>
      </div>
   );
};

export default PaymentSection;
