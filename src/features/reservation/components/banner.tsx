import Image from '@/components/common/images/image';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

const Banner = () => {
   return (
      <div className="px-16 flex justify-between items-center bg-slate-200 rounded-3xl">
         <div className="flex flex-col gap-2">
            <div className="text-neutral-400 text-sm">
               <Breadcrumb>
                  <BreadcrumbList>
                     <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="flex items-center">
                           <Home className="w-3 h-3 me-2" />
                           Home
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator>•</BreadcrumbSeparator>
                     <BreadcrumbItem>
                        <BreadcrumbLink href="/profile">Booking</BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator>•</BreadcrumbSeparator>
                     <BreadcrumbItem>
                        <BreadcrumbPage>Booking Details</BreadcrumbPage>
                     </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
            </div>
            <h2 className="text-neutral-900 text-4xl font-bold">Review your Booking</h2>
         </div>
         <Image src="/assets/images/hotel/phone.svg" className="max-w-48" />
      </div>
   );
};

export default Banner;
