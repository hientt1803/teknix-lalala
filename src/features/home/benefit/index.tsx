import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { ArrowRight } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';

type BenefitSectionProps = {
  benefit: Content.BenefitSliceDefaultPrimary;
};
const BenefitSection = ({ benefit }: BenefitSectionProps) => {
  return (
    <Bounded className="relative py-16">
      <div className="col-span-2 grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="col-span-3 row-span-2">
          <div className="relative rounded-3xl bg-indigo-300 bg-[url('/assets/images/home/bg-support.png')] bg-cover bg-bottom bg-no-repeat p-8">
            <div className="z-10 flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">24/7 Support</h3>
                <p className="text-neutral-700">
                  We are here to help, before, during, and even after your trip.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <Image
                  className="aspect-video rounded-3xl"
                  src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage3/support.png"
                />
                <Image
                  className="aspect-square rounded-3xl"
                  src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage3/support2.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-2">
          <div className="grid h-full grid-cols-1 grid-rows-2 gap-5">
            <div className="relative row-span-1 rounded-3xl bg-green-200 bg-[url('/assets/images/home/bg-bestprice.png')] bg-cover bg-bottom bg-no-repeat p-12">
              <div className="z-10 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold">Best Price</h3>
                  <p className="text-neutral-700">
                    Price match within 48 hours of order confirmation
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-fit rounded-full bg-yellow-300 px-7 py-6"
                >
                  View More <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative row-span-1 rounded-3xl bg-blue-300 bg-[url('/assets/images/home/bg-explore.png')] bg-cover bg-bottom bg-no-repeat p-12">
              <div className="z-10 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold">Save your time!</h3>
                  <p className="text-neutral-700">
                    Explore, Book, Soar: Your Journey Awaits!
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-fit rounded-full bg-yellow-300 px-7 py-6"
                >
                  View More <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 row-span-2">
          <div className="relative h-full w-full p-5">
            <PrismicNextImage
              className="-top-10 z-0 block h-full w-full object-contain md:absolute"
              field={benefit.main_image}
              alt=""
            />
            <div className="absolute bottom-10 left-10 z-10 flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-full border-4 border-white bg-yellow-300">
              <span className="text-xs">Save 39%</span>
              <h3 className="text-3xl font-bold">$899</h3>
              <p className="text-base underline">BOOK NOW</p>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default BenefitSection;
