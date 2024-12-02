import React from 'react';

const GoodToKnow = () => {
   return (
      <div>
         <h3 className="text-xl font-semibold">Good to know:</h3>
         <span className="text-sm text-neutral-400 mt-3">Good to now</span>
         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5" />
         <ul className="flex flex-col space-y-4 text-sm text-neutral-600  dark:text-neutral-50">
            <li className="flex items-center gap-2">
               <svg
                  className="text-green-700 size-5 stroke-[1.5]"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
               >
                  <path
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="m3 3l18 18M9 5h9a3 3 0 0 1 3 3v8a3 3 0 0 1-.128.87m-2.002 2.002A3 3 0 0 1 18 19H6a3 3 0 0 1-3-3V8a3 3 0 0 1 2.124-2.87M3 11h8m4 0h6M7 15h.01M11 15h2"
                  ></path>
               </svg>
               No credit card needed
            </li>
            <li className="flex items-center gap-2">
               <svg
                  className="text-green-700 size-5 stroke-[1.5]"
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 48 48"
               >
                  <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}>
                     <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path>
                     <path strokeLinecap="round" d="m16 24l6 6l12-12"></path>
                  </g>
               </svg>
               Stay flexible: You can cancel for free anytime – lock in this great price today.
            </li>
            <li className="flex items-center gap-2">
               <svg
                  className="text-green-700 size-5 stroke-[1.5]"
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 48 48"
               >
                  <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}>
                     <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path>
                     <path strokeLinecap="round" d="m16 24l6 6l12-12"></path>
                  </g>
               </svg>
               No payment is required to secure this booking. You&apos;ll pay during your stay.
            </li>
         </ul>
      </div>
   );
};

export default GoodToKnow;
