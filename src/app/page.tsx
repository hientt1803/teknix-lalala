import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

export default async function Page() {
   const client = createClient();
   const page = await client.getSingle('homepage');

   return (
      <div className="flex flex-col gap-8 lg:gap-16 justify-center items-center overflow-hidden">
         <SliceZone slices={page.data.slices} components={components} />
      </div>
   );
}

export async function generateMetadata(): Promise<Metadata> {
   const client = createClient();
   const page = await client.getSingle('homepage');

   return {
      title: page.data.meta_title,
      description: page.data.meta_description,
   };
}
