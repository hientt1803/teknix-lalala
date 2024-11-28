import Bounded from '@/components/common/containers/bounded';
import Banner from './components/banner';
import MainContent from './components/main-content';
interface ReservationFeaturesProps {
   id: string;
}
const ReservationFeatures = ({ id }: ReservationFeaturesProps) => {


   return (
      <Bounded className="py-16 space-y-10">
         <Banner />
         <MainContent id={id} />
      </Bounded>
   );
};

export default ReservationFeatures;
