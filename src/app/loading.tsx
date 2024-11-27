import dynamic from 'next/dynamic';
import React from 'react';

const GlobalLoading = dynamic(() =>
   import('@/components/custom/loading/global').then((mod) => mod.default),
);

const ProtectedPageLoading = () => {
   return <GlobalLoading open />;
};

export default React.memo(ProtectedPageLoading);
