import dynamic from 'next/dynamic';
import React from 'react';

export const Header = dynamic(() =>
  import('@/components/common/header/index').then(module_ => module_.default),
);
export const Footer = dynamic(() =>
  import('@/components/common/footer').then(module_ => module_.default),
);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
