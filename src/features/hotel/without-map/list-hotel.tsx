import { mockTours } from '@/slices/TourSection/mock';
import { cn } from '@/lib/utils';
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import dynamic from 'next/dynamic';

const HotelCard = dynamic(() => import('../cards/hotel-card').then((mod) => mod.default));

export const ListHotelWithoutMap = ({ type = 'list' }: { type: 'list' | 'grid' }) => {
   return (
      <div>
         <div
            className={cn(
               'w-full grid',
               type == 'list'
                  ? 'grid-cols-1 gap-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
            )}
         >
            {mockTours?.map((property, index) => (
               <HotelCard {...property} displayType={type} key={index} />
            ))}
         </div>

         <div className="mt-10">
            <Pagination>
               <PaginationContent>
                  <PaginationItem>
                     <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationNext href="#" />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>
      </div>
   );
};
