import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';

import Badge from '@/components/custom/badges/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

import { PayWithCreditCard } from './payment-card';

export const renderIcon = (
  logo: 'stripe' | 'visa' | 'master',
  className?: string,
) => {
  switch (logo) {
    case 'stripe': {
      return (
        <svg
          className={cn(className)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 214"
        >
          <path
            fill="#635bff"
            d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"
          ></path>
        </svg>
      );
    }
    case 'visa': {
      return (
        <svg
          className={cn(className)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 83"
        >
          <defs>
            <linearGradient
              id="logosVisa0"
              x1="45.974%"
              x2="54.877%"
              y1="-2.006%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#222357"></stop>
              <stop offset="100%" stopColor="#254aa5"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#logosVisa0)"
            d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
            transform="matrix(1 0 0 -1 0 82.668)"
          ></path>
        </svg>
      );
    }
    case 'master': {
      return (
        <svg
          className={cn(className)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 199"
        >
          <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805"></path>
          <path fill="#ff5f00" d="M93.298 16.903h69.15v124.251h-69.15z"></path>
          <path
            fill="#eb001b"
            d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125"
          ></path>
          <path
            fill="#f79e1b"
            d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
          ></path>
        </svg>
      );
    }
  }
};
export const datas = [
  {
    id: 1,
    type: 'visa',
    exp: '06/04',
    cvv: '123',
    status: 'default',
  },
  {
    id: 2,
    type: 'master',
    exp: '07/22',
    cvv: '456',
    status: 'normal',
  },
  {
    id: 3,
    type: 'visa',
    exp: '08/25',
    cvv: '789',
    status: 'normal',
  },
  {
    id: 4,
    type: 'master',
    exp: '08/25',
    cvv: '789',
    status: 'expired',
  },
];

const CreditCardUser = () => {
  const [cardValue, setCardValue] = useState('1card');
  return (
    <div className="space-y-8 py-8">
      <div className="grid grid-cols-1 gap-4">
        <h5 className="text-sm text-neutral-400">
          Choose your card to continune pay
        </h5>
        <RadioGroup value={cardValue} onValueChange={setCardValue}>
          {datas.map((data, index) => (
            <div key={index}>
              <RadioGroupItem
                value={data.id.toString() + 'card'}
                id={data.id.toString() + 'card'}
                className="peer sr-only"
              />
              <Label
                htmlFor={data.id.toString() + 'card'}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-200 p-3 peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-blue-400 dark:border-neutral-700 [&:has([data-state=checked])]:border-blue-400',
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="h-11 w-14 rounded-lg p-2 md:w-16">
                    {renderIcon(
                      data.type as 'stripe' | 'master' | 'visa',
                      'w-full h-full',
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium">
                      <span className="capitalize">{data.type}</span> ending in
                      2026
                    </h3>
                    <p className="text-xs font-normal text-muted-foreground">
                      Exp. date {data.exp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {data.status === 'default' && (
                    <Badge
                      className={cn('cursor-pointer rounded-lg px-3 py-[5px]', {
                        // 'bg-red-100 text-red-700': data.status === 'expired',
                        'bg-neutral-900 text-white': data.status === 'default',
                        // 'bg-transparent text-blue-700 hover:bg-neutral-100':
                        //    data.status === 'normal',
                      })}
                    >
                      {data.status === 'default' && 'Default'}
                      {/* {data.status === 'normal' && 'Set as Default'}
                                 {data.status === 'expired' && 'Expired'} */}
                    </Badge>
                  )}
                  {/* <Button
                              size={'icon'}
                              className="size-7 text-muted-foreground hover:text-rose-700 "
                              variant="ghost"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="size-5"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    fill="currentColor"
                                    d="m15.241 3.721l.293 2.029H19.5a.75.75 0 0 1 0 1.5h-.769l-.873 10.185c-.053.62-.096 1.13-.165 1.542c-.07.429-.177.813-.386 1.169a3.25 3.25 0 0 1-1.401 1.287c-.372.177-.764.25-1.198.284c-.417.033-.928.033-1.55.033h-2.316c-.622 0-1.133 0-1.55-.033c-.434-.034-.826-.107-1.198-.284a3.25 3.25 0 0 1-1.401-1.287c-.21-.356-.315-.74-.386-1.169c-.069-.413-.112-.922-.165-1.542L5.269 7.25H4.5a.75.75 0 0 1 0-1.5h3.966l.293-2.029l.011-.061c.182-.79.86-1.41 1.71-1.41h3.04c.85 0 1.528.62 1.71 1.41zM9.981 5.75h4.037l-.256-1.776c-.048-.167-.17-.224-.243-.224h-3.038c-.073 0-.195.057-.243.224zm1.269 4.75a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0zm3 0a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0z"
                                 ></path>
                              </svg>
                           </Button> */}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-end justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="size-5" />
              Add New Card
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[50rem]">
            <DialogHeader>
              <DialogTitle>Add new your card</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-8">
              <PayWithCreditCard />
              <div className="flex items-end justify-end gap-4">
                <DialogClose asChild>
                  <Button variant="outline" className="px-6 py-5">
                    Close
                  </Button>
                </DialogClose>
                <Button className="px-6 py-5">Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreditCardUser;
