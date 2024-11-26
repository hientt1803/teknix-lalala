import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
   const { uid } = await params;
   const client = createClient();
   const page = await client.getByUID('pages', uid).catch(() => notFound());

   return (
      <div className="flex flex-col gap-8 lg:gap-16 justify-center items-center overflow-hidden">
         <SliceZone slices={page.data.slices} components={components} />
      </div>
   );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
   const { uid } = await params;
   const client = createClient();
   const page = await client.getByUID('pages', uid).catch(() => notFound());

   return {
      title: page.data.meta_title,
      description: page.data.meta_description,
   };
}

export async function generateStaticParams() {
   const client = createClient();
   const pages = await client.getAllByType('pages');

   return pages.map((page) => {
      return { uid: page.uid };
   });
}
