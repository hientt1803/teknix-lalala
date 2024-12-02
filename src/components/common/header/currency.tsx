import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import curs from '@/lib/currencies.json';
import Link from 'next/link';
import useDebouncedValue from '@/hooks/use-debounced';
import { useAppSelector } from '@/stores';
import { useDispatch } from 'react-redux';
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

const CurrencyButton = () => {
    const dispatch = useDispatch();
    const currency = useAppSelector((state) => state.globalSlice.searchGlobal.currency);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [debounceSearch] = useDebouncedValue(searchTerm, 300);
    const [listCurrency, setListCurrency] = useState<CurrencyType[]>([]);
    const [allCurrencies, setAllCurrencies] = useState<CurrencyType[]>([]); // To store all currencies when loaded
 
    const normalizeString = (str: string) =>
       str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .replace(/\s+/g, '') // Remove spaces
          .toLowerCase();
 
    const filterCurrencyData = (data: CurrencyType[], keySearch: string): CurrencyType[] => {
       const normalizedSearch = normalizeString(keySearch);
       return data.filter((currency) => normalizeString(currency.code).includes(normalizedSearch));
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
                className="flex items-center gap-2 p-2 -m-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
             >
                <Avatar className="w-8 h-8">
                   <AvatarFallback className="w-full h-full text-xs bg-transparent">
                      {currency.symbol}
                   </AvatarFallback>
                </Avatar>
                <p className="text-sm font-normal line-clamp-1">{currency.code}</p>
             </Link>
          ))}
       </div>
    );
 
    return (
       <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-8 h-8 lg:w-12 lg:h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex justify-center items-center cursor-pointer">
             <span className="font-medium lg:text-base text-sm">{currency?.code}</span>
          </PopoverTrigger>
 
          <PopoverContent
             align="end"
             side="bottom"
             className="rounded-2xl w-[220px] lg:w-[312px] p-3 space-y-2"
          >
             <div className="relative">
                <Input
                   placeholder="Search currency"
                   className="h-11"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i
                   className={`las ${searchTerm ? 'la-times-circle' : 'la-money-bill'} text-2xl cursor-pointer text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2`}
                   onClick={() => setSearchTerm('')}
                ></i>
             </div>
             <div className="border-b border-b-neutral-100 dark:border-b-neutral-800" />
             <ScrollArea className="h-[320px] lg:h-[512px]">
                {debounceSearch ? (
                   <div className="py-3 px-5 space-y-5">{renderCurrencyList(listCurrency)}</div>
                ) : (
                   <>
                      <div className="py-3 px-5 space-y-5">
                         <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
                            Popular currencies
                         </h3>
                         {renderCurrencyList(popularCurrency)}
                      </div>
                      <div className="py-3 px-5 space-y-5">
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
 
