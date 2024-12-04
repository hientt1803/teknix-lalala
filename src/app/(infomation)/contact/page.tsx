import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';

import { MainBreadCumbs } from '@/components/custom/bread-cumbs';
import { createClient } from '@/prismicio';
import { components } from '@/slices';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('contact');
  const breadcrumbData = [{ label: 'Home', href: '/' }, { label: 'Contact' }];

  return (
    <div className="mt-[4rem]">
      <MainBreadCumbs breadcrumbs={breadcrumbData} />
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
