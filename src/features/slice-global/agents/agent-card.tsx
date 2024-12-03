import Image from '@/components/common/images/image';
import { Agent } from './list-agents';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const AgentCard = ({ imageUrl, desc, id, name, position }: Agent) => {
   return (
      <div className="group relative bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 rounded-[2rem] overflow-hidden hover:shadow transition-shadow h-full">
         <div className="h-full w-full flex flex-col sm:items-center">
            <div className="flex-shrink-0 w-full">
               <div className="relative">
                  <Image src={imageUrl} className="aspect-square rounded-2xl" alt="" />
               </div>
            </div>
            <div className="flex-grow relative rounded-[2rem] -mt-20 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 w-full p-7 flex flex-col items-start gap-1">
               <div className="w-full">
                  <div className="flex items-center">
                     <h2 className="text-2xl font-semibold capitalize">
                        <span className="line-clamp-2">{name}</span>
                     </h2>
                  </div>

                  <div className="flex items-center mt-1">
                     <h2 className="text-sm text-neutral-400 capitalize">
                        <span className="line-clamp-2">{position}</span>
                     </h2>
                  </div>

                  <div className="flex items-center mt-3">
                     <h2 className="text-xs text-neutral-800 dark:text-neutral-200 capitalize">
                        <span className="line-clamp-5">{desc}</span>
                     </h2>
                  </div>
               </div>

               <div className="mt-5 w-full">
                  <div className="w-full flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <Button size={'icon'} variant={'secondary'} className="p-0 rounded-full">
                           <Instagram className="size-4 stroke-black dark:stroke-neutral-300" />
                        </Button>
                        <Button size={'icon'} variant={'secondary'} className="p-0 rounded-full">
                           <Facebook className="size-4 stroke-black dark:stroke-neutral-300" />
                        </Button>
                        <Button size={'icon'} variant={'secondary'} className="p-0 rounded-full">
                           <Twitter className="size-4 stroke-black dark:stroke-neutral-300" />
                        </Button>
                        <Button size={'icon'} variant={'secondary'} className="p-0 rounded-full">
                           <Youtube className="size-4 stroke-black dark:stroke-neutral-300" />
                        </Button>
                     </div>
                     <Button size={'icon'} variant={'secondary'} className="p-0 rounded-full hover:bg-neutral-900 hover:text-neutral-100">
                        <ArrowUpRight className="size-4 stroke-black dark:stroke-neutral-300" />
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AgentCard;
