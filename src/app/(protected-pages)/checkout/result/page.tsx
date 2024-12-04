import dynamic from 'next/dynamic';

const CheckoutResultFeature = dynamic(() => import('@/features/result'), {
  ssr: false,
});

const CheckoutResultPage = () => {
  return (
    <div className="py-16">
      <CheckoutResultFeature />
    </div>
  );
};

export default CheckoutResultPage;
