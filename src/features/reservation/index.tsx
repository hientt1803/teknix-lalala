import Bounded from '@/components/common/containers/bounded';

import Banner from './components/banner';
import MainContent from './components/main-content';
interface ReservationFeaturesProps {
  id: string;
}
const ReservationFeatures = ({ id }: ReservationFeaturesProps) => {
  return (
    <Bounded className="space-y-10 py-16">
      <Banner />
      <MainContent id={id} />
    </Bounded>
  );
};

export default ReservationFeatures;
