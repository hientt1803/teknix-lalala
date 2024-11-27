import HotelDetailFeature from '@/features/hotel/detail-page';
import React from 'react';

const HotelDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   return <HotelDetailFeature id={(await params).id} />;
};

export default HotelDetailPage;
