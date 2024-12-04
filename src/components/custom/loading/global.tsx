'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ILoading {
  open?: boolean;
}

const LoadingGlobal = (props: ILoading) => {
  const { open = false } = props;

  return (
    <React.Fragment>
      {open && (
        <div className="z fixed bottom-0 left-0 right-0 top-0 z-50 flex min-h-screen min-w-[100vw] items-center justify-center bg-[#f1f1f1] opacity-95">
          <div className="float-area flex flex-col items-center justify-center gap-2">
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
                  className="bg-red-[#212121] h-3 w-3 rounded-full"
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
                  className="bg-red-[#212121] h-3 w-3 rounded-full"
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
                  className="bg-red-[#212121] h-3 w-3 rounded-full"
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
