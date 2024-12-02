import dynamic from 'next/dynamic';
import React from 'react';

export const Header = dynamic(() =>
   import('@/components/common/header/index').then((mod) => mod.default),
);
export const Footer = dynamic(() =>
   import('@/components/common/footer').then((mod) => mod.default),
);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <React.Fragment>
         <Header />
         {/* <CanvasCursor /> */}
         {children}
         <Footer />
      </React.Fragment>
   );
};

export default MainLayout;
