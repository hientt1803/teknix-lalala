import { Leaf, LocateFixed, LucideProps, MapPinHouse } from 'lucide-react';
import { FunctionComponent } from 'react';
import colors from 'tailwindcss/colors';

export enum Category {
  LOCATE = 0,
  HOTEL = 1,
  REGION = 2,
}

export interface MarkerCategoriesValues {
  name: string;
  icon: FunctionComponent<LucideProps>;
  color: string;
  hideInMenu?: boolean;
}

type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues;
};

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: colors.green[400],
    hideInMenu: false,
  },
  [Category.HOTEL]: {
    name: 'Stay',
    icon: MapPinHouse,
    color: colors.blue[400],
    hideInMenu: false,
  },
  [Category.REGION]: {
    name: 'Destination',
    icon: Leaf,
    color: colors.red[400],
  },
};

export default MarkerCategories;
