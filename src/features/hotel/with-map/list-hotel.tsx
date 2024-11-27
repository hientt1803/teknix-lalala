'use client';
import { mockTours } from '@/slices/TourSection/mock';
import HotelCard from '../cards/hotel-card';
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Map from '@/components/common/map';
import { Places } from '@/lib/Places';
import { AppConfig } from '@/lib/AppConfig';
import { FilterCollapse } from '../filters/filter-collapse';

export const ListHotel = () => {
   return (
      <div className="container mx-auto pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none mt-28">
         <div>
            <div className="relative flex min-h-screen">
               <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
                  <div className="flex items-center justify-between w-full mb-12 lg:mb-16 ">
                     <div className="">
                        <h2 className="text-4xl font-semibold leading-snug line-clamp-1">
                           Stays in New York
                        </h2>
                        <span className="block text-slate-500 dark:text-slate-400 mt-3">
                           120 stays
                           <span className="mx-2">·</span>
                           Oct 18 - Oct 30
                           <span className="mx-2">·</span>2 Guests
                        </span>
                     </div>
                     <FilterCollapse />
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                     {mockTours?.map((property, index) => (
                        <HotelCard {...property} displayType={'list'} key={index} />
                     ))}
                  </div>

                  <Pagination className="py-16">
                     <PaginationContent>
                        <PaginationItem>
                           <PaginationPrevious
                           //    onClick={(e) => {
                           //       e.preventDefault();
                           //       const prevPage = page > 1 ? page - 1 : 1;
                           //       router.replace(`?page=${prevPage}`);
                           //    }}
                           //    href={`?page=${page > 1 ? page - 1 : 1}`}
                           />
                        </PaginationItem>
                        {/* {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                        const currentPage = startPage + index;
                        return (
                           <PaginationItem key={currentPage}>
                              <Link
                                 shallow
                                 className={buttonVariants({
                                    variant: page === currentPage ? 'default' : 'outline',
                                    size: 'icon',
                                    className: 'rounded-full p-6',
                                 })}
                                 href={`?page=${currentPage}`}
                              >
                                 {currentPage}
                              </Link>
                           </PaginationItem>
                        );
                     })} */}
                        <PaginationItem>
                           <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                           <PaginationNext
                           //    onClick={(e) => {
                           //       e.preventDefault();
                           //       const nextPage = page < totalPages ? page + 1 : page;
                           //       router.replace(`?page=${nextPage}`);
                           //    }}
                           //    href={`?page=${page < totalPages ? page + 1 : page}`}
                           />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               </div>
               <Dialog>
                  <DialogTrigger className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-slate-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer">
                     <i className="text-lg las la-map"></i>
                     <span>Show map</span>
                  </DialogTrigger>
                  <DialogContent className="min-w-full h-screen">
                     <DialogClose className="z-[999] absolute left-5 top-5">
                        <Button size="icon" className="rounded-2xl" variant={'ghost'}>
                           <XIcon />
                        </Button>
                     </DialogClose>
                     {false ? (
                        <Skeleton className="w-full h-full" />
                     ) : (
                        <>
                           {/* {!placeData || placeData.length <= 0 ? (
                                        <Skeleton className="w-full h-full" />
                                    ) : ( */}
                           {/* <Map
                                        data={placeData}
                                        center={[
                                            searchGlobal.location.lat,
                                            searchGlobal.location.lon,
                                        ]}
                                    /> */}
                           {/* )} */}
                        </>
                     )}
                  </DialogContent>
               </Dialog>
               <div className="xl:flex-grow xl:static xl:block hidden">
                  <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
                     {false ? (
                        <Skeleton className="w-full h-full" />
                     ) : (
                        <Map data={Places} center={AppConfig.baseCenter} />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
