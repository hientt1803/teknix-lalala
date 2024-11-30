import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import langs from '@/lib/countries.json';
import Link from 'next/link';
import useDebouncedValue from '@/hooks/use-debounced';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/stores';
import { setSearchGlobalLanguage } from '@/stores/features/global/global-slice';

export type CountryType = {
   flags: {
      png: string;
      svg: string;
      alt: string;
   };
   cca2: string;
   ccn3: string;
   cca3: string;
   name: {
      common: string;
      official: string;
      nativeName?: {
         [key: string]:
            | {
                 official: string;
                 common: string;
              }
            | undefined;
      };
   };
};

const popularState = [
   {
      flags: {
         png: 'https://flagcdn.com/w320/us.png',
         svg: 'https://flagcdn.com/us.svg',
         alt: 'The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton.',
      },
      name: {
         common: 'United States',
         official: 'United States of America',
         nativeName: {
            eng: {
               official: 'United States of America',
               common: 'United States',
            },
         },
      },
      cca2: 'US',
      ccn3: '840',
      cca3: 'USA',
      languages: {
         eng: 'English',
      },
   },
   {
      flags: {
         png: 'https://flagcdn.com/w320/vn.png',
         svg: 'https://flagcdn.com/vn.svg',
         alt: 'The flag of Vietnam features a large five-pointed yellow star on a red field.',
      },
      name: {
         common: 'Vietnam',
         official: 'Socialist Republic of Vietnam',
         nativeName: {
            vie: {
               official: 'Cộng hòa xã hội chủ nghĩa Việt Nam',
               common: 'Việt Nam',
            },
         },
      },
      cca2: 'VN',
      ccn3: '704',
      cca3: 'VNM',
      languages: {
         vie: 'Vietnamese',
      },
   },
];

const LanguageButton = () => {
   const dispatch = useDispatch();
   const language = useAppSelector((state) => state.globalSlice?.searchGlobal?.lang);
   const [searchTerm, setSearchTerm] = useState('');
   const [open, setOpen] = useState(false);
   const [debounceSearch] = useDebouncedValue(searchTerm, 300);
   const [listCountry, setListCountry] = useState<CountryType[]>([]);
   const [allCountries, setAllCountries] = useState<CountryType[]>([]);

   const normalizeString = (str: string) =>
      str
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .replace(/\s+/g, '')
         .toLowerCase();

   const filterCountryData = (data: CountryType[], keySearch: string): CountryType[] => {
      const normalizedSearch = normalizeString(keySearch);
      return data.filter((tag) => normalizeString(tag.name.common).includes(normalizedSearch));
   };
   // Load data lazily when popover opens
   useEffect(() => {
      if (open && allCountries.length === 0) {
         // Simulate an API call or load the currencies from local data
         setTimeout(() => {
            setAllCountries(langs); // Load the full currencies list
            setListCountry(langs); // Initially show all currencies
         }, 500); // Simulating a delay
      }
   }, [open]);
   useEffect(() => {
      if (debounceSearch && debounceSearch.length > 0) {
         setListCountry(filterCountryData(langs as CountryType[], debounceSearch));
      } else {
         setListCountry(langs);
      }
   }, [debounceSearch, allCountries]);
   const handleAddLanguage = (language: CountryType) => {
      dispatch(setSearchGlobalLanguage(language));
      setOpen(false);
      setSearchTerm('');
   };
   const renderCountryList = (countries: CountryType[]) => (
      <div className="relative grid gap-8 lg:grid-cols-2">
         {countries?.map((country) => (
            <Link
               key={country?.cca2}
               href="#"
               title={country?.name?.common}
               onClick={() => handleAddLanguage(country)}
               className="flex items-center gap-2 p-4 -m-3 rounded-lg transition hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
               <Avatar className="w-6 h-6">
                  <AvatarImage
                     src={country?.flags?.svg}
                     alt={country?.flags?.alt}
                     className="w-full h-full object-cover"
                  />
                  <AvatarFallback>{country?.cca2}</AvatarFallback>
               </Avatar>
               <p className="text-sm font-normal line-clamp-1">{country?.name?.common}</p>
            </Link>
         ))}
      </div>
   );

   return (
      <Popover open={open} onOpenChange={setOpen} modal>
         <PopoverTrigger className="w-8 h-8 lg:w-12 lg:h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex justify-center items-center cursor-pointer">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
               <Avatar className="w-5 h-5 lg:w-8 lg:h-8">
                  <AvatarImage src={language?.flags?.svg} className="w-full h-full object-cover" />
                  <AvatarFallback>{language?.cca2}</AvatarFallback>
               </Avatar>
            </div>
         </PopoverTrigger>
         <PopoverContent
            align="end"
            side="bottom"
            className="rounded-2xl w-[300px] lg:w-[412px] p-3 space-y-2"
         >
            <div className="relative">
               <Input
                  placeholder="Search language"
                  className="h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               {searchTerm ? (
                  <i
                     className="las la-times-circle text-2xl cursor-pointer text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2"
                     onClick={() => setSearchTerm('')}
                  ></i>
               ) : (
                  <i className="las la-globe text-2xl text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2"></i>
               )}
            </div>

            <div className="border-b border-b-neutral-100 dark:border-b-neutral-800" />

            <ScrollArea className="h-[350px] lg:h-[512px]">
               {debounceSearch ? (
                  <>
                     <div className="px-7 py-3 space-y-5">{renderCountryList(listCountry)}</div>
                  </>
               ) : (
                  <>
                     <div className="px-7 py-3 space-y-5">
                        <h3 className="text-sm  text-neutral-500 dark:text-neutral-400">
                           Popular language
                        </h3>
                        {renderCountryList(popularState)}
                     </div>
                     <div className="px-7 py-3 space-y-5">
                        <h3 className="text-sm  text-neutral-500 dark:text-neutral-400">
                           All languages
                        </h3>
                        {renderCountryList(allCountries)}
                     </div>
                  </>
               )}
            </ScrollArea>
         </PopoverContent>
      </Popover>
   );
};

export default LanguageButton;
