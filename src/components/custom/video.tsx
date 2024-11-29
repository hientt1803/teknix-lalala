'use client';
import { useState } from 'react';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { MediaModal } from './modal-media';

interface VideoSectionProps {
   videos: Content.VideoSectionSlice;
}
const VideoSection = ({ videos }: VideoSectionProps) => {
   const [video, setVideo] = useState(JSON.parse(JSON.stringify(videos.primary.videos[0])));
   // console.log("🚀 ~ VideoSection ~ video:", video)
   const [open, setOpen] = useState(false);

   const handleVideoClick = (video: Content.VideoSectionSliceDefaultPrimaryVideosItem) => {
      setVideo(video);
      setOpen(true);
   };
   return (
      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
         {/* VIDEO MODAL */}
         {/* {open && ( */}
         {/* <MediaModal isModalOpen={open} setModalOpen={setOpen} videoSrc={video?.link?.url} /> */}
         {/* )} */}
         {/* BACKGROUND */}
         <div className="absolute -top-4 -bottom-4 -right-4 w-3/4 rounded-2xl bg-teal-600/10 bg-opacity-40 z-0  md:top-0 md:bottom-0 md:right-0 xl:w-2/3 dark:bg-slate-800 dark:bg-opacity-40" />

         {/* MAIN VIDEO */}
         <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
            <div
               className="group aspect-[5/5] bg-slate-800 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-900  sm:border-[10px]"
               title={videos.primary.videos[0]?.title || ''}
            >
               <div className="w-full h-full relative">
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
                     <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
                        <div className="rounded-full w-20 h-20 p-3 lg:w-52 lg:h-52 lg:p-12">
                           <div className="w-full h-full bg-white rounded-full text-slate-900 relative">
                              <span className="absolute inset-0 flex items-center justify-center">
                                 <svg
                                    className="w-8 h-8 md:w-12 md:h-12"
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
                           className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300 bg-blend-darken"
                           alt=""
                        />
                     </div>
                     <div className="absolute bottom-20 z-10 px-10 flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-white text-3xl font-semibold">
                           The Venetian and The Palazzo - Las Vegas, USA
                        </h2>
                        <p className="text-white text-xs">8 Resort, 24 Room</p>
                     </div>
                  </button>
               </div>
            </div>
         </div>

         {/* LIST OF VIDEOS */}
         <div className="flex-shrink-0 grid gap-2 sm:gap-6 lg:grid-cols-1 lg:w-[45%]">
            {videos.primary.videos.slice(2, videos.primary.videos.length).map((video, index) => (
               <div className="flex items-center gap-5" key={index}>
                  <div
                     className="w-[38%] group relative aspect-square rounded-2xl cursor-pointer overflow-hidden"
                     title={video.title || ''}
                     onClick={() => {
                        if (video) {
                           handleVideoClick(video);
                        }
                     }}
                  >
                     <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="bg-white relative rounded-full shadow-inner w-10 h-10">
                           <span className="absolute inset-0 flex items-center justify-center text-slate-900">
                              <svg
                                 className="w-5 h-5"
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
                     <div className="absolute inset-0 w-full h-full">
                        <PrismicNextImage
                           field={video.thumbnail}
                           className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300"
                           alt=""
                        />
                     </div>
                  </div>

                  <div className="w-[62%]">
                     <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-xl transition-colors duration-200 group:hover:text-blue-700 cursor-pointer">
                           The Burj Al Arab Dubai, UAE
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">8 Resorts, 24 Rooms</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default VideoSection;
