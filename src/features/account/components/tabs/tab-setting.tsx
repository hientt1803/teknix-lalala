import { Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

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
    <div className="pb-24 pt-14 sm:pt-20 lg:pb-32">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Settings</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        <div className="max-w-2xl">
          <span className="block text-xl font-semibold">Theme</span>
          <br />
          <RadioGroup
            defaultValue={theme}
            value={themeValue}
            onValueChange={setThemeValue}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                      'relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-neutral-200 pl-5 pr-5 pt-5 peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-primary dark:border-neutral-700 [&:has([data-state=checked])]:border-primary',
                      {
                        'bg-neutral-950':
                          item.value === 'dark' || item.value === 'system',
                        'bg-neutral-100': item.value === 'light',
                      },
                    )}
                  >
                    <div
                      className={cn(
                        'relative flex w-full flex-col overflow-hidden rounded-t-2xl shadow',
                        {
                          'bg-neutral-800':
                            item.value === 'dark' || item.value === 'system',
                          'bg-neutral-50': item.value === 'light',
                        },
                      )}
                    >
                      {item.value === 'system' && (
                        <div className="absolute inset-y-0 right-0 w-1/2 bg-white mix-blend-difference" />
                      )}

                      <div className="flex w-full items-center gap-1 rounded-3xl p-3">
                        <div className="size-2 rounded-full bg-red-500" />
                        <div className="size-2 rounded-full bg-yellow-500" />
                        <div className="size-2 rounded-full bg-green-500" />
                      </div>
                      <div
                        className={cn(
                          'flex items-center justify-around py-[5px]',
                          {
                            'bg-neutral-600': item.value === 'light',
                            'bg-neutral-700':
                              item.value === 'dark' || item.value === 'system',
                          },
                        )}
                      >
                        <div />
                        <div
                          className={cn('h-5 w-2/3', {
                            'bg-neutral-800':
                              item.value === 'dark' || item.value === 'system',
                            'bg-neutral-100': item.value === 'light',
                          })}
                        />
                        <div
                          className={cn('size-5 rounded-full bg-primary', {
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
                          <div className="space-y-2 p-3">
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div className="h-2 rounded-full" />
                            <div className="h-2 rounded-full" />
                          </div>
                        </div>
                        <div className="col-span-9">
                          <div className="space-y-2 p-3">
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div
                              className={cn('h-2 rounded-full', {
                                'bg-neutral-200': item.value === 'light',
                                'bg-neutral-700':
                                  item.value === 'dark' ||
                                  item.value === 'system',
                              })}
                            />
                            <div className="h-2 rounded-full" />
                            <div className="h-2 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.value === themeValue && (
                      <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-white bg-primary dark:border-neutral-900">
                        <Check className="size-4 text-white dark:text-neutral-900" />
                      </div>
                    )}
                  </Label>
                  <p className="mt-2 text-sm capitalize text-muted-foreground">
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
