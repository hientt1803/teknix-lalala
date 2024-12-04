import React from 'react';

import Image from '@/components/common/images/image';

export const PaymentBackground = () => {
  return (
    <>
      {/* Main Background */}
      <Image
        src="/assets/images/home/payment-background.png"
        alt="Payment Image"
        className="absolute bottom-0 left-0 z-[2] h-[50%] w-full transform object-cover transition-transform duration-300 group-hover:scale-110 md:left-60 md:h-fit md:w-fit"
      />

      {/* Top Right Background*/}
      <Image
        src="/assets/images/home/bg-payment-plane.svg"
        alt="Payment Image"
        className="absolute right-20 top-10 z-[2] h-fit w-fit transform object-cover transition-transform duration-300 group-hover:scale-110 md:right-44 md:top-40"
      />
    </>
  );
};
