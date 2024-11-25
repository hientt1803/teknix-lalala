import Image from '@/components/common/images/image';
import React from 'react';

export const PaymentBackground = () => {
   return (
      <>
         {/* Main Background */}
         <Image
            src="/assets/images/home/payment-background.png"
            alt="Payment Image"
            className="absolute bottom-0 left-0 md:left-60 w-full md:w-fit h-[50%] md:h-fit object-cover z-[2] transform transition-transform group-hover:scale-110 duration-300"
         />

         {/* Top Right Background*/}
         <Image
            src="/assets/images/home/bg-payment-plane.svg"
            alt="Payment Image"
            className="absolute top-10 md:top-40 right-20 md:right-44 w-fit h-fit object-cover z-[2] transform transition-transform group-hover:scale-110 duration-300"
         />
      </>
   );
};
