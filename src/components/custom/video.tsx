'use client';

import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { useState } from 'react';

interface VideoSectionProps {
  videos: Content.VideoSectionSlice;
}
const VideoSection = ({ videos }: VideoSectionProps) => {
  const [video, setVideo] = useState(
    JSON.parse(JSON.stringify(videos.primary.videos[0])),
  );
  // console.log("🚀 ~ VideoSection ~ video:", video)
  const [open, setOpen] = useState(false);

  const handleVideoClick = (
    video: Content.VideoSectionSliceDefaultPrimaryVideosItem,
  ) => {
    setVideo(video);
    setOpen(true);
  };
  return (
    <div className="relative flex flex-col sm:py-4 sm:pr-4 md:py-6 md:pr-6 lg:flex-row xl:py-14 xl:pr-14">
      {/* VIDEO MODAL */}
      {/* {open && ( */}
      {/* <MediaModal isModalOpen={open} setModalOpen={setOpen} videoSrc={video?.link?.url} /> */}
      {/* )} */}
      {/* BACKGROUND */}
      <div className="absolute -bottom-4 -right-4 -top-4 z-0 w-3/4 rounded-2xl bg-teal-600/10 bg-opacity-40 dark:bg-neutral-800 dark:bg-opacity-40 md:bottom-0 md:right-0 md:top-0 xl:w-2/3" />

      {/* MAIN VIDEO */}
      <div className="relative flex-grow pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
        <div
          className="group aspect-[5/5] overflow-hidden rounded-3xl border-4 border-white bg-neutral-800 dark:border-neutral-900 sm:border-[10px]"
          title={videos.primary.videos[0]?.title || ''}
        >
          <div className="relative h-full w-full">
            <button
              type="button"
              onClick={() => {
                if (videos.primary.videos[0]) {
                  handleVideoClick(videos.primary.videos[0]);
                }
              }}
              className="group relative aspect-square w-full"
              aria-label={`Play video ${videos.primary.videos[0]?.title}`}
            >
              <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center">
                <div className="h-20 w-20 rounded-full p-3 lg:h-52 lg:w-52 lg:p-12">
                  <div className="relative h-full w-full rounded-full bg-white text-neutral-900">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 md:h-12 md:w-12"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 to-transparent"></div>

              <div className="absolute inset-0">
                <PrismicNextImage
                  field={videos.primary.videos[0]?.thumbnail}
                  className="h-full w-full transform object-cover bg-blend-darken transition-transform duration-300 group-hover:scale-105"
                  alt=""
                />
              </div>
              <div className="absolute bottom-20 z-10 flex flex-col items-center justify-center gap-4 px-10">
                <h2 className="text-3xl font-semibold text-white">
                  The Venetian and The Palazzo - Las Vegas, USA
                </h2>
                <p className="text-xs text-white">8 Resort, 24 Room</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* LIST OF VIDEOS */}
      <div className="grid flex-shrink-0 gap-2 sm:gap-6 lg:w-[45%] lg:grid-cols-1">
        {videos.primary.videos.slice(2).map((video, index) => (
          <div className="flex items-center gap-5" key={index}>
            <div
              className="group relative aspect-square w-[38%] cursor-pointer overflow-hidden rounded-2xl"
              title={video.title || ''}
              onClick={() => {
                if (video) {
                  handleVideoClick(video);
                }
              }}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="relative h-10 w-10 rounded-full bg-white shadow-inner">
                  <span className="absolute inset-0 flex items-center justify-center text-neutral-900">
                    <svg
                      className="h-5 w-5"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 h-full w-full">
                <PrismicNextImage
                  field={video.thumbnail}
                  className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>
            </div>

            <div className="w-[62%]">
              <div className="flex flex-col gap-1">
                <h3 className="group:hover:text-blue-700 cursor-pointer text-xl font-semibold transition-colors duration-200">
                  The Burj Al Arab Dubai, UAE
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  8 Resorts, 24 Rooms
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
