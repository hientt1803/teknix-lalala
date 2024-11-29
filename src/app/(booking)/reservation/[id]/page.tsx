import ReservationFeatures from '@/features/reservation';

const ReservationDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   return (
      <div className="py-16 relative">
         <ReservationFeatures id={(await params).id} />
      </div>
   );
};

export default ReservationDetailPage;
