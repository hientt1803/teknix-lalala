import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';

const worksDatas = [
  {
    id: 1,
    title: 'Browse and Select',
    description:
      'Easily find your perfect car. Filter by model, brand, and size for a seamless selection process.',
  },
  {
    id: 2,
    title: 'Booking and Reservation',
    description:
      'Quickly reserve with flexible dates and locations. Real-time availability updates ensure a smooth booking experience.',
  },
  {
    id: 3,
    title: 'Payment and Confirmation',
    description:
      'Secure payment options and instant confirmation ensure a hassle-free transaction.',
  },
  {
    id: 4,
    title: 'Pickup and Refund',
    description:
      'Rate and review your experience. Enjoy a smooth refund if you need it.',
  },
];

const HowItWorkSection = () => {
  return (
    <div className="py-5 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-10">
        <Image
          src="https://images.pexels.com/photos/29352713/pexels-photo-29352713/free-photo-of-scenic-open-road-under-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
          alt=""
          className="rounded-2xl"
        />
        <div className="flex flex-col gap-16">
          <div className="">
            <Heading>How It Work ?</Heading>
            <Paragraph size="md">Just 4 easy and quick steps</Paragraph>
          </div>
          <div className="flex flex-col gap-8">
            {worksDatas.map((word, index) => (
              <div key={index} className="group grid grid-cols-9 gap-2 py-3">
                <div className="col-span-1">
                  <div
                    color="gray"
                    className="flex !h-12 !w-12 flex-shrink items-center justify-center rounded-full bg-neutral-200 text-2xl transition-colors duration-200 group-hover:bg-neutral-900 group-hover:text-white"
                  >
                    {word.id}
                  </div>
                </div>
                <div className="col-span-8">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-semibold">{word.title}</h4>
                    <p className="text-sm text-neutral-700">
                      {word.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkSection;
