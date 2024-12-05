import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import useDebouncedValue from '@/hooks/use-debounced';
import langs from '@/lib/countries.json';
import { useAppSelector } from '@/stores/hook';
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

const normalizeString = (string_: string) =>
  string_
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '')
    .replaceAll(/\s+/g, '')
    .toLowerCase();

const LanguageButton = () => {
  const dispatch = useDispatch();
  const language = useAppSelector(
    state => state.globalSlice?.searchGlobal?.lang,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [debounceSearch] = useDebouncedValue(searchTerm, 300);
  const [listCountry, setListCountry] = useState<CountryType[]>([]);
  const [allCountries, setAllCountries] = useState<CountryType[]>([]);

  const filterCountryData = (
    data: CountryType[],
    keySearch: string,
  ): CountryType[] => {
    const normalizedSearch = normalizeString(keySearch);
    return data.filter(tag =>
      normalizeString(tag.name.common).includes(normalizedSearch),
    );
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
      {countries?.map(country => (
        <Link
          key={country?.cca2}
          href="#"
          title={country?.name?.common}
          onClick={() => handleAddLanguage(country)}
          className="-m-3 flex items-center gap-2 rounded-lg p-4 transition hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={country?.flags?.svg}
              alt={country?.flags?.alt}
              className="h-full w-full object-cover"
            />
            <AvatarFallback>{country?.cca2}</AvatarFallback>
          </Avatar>
          <p className="line-clamp-1 text-sm font-normal">
            {country?.name?.common}
          </p>
        </Link>
      ))}
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 lg:h-12 lg:w-12">
        <div className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 lg:h-10 lg:w-10">
          <Avatar className="h-5 w-5 lg:h-8 lg:w-8">
            <AvatarImage
              src={language?.flags?.svg}
              className="h-full w-full object-cover"
            />
            <AvatarFallback>{language?.cca2}</AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="w-[300px] space-y-2 rounded-2xl p-3 lg:w-[412px]"
      >
        <div className="relative">
          <Input
            placeholder="Search language"
            className="h-11"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
          {searchTerm ? (
            <i
              className="las la-times-circle absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-neutral-500"
              onClick={() => setSearchTerm('')}
            ></i>
          ) : (
            <i className="las la-globe absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-neutral-500"></i>
          )}
        </div>

        <div className="border-b border-b-neutral-100 dark:border-b-neutral-800" />

        <ScrollArea className="h-[350px] lg:h-[512px]">
          {debounceSearch ? (
            <>
              <div className="space-y-5 px-7 py-3">
                {renderCountryList(listCountry)}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-5 px-7 py-3">
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
                  Popular language
                </h3>
                {renderCountryList(popularState)}
              </div>
              <div className="space-y-5 px-7 py-3">
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
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
