// @ts-nocheck
'use client';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { XIcon } from 'lucide-react';
import React, { useEffect, useId, useState } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';

interface IMediaModal {
  imgSrc?: string;
  videoSrc?: string;
  className?: string;
  isModalOpen?: boolean;
  setModalOpen?: (value: boolean) => void;
}
const transition = {
  type: 'spring',
  duration: 0.4,
};
export function MediaModal({
  imgSrc,
  videoSrc,
  className,
  isModalOpen = false,
  setModalOpen,
}: IMediaModal) {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(isModalOpen);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const uniqueId = useId();

  useEffect(() => {
    if (isMediaModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMediaModalOpen(false);
        setModalOpen && setModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMediaModalOpen]);
  return (
    <>
      <MotionConfig transition={transition}>
        <>
          <motion.div
            // @ts-ignore
            className="relative flex h-full w-full flex-col overflow-hidden border bg-gray-300 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-950"
            layoutId={`dialog-${uniqueId}`}
            style={{
              borderRadius: '12px',
            }}
            onClick={() => {
              setIsMediaModalOpen(true);
              setModalOpen && setModalOpen(true);
            }}
          >
            {imgSrc && (
              <motion.div
                layoutId={`dialog-img-${uniqueId}`}
                className="h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
                  className="h-full w-full object-cover"
                />
              </motion.div>
            )}
            {videoSrc && (
              <motion.div
                layoutId={`dialog-video-${uniqueId}`}
                className="h-full w-full"
              >
                <video
                  autoPlay
                  muted
                  loop
                  className="h-full w-full rounded-sm object-cover"
                >
                  <source src={videoSrc!} type="video/mp4" />
                </video>
              </motion.div>
            )}
          </motion.div>
        </>
        <AnimatePresence initial={false} mode="sync">
          {isMediaModalOpen && (
            <>
              <motion.div
                key={`backdrop-${uniqueId}`}
                className="fixed inset-0 h-full w-full bg-white/95 backdrop-blur-sm dark:bg-black/25"
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => {
                  setIsMediaModalOpen(false);
                  setModalOpen && setModalOpen(false);
                }}
              />
              <motion.div
                key="dialog"
                className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
              >
                <motion.div
                  className="pointer-events-auto relative flex h-[90%] w-[80%] flex-col overflow-hidden border bg-gray-200 dark:bg-gray-950"
                  layoutId={`dialog-${uniqueId}`}
                  tabIndex={-1}
                  style={{
                    borderRadius: '24px',
                  }}
                >
                  {imgSrc && (
                    <motion.div
                      layoutId={`dialog-img-${uniqueId}`}
                      className="h-full w-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  )}
                  {videoSrc && (
                    <motion.div
                      layoutId={`dialog-video-${uniqueId}`}
                      className="h-full w-full"
                    >
                      <video
                        autoPlay
                        muted
                        loop
                        controls
                        className="h-full w-full rounded-sm object-cover"
                      >
                        <source src={videoSrc!} type="video/mp4" />
                      </video>
                    </motion.div>
                  )}

                  <button
                    onClick={() => {
                      setIsMediaModalOpen(false);
                      setModalOpen && setModalOpen(false);
                    }}
                    className="absolute right-6 top-6 cursor-pointer rounded-full bg-gray-400 p-3 text-zinc-50 hover:bg-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
                    type="button"
                    aria-label="Close dialog"
                  >
                    <XIcon size={24} />
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
