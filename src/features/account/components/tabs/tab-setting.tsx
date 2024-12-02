import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes = [
   {
      name: 'light',
      value: 'light',
      image: 'light.png',
   },
   {
      name: 'dark',
      value: 'dark',
      image: 'dark.png',
   },
   {
      name: 'Auto',
      value: 'system',
      image: 'system.png',
   },
];
const TabSettings = () => {
   const { setTheme, theme } = useTheme();
   const [themeValue, setThemeValue] = useState(theme || '');

   useEffect(() => {
      setTheme(themeValue);
   }, [themeValue]);

   return (
      <div className="pt-14 sm:pt-20 pb-24 lg:pb-32">
         <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl font-semibold">Settings</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div className="max-w-2xl">
               <span className="text-xl font-semibold block">Theme</span>
               <br />
               <RadioGroup defaultValue={theme} value={themeValue} onValueChange={setThemeValue}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     {themes.map((item, index) => (
                        <div key={index}>
                           <RadioGroupItem
                              value={item.value}
                              id={item.value}
                              className="peer sr-only"
                           />
                           <Label
                              htmlFor={item.value}
                              className={cn(
                                 'relative border cursor-pointer border-neutral-200 dark:border-neutral-700 rounded-2xl pl-5 pt-5 pr-5 flex items-center justify-between gap-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:border-2 [&:has([data-state=checked])]:border-primary',
                                 {
                                    'bg-neutral-950':
                                       item.value === 'dark' || item.value === 'system',
                                    'bg-neutral-100': item.value === 'light',
                                 },
                              )}
                           >
                              <div
                                 className={cn(
                                    'rounded-t-2xl flex flex-col w-full overflow-hidden shadow relative',
                                    {
                                       'bg-neutral-800':
                                          item.value === 'dark' || item.value === 'system',
                                       'bg-neutral-50': item.value === 'light',
                                    },
                                 )}
                              >
                                 {item.value === 'system' && (
                                    <div className="absolute w-1/2 mix-blend-difference bg-white right-0 inset-y-0" />
                                 )}

                                 <div className="flex items-center gap-1 p-3 rounded-3xl w-full">
                                    <div className="size-2 bg-red-500 rounded-full" />
                                    <div className="size-2 bg-yellow-500 rounded-full" />
                                    <div className="size-2 bg-green-500 rounded-full" />
                                 </div>
                                 <div
                                    className={cn('flex justify-around  items-center py-[5px]', {
                                       'bg-neutral-600': item.value === 'light',
                                       'bg-neutral-700':
                                          item.value === 'dark' || item.value === 'system',
                                    })}
                                 >
                                    <div />
                                    <div
                                       className={cn('w-2/3 h-5', {
                                          'bg-neutral-800':
                                             item.value === 'dark' || item.value === 'system',
                                          'bg-neutral-100': item.value === 'light',
                                       })}
                                    />
                                    <div
                                       className={cn('bg-primary size-5 rounded-full', {
                                          'bg-neutral-800':
                                             item.value === 'dark' || item.value === 'system',
                                          'bg-neutral-100': item.value === 'light',
                                       })}
                                    />
                                 </div>
                                 <div
                                    className={cn('grid grid-cols-12 divide-x', {
                                       'divide-neutral-200': item.value === 'light',
                                       'divide-neutral-700':
                                          item.value === 'dark' || item.value === 'system',
                                    })}
                                 >
                                    <div className="col-span-3">
                                       <div className="p-3 space-y-2">
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div className="rounded-full h-2" />
                                          <div className="rounded-full h-2" />
                                       </div>
                                    </div>
                                    <div className="col-span-9">
                                       <div className="p-3 space-y-2">
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div
                                             className={cn('rounded-full h-2', {
                                                'bg-neutral-200': item.value === 'light',
                                                'bg-neutral-700':
                                                   item.value === 'dark' || item.value === 'system',
                                             })}
                                          />
                                          <div className="rounded-full h-2" />
                                          <div className="rounded-full h-2" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {item.value === themeValue && (
                                 <div className="absolute -top-2 -right-2 border border-white dark:border-neutral-900 flex items-center justify-center size-6 bg-primary rounded-full">
                                    <Check className="size-4 text-white dark:text-neutral-900" />
                                 </div>
                              )}
                           </Label>
                           <p className="capitalize mt-2 text-muted-foreground text-sm">
                              {item.name}
                           </p>
                        </div>
                     ))}
                  </div>
               </RadioGroup>
            </div>
         </div>
      </div>
   );
};

export default TabSettings;
