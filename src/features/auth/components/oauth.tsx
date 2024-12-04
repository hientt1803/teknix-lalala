import React from 'react';

import { Button } from '@/components/ui/button';

const Oauth = () => {
  return (
    <div className="grid gap-3">
      <Button
        variant={'ghost'}
        className="flex w-full transform rounded-lg bg-neutral-50 px-4 py-5 transition-transform will-change-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
      >
        <img src="/icons/facebook-icon.svg" className="flex-shrink-0" />
        <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          Continune with Facebook
        </h3>
      </Button>
      <Button
        variant={'ghost'}
        className="flex w-full transform rounded-lg bg-neutral-50 px-4 py-5 transition-transform will-change-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
      >
        <img src="/icons/twitter-icon.svg" className="flex-shrink-0" />
        <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          Continune with Twitter
        </h3>
      </Button>
      <Button
        variant={'ghost'}
        className="flex w-full transform rounded-lg bg-neutral-50 px-4 py-5 transition-transform will-change-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
      >
        <img src="/icons/google-icon.svg" className="flex-shrink-0" />
        <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          Continune with Google
        </h3>
      </Button>
    </div>
  );
};

export default Oauth;
