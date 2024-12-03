import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { MainBreadCumbs } from '@/components/custom/bread-cumbs';
import Image from '@/components/common/images/image';

export default async function Page() {
   const client = createClient();
   const page = await client.getSingle('contact');
   const breadcrumbData = [{ label: 'Home', href: '/' }, { label: 'Contact' }];

   return (
      <div className="mt-[4rem]">
         <MainBreadCumbs breadcrumbs={breadcrumbData} />
         <Image src="/assets/images/contact/bg-contact.png" alt="" className="w-full h-[100px]" />
         <SliceZone slices={page.data.slices} components={components} />
      </div>
   );
}

export async function generateMetadata(): Promise<Metadata> {
   const client = createClient();
   const page = await client.getSingle('contact');

   return {
      title: page.data.meta_title,
      description: page.data.meta_description,
   };
}
