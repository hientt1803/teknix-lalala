import React from 'react';

import { Button } from '../ui/button';

interface AmountActionProps {
  value: number;
  onChange: (newValue: number) => void;
}

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-4 w-4"
  >
    <path
      fillRule="evenodd"
      d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-4 w-4"
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const AmountAction: React.FC<AmountActionProps> = ({ value, onChange }) => {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex w-28 items-center justify-between">
      <Button
        size={'icon'}
        variant={'outline'}
        className="flex h-8 w-8 items-center justify-center rounded"
        type="button"
        onClick={handleDecrement}
        disabled={value <= 0}
      >
        <MinusIcon />
      </Button>
      <span>{value}</span>
      <Button
        size={'icon'}
        variant={'outline'}
        className="flex h-8 w-8 items-center justify-center rounded"
        type="button"
        onClick={handleIncrement}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default AmountAction;
