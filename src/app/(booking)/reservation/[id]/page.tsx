import ReservationFeatures from '@/features/reservation';

const ReservationDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="relative py-16">
      <ReservationFeatures id={id} />
    </div>
  );
};

export default ReservationDetailPage;
