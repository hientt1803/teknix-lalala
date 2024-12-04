import Link from 'next/link';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Bounded from '../common/containers/bounded';

// Define the type for each breadcrumb item
type BreadcrumbItem = {
  label: string; // Text to display
  href?: string; // Optional link for clickable items
};

// Define the props for the component
interface MainBreadCumbsProps {
  breadcrumbs: BreadcrumbItem[]; // Array of breadcrumb items
}

export const MainBreadCumbs: React.FC<MainBreadCumbsProps> = ({
  breadcrumbs,
}) => {
  return (
    <div className="bg-[#f2f4f6] py-9 dark:bg-[#313131]">
      <Bounded>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="text-base">
                  {breadcrumb.href ? (
                    <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                  ) : (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {/* Render separator unless it's the last breadcrumb */}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </Bounded>
    </div>
  );
};
