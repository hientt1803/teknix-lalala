'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface ILoading {
   open?: boolean;
}

const LoadingGlobal = (props: ILoading) => {
   const { open = false } = props;

   return (
      <React.Fragment>
         {open && (
            <div className="fixed top-0 left-0 right-0 bottom-0 min-w-[100vw] z min-h-screen flex justify-center items-center bg-[#f1f1f1] opacity-95 z-50">
               <div className="flex flex-col gap-2 justify-center items-center float-area">
                  <Image
                     src="/lalala.svg"
                     width={80}
                     height={80}
                     alt="Lalala Logo"
                     className="floating-img mb-2"
                     loading="lazy"
                  />

                  <div className="flex items-center justify-center">
                     <div className="flex space-x-2">
                        <motion.div
                           className="h-3 w-3 rounded-full bg-red-[#212121]"
                           animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                           }}
                           transition={{
                              duration: 1,
                              ease: 'easeInOut',
                              repeat: Infinity,
                           }}
                        />
                        <motion.div
                           className="h-3 w-3 rounded-full bg-red-[#212121]"
                           animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                           }}
                           transition={{
                              duration: 1,
                              ease: 'easeInOut',
                              repeat: Infinity,
                              delay: 0.3,
                           }}
                        />
                        <motion.div
                           className="h-3 w-3 rounded-full bg-red-[#212121]"
                           animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                           }}
                           transition={{
                              duration: 1,
                              ease: 'easeInOut',
                              repeat: Infinity,
                              delay: 0.6,
                           }}
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}
      </React.Fragment>
   );
};

export default React.memo(LoadingGlobal);
