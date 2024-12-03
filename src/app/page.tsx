import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { meta } from './layout';

export default async function Page() {
   const client = createClient();
   const page = await client.getSingle('homepage');

   return (
      <div className="flex flex-col gap-4 lg:gap-8 justify-center items-center overflow-hidden">
         <SliceZone slices={page.data.slices} components={components} />
      </div>
   );
}

export async function generateMetadata(): Promise<Metadata> {
   // const client = createClient();
   // const page = await client.getSingle('homepage');

   // return {
   //    title: page.data.meta_title,
   //    description: page.data.meta_description,
   // };

   return {
      title: {
         template: '%s',
         default: meta.title,
      },
      description: meta.description,
      openGraph: {
         title: meta.title,
         description: meta.description,
         url: '/',
         locale: 'en-US',
         siteName: meta.title,
         type: 'website',
         images: [
            {
               url: meta.image,
            },
         ],
      },
      alternates: {
         canonical: `/`,
      },
      manifest: `/manifest.json`,
   };
}
