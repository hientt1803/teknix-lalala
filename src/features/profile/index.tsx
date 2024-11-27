import Bounded from "@/components/common/containers/bounded";
import {Skeleton} from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const CardInfoUser = dynamic(() => import("./components/card-info"), {
    ssr: false,
    loading: () => <CardInfoUserSkeleton />,
});
const CardListing = dynamic(() => import("./components/card-listing"), {
    ssr: false,
    loading: () => <CardListingUserSkeleton />,
});

const ProfileFeatures = () => {
    return (
        <Bounded>
            <main className="mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
                {/* INFOMATION */}
                <CardInfoUser />
                {/* FEATURES & HISTORY*/}
                <CardListing />
            </main>
        </Bounded>
    );
};

export default ProfileFeatures;

const CardInfoUserSkeleton = () => (
    <Skeleton className="h-[600px] block flex-grow rounded-3xl" />
);
const CardListingUserSkeleton = () => (
    <Skeleton className="h-[900px] rounded-3xl w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:ml-10 flex-shrink-0" />
);
