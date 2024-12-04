import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import useDebouncedValue from '@/hooks/use-debounced';
import curs from '@/lib/currencies.json';
import { useAppSelector } from '@/stores';
import { setSearchGlobalCurrency } from '@/stores/features/global/global-slice';
export type CurrencyType = {
  code: string;
  name: string;
  symbol: string;
};

const popularCurrency: CurrencyType[] = [
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
];

const normalizeString = (string_: string) => {
  return string_
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '') // Remove diacritics
    .replaceAll(/\s+/g, '') // Remove spaces
    .toLowerCase();
};

const CurrencyButton = () => {
  const dispatch = useDispatch();
  const currency = useAppSelector(
    state => state.globalSlice.searchGlobal.currency,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [debounceSearch] = useDebouncedValue(searchTerm, 300);
  const [listCurrency, setListCurrency] = useState<CurrencyType[]>([]);
  const [allCurrencies, setAllCurrencies] = useState<CurrencyType[]>([]); // To store all currencies when loaded

  const filterCurrencyData = (
    data: CurrencyType[],
    keySearch: string,
  ): CurrencyType[] => {
    const normalizedSearch = normalizeString(keySearch);
    return data.filter(currency =>
      normalizeString(currency.code).includes(normalizedSearch),
    );
  };

  // Load data lazily when popover opens
  useEffect(() => {
    if (open && allCurrencies.length === 0) {
      // Simulate an API call or load the currencies from local data
      setTimeout(() => {
        setAllCurrencies(curs); // Load the full currencies list
        setListCurrency(curs); // Initially show all currencies
      }, 500); // Simulating a delay
    }
  }, [open]);

  // Filter the list when the search term changes
  useEffect(() => {
    if (debounceSearch) {
      setListCurrency(filterCurrencyData(allCurrencies, debounceSearch));
    } else {
      setListCurrency(allCurrencies);
    }
  }, [debounceSearch, allCurrencies]);

  const handleAddCurrency = (currency: CurrencyType) => {
    dispatch(setSearchGlobalCurrency(currency));
    setOpen(false);
    setSearchTerm('');
  };

  const renderCurrencyList = (currencies: CurrencyType[]) => (
    <div className="relative grid gap-8 lg:grid-cols-2">
      {currencies.map((currency, index) => (
        <Link
          key={index}
          title={currency.name}
          onClick={() => handleAddCurrency(currency)}
          href="#"
          className="-m-3 flex items-center gap-2 rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="h-full w-full bg-transparent text-xs">
              {currency.symbol}
            </AvatarFallback>
          </Avatar>
          <p className="line-clamp-1 text-sm font-normal">{currency.code}</p>
        </Link>
      ))}
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 lg:h-12 lg:w-12">
        <span className="text-sm font-medium lg:text-base">
          {currency?.code}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        className="w-[220px] space-y-2 rounded-2xl p-3 lg:w-[312px]"
      >
        <div className="relative">
          <Input
            placeholder="Search currency"
            className="h-11"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
          <i
            className={`las ${searchTerm ? 'la-times-circle' : 'la-money-bill'} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-neutral-500`}
            onClick={() => setSearchTerm('')}
          ></i>
        </div>
        <div className="border-b border-b-neutral-100 dark:border-b-neutral-800" />
        <ScrollArea className="h-[320px] lg:h-[512px]">
          {debounceSearch ? (
            <div className="space-y-5 px-5 py-3">
              {renderCurrencyList(listCurrency)}
            </div>
          ) : (
            <>
              <div className="space-y-5 px-5 py-3">
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
                  Popular currencies
                </h3>
                {renderCurrencyList(popularCurrency)}
              </div>
              <div className="space-y-5 px-5 py-3">
                <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
                  All currencies
                </h3>
                {renderCurrencyList(allCurrencies)}
              </div>
            </>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default CurrencyButton;
