import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';

import { Agent } from './list-agents';

const AgentCard = ({ imageUrl, desc, id, name, position }: Agent) => {
  return (
    <div className="group relative h-full overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-shadow hover:shadow dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex h-full w-full flex-col sm:items-center">
        <div className="w-full flex-shrink-0">
          <div className="relative">
            <Image
              src={imageUrl}
              className="aspect-square rounded-2xl"
              alt=""
            />
          </div>
        </div>
        <div className="relative -mt-20 flex w-full flex-grow flex-col items-start gap-1 rounded-[2rem] border border-neutral-200 bg-white p-7 dark:border-neutral-600 dark:bg-neutral-900">
          <div className="w-full">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold capitalize">
                <span className="line-clamp-2">{name}</span>
              </h2>
            </div>

            <div className="mt-1 flex items-center">
              <h2 className="text-sm capitalize text-neutral-400">
                <span className="line-clamp-2">{position}</span>
              </h2>
            </div>

            <div className="mt-3 flex items-center">
              <h2 className="text-xs capitalize text-neutral-800 dark:text-neutral-200">
                <span className="line-clamp-5">{desc}</span>
              </h2>
            </div>
          </div>

          <div className="mt-5 w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size={'icon'}
                  variant={'secondary'}
                  className="rounded-full p-0"
                >
                  <Instagram className="size-4 stroke-black dark:stroke-neutral-300" />
                </Button>
                <Button
                  size={'icon'}
                  variant={'secondary'}
                  className="rounded-full p-0"
                >
                  <Facebook className="size-4 stroke-black dark:stroke-neutral-300" />
                </Button>
                <Button
                  size={'icon'}
                  variant={'secondary'}
                  className="rounded-full p-0"
                >
                  <Twitter className="size-4 stroke-black dark:stroke-neutral-300" />
                </Button>
                <Button
                  size={'icon'}
                  variant={'secondary'}
                  className="rounded-full p-0"
                >
                  <Youtube className="size-4 stroke-black dark:stroke-neutral-300" />
                </Button>
              </div>
              <Button
                size={'icon'}
                variant={'secondary'}
                className="rounded-full p-0 hover:bg-neutral-900 hover:text-neutral-100"
              >
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
