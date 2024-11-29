import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

export const InputSearchLocationSkeleton = () => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">Location</div>
         <div className="w-full flex justify-start items-center gap-1">
            <MapPin className="text-neutral-400 w-5 h-5" />
            <Input
               type="text"
               placeholder="New York, USA"
               className="placeholder:text-neutral-800 dark:placeholder:dark:text-neutral-50 placeholder:font-medium 
    w-full md:min-w-[7.5rem] shadow-none border-none outline-none focus-visible:outline-none focus-visible:ring-0 
    p-0 focus:placeholder-neutral-400 focus:border-none focus:outline-none"
            />
         </div>
      </div>
   );
};
