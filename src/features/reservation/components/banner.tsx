import { Home } from 'lucide-react';

import Image from '@/components/common/images/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const Banner = () => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-neutral-200 px-16">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-neutral-400">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center">
                  <Home className="me-2 h-3 w-3" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>•</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/booking">Booking</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>•</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Booking Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h2 className="text-4xl font-bold text-neutral-900">
          Review your Booking
        </h2>
      </div>
      <Image src="/assets/images/hotel/phone.svg" className="max-w-48" />
    </div>
  );
};

export default Banner;
