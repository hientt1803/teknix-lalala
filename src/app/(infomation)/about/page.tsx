import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { MainBreadCumbs } from '@/components/custom/bread-cumbs';

export default async function Page() {
   const client = createClient();
   const page = await client.getSingle('about');

   const breadcrumbData = [{ label: 'Home', href: '/' }, { label: 'About' }];

   return (
      <div className="mt-[4rem]">
         <MainBreadCumbs breadcrumbs={breadcrumbData} />
         <SliceZone slices={page.data.slices} components={components} />
      </div>
   );
}

export async function generateMetadata(): Promise<Metadata> {
   const client = createClient();
   const page = await client.getSingle('about');

   return {
      title: page.data.meta_title,
      description: page.data.meta_description,
   };
}
