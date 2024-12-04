'use client';

import { KeyTextField, LinkField, RichTextField } from '@prismicio/client';
import { useAppSelector } from '@/stores/hook';
import dynamic from 'next/dynamic';

const UserButton = dynamic(() => import('./user-button'));
const NovuNotificationV2 = dynamic(() => import('./novu-v2'));
const ModeToggleMenu = dynamic(() =>
  import('../themes/mode-menu').then(mob => mob.ModeToggleMenu),
);
const CurrencyButton = dynamic(() =>
  import('./currency').then(mob => mob.default),
);
const LanguageButton = dynamic(() =>
  import('./languages').then(mob => mob.default),
);
const LoginButton = dynamic(() =>
  import('./login-button').then(mob => mob.default),
);

type Props = {
  navigation: {
    title: KeyTextField;
    href: LinkField;
    description: RichTextField;
  }[];
};
type RightSideHeaderProps = {
  className?: string;
};
const RightSiderHeader = () => {
  const user = useAppSelector(state => state.userSlice);

  const renderAuthButtons = () => (
    <>
      {/* <Button
            className="rounded-full hidden lg:flex"
            variant="secondary"
            onClick={() => router.push('/auth?screen=signUp&redirect=/')}
         >
            Sign up
         </Button>
         <Button
            className="rounded-full"
            onClick={() => router.push('/auth?screen=signIn&redirect=/')}
         >
            Sign in
         </Button> */}
      <LoginButton />
    </>
  );

  const renderUserActions = () => (
    <div className="flex items-center space-x-1">
      <CurrencyButton />
      <LanguageButton />
      {/* <Button
            asChild
            className="rounded-full px-5 py-5 ring-1 ring-neutral-700 dark:ring-neutral-200 dark:text-neutral-200 text-base hover:ring-0"
            variant="ghost"
         >
            <Link href="#">List your property</Link>
         </Button> */}
      {/* <Notification /> */}
      {user?.currentUser?.id && (
        <NovuNotificationV2 userId={user?.currentUser?.id || ''} />
      )}

      {/* <ModeToggle /> */}
      <ModeToggleMenu />
      <UserButton />
    </div>
  );

  return (
    <>
      {/* DESKTOP HEADER */}
      <div className="hidden items-center space-x-2 lg:flex">
        {/* <NavigationMenuComp navigations={navigation} /> */}
        {user.access_token ? (
          renderUserActions()
        ) : (
          <div className="flex items-center space-x-2">
            <CurrencyButton />
            <LanguageButton />
            {/* <ModeToggle /> */}
            <ModeToggleMenu />
            {renderAuthButtons()}
          </div>
        )}
      </div>

      {/* MOBILE HEADER */}
      <div className="flex items-center space-x-2 lg:hidden">
        {user.access_token ? (
          <>
            {/* <ModeToggle /> */}
            <ModeToggleMenu />
            {/* <Notification /> */}
            {user?.currentUser?.id && (
              <NovuNotificationV2 userId={user?.currentUser?.id || ''} />
            )}
            <UserButton />
          </>
        ) : (
          renderAuthButtons()
        )}
      </div>
    </>
  );
};

export default RightSiderHeader;
