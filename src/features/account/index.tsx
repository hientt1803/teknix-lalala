'use client';

import { useState } from 'react';
import Bounded from '@/components/common/containers/bounded';
import TabInfo from './components/tabs/tab-info';
import TabSaved from './components/tabs/tab-saved';
import TabChangePassword from './components/tabs/tab-pass';
import TabChangeBill from './components/tabs/tab-bill';
import CustomTab from '@/components/custom/tabs/tabs';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';

const tabs = [
   {
      label: 'Account Info',
      value: 'account',
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
            />
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
         </svg>
      ),
   },
   {
      label: 'Save lists',
      value: 'saved',
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
            />
         </svg>
      ),
   },
   {
      label: 'Change password',
      value: 'pass',
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
         </svg>
      ),
   },
   {
      label: 'Change billing',
      value: 'bill',
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
            />
         </svg>
      ),
   },
];
const AccountFeatures = () => {
   const [currentTab, setCurrentTab] = useState('account');
   return (
      <Bounded className="relative py-16">
         <Breadcrumb className="mt-12 ">
            <BreadcrumbList>
               <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center">
                     <Home className="w-3 h-3 me-2" />
                     Home
                  </BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator>•</BreadcrumbSeparator>
               <BreadcrumbItem>
                  <BreadcrumbPage>Profile</BreadcrumbPage>
               </BreadcrumbItem>
            </BreadcrumbList>
         </Breadcrumb>
         <div className="my-5 mb-8">
            <div className="bg-indigo-100 rounded-2xl pt-5 flex-1">
               <div className="grid grid-cols-1 lg:grid-cols-4 place-items-center">
                  <div className="col-span-1 relative hidden lg:block">
                     <Image
                        src="/assets/images/flight/woman-guide.svg"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="col-span-2">
                     <div className="flex flex-col p-5 lg:p-0 gap-2 h-full justify-start items-start">
                        <h2 className="text-neutral-900 text-xl lg:text-3xl font-bold">
                           International Guideline
                        </h2>
                        <p className="text-neutral-600 text-base">
                           COVID safety measures adopted by various countries including VISA
                           restrictions, quarantine rules, etc.
                        </p>
                        <Button className="px-7 py-5">View Guideline</Button>
                     </div>
                  </div>
                  <div className="col-span-1 relative hidden lg:block">
                     <Image
                        src="/assets/images/flight/man-guide.svg"
                        className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            </div>
         </div>
         <CustomTab value={currentTab} onChange={setCurrentTab} tabs={tabs} />
         <div className="py-4">
            {currentTab === 'account' && <TabInfo />}
            {currentTab === 'saved' && <TabSaved />}
            {currentTab === 'pass' && <TabChangePassword />}
            {currentTab === 'bill' && <TabChangeBill />}
         </div>
      </Bounded>
   );
};

export default AccountFeatures;
