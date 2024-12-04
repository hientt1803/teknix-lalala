import dynamic from 'next/dynamic';
import React from 'react';

const GlobalLoading = dynamic(
  () =>
    import('@/components/custom/loading/global').then(
      module_ => module_.default,
    ),
  {
    ssr: false,
  },
);

const ProtectedPageLoading = () => {
  return <GlobalLoading open />;
};

export default React.memo(ProtectedPageLoading);
