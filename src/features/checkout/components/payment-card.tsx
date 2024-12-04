'use client';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { useState } from 'react';
import Cards, { ReactCreditCardsProps } from 'react-credit-cards-2';

import InputLabel from '@/components/custom/input/input-label';

// Function to determine the card type based on the first 4 digits
const getCardIssuer = (cardNumber: string) => {
  // Define regex patterns for different card types
  const cardTypes: { [key: string]: RegExp } = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    americanExpress: /^3[47]/,
    dinersClub: /^3(?:0[0-5]|[68])/,
    discover: /^6(?:011|5)/,
    jcb: /^(?:2131|1800|35)/,
    unionPay: /^62/,
    maestro: /^(?:50|5[6-9]|6[0-9]|6[4-9])/,
    mir: /^220[0-4]/,
    elo: /^(?:4011|4312|4389|4514|4576|5041|5090)/,
    hipercard: /^606282/,
  };

  // Check the card number against each pattern
  for (const [issuer, pattern] of Object.entries(cardTypes)) {
    if (pattern.test(cardNumber)) {
      return issuer; // Return the card type
    }
  }
  return ''; // Default if no match
};

// Function to get the max length for the card number based on the issuer
const getMaxLengthForCard = (issuer: string) => {
  switch (issuer) {
    case 'americanExpress': {
      return 17;
    } // American Express has 15 digits + 2 for formatting
    case 'visa':
    case 'mastercard':
    case 'dinersClub':
    case 'discover':
    case 'jcb':
    case 'unionPay':
    case 'maestro':
    case 'mir':
    case 'elo':
    case 'hipercard': {
      return 19;
    } // Most other cards have 16 digits + 3 for formatting
    default: {
      return 19;
    } // Default to 19 for unknown cards (16 digits + 3 hyphens)
  }
};

export const PayWithCreditCard = () => {
  const [state, setState] = useState<ReactCreditCardsProps>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focused: '',
    issuer: 'visa',
  });

  const handleInputChange = (event_: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event_.target;
    setState(previous => ({ ...previous, [name]: value }));
  };

  const handleInputCVCChange = (value: number) => {
    setState(previous => ({ ...previous, cvc: value }));
  };

  const handleInputExpiryChange = (
    event_: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event_.target.value.replaceAll(/\D/g, '');

    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    setState(previous => ({
      ...previous,
      expiry: value,
    }));
  };

  const handleInputNumberCardChange = (
    event_: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event_.target.value.replaceAll(/\D/g, ''); // Remove non-numeric characters

    // Add a space after every 4 digits
    value = value.replaceAll(/(\d{4})(?=\d)/g, '$1 ');

    // Determine the max length based on the card type
    const issuer = getCardIssuer(value);
    const maxLength = getMaxLengthForCard(issuer);

    // Ensure the card number does not exceed the determined max length
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    // Update the state with the formatted card number and detected issuer
    setState(previous => ({
      ...previous,
      number: value,
      issuer, // Update issuer dynamically based on input
    }));
  };

  const handleInputFocus = (event_: React.FocusEvent<HTMLInputElement>) => {
    const inputName = event_.target.name as ReactCreditCardsProps['focused'];
    setState(previous => ({ ...previous, focused: inputName }));
  };

  // Determine the maxLength based on the current issuer
  const maxLength = getMaxLengthForCard(state.issuer || 'visa');

  return (
    <div className="h-fit w-full rounded-md p-0">
      <div className="grid w-full grid-cols-1 place-items-center justify-items-start gap-8 md:gap-5 xl:grid-cols-2">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focused}
          preview
          issuer={state.issuer}
        />

        <div className="mt-5 grid w-full grid-cols-1 gap-2 md:mt-0">
          <InputLabel
            sizes="small"
            label="Card number"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            className="focus:border-primary-300 focus:ring-primary-200 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm focus:ring"
            required
            name={'number'}
            value={state.number}
            maxLength={maxLength}
            onChange={handleInputNumberCardChange}
            onFocus={handleInputFocus}
          />

          <div className="flex w-full items-center space-x-5">
            <InputLabel
              sizes="small"
              label="Expiration date"
              placeholder="MM/YY"
              className="focus:border-primary-300 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm"
              name="expiry"
              required
              value={state.expiry}
              maxLength={5}
              onChange={handleInputExpiryChange}
              onFocus={handleInputFocus}
            />
            <InputLabel
              sizes="small"
              label="CVC"
              required
              placeholder="123"
              className="focus:border-primary-300 block h-11 w-full appearance-none rounded-lg border-neutral-200 bg-white px-4 text-sm"
              name={'cvc'}
              type="number"
              value={state.cvc as number}
              maxLength={3}
              onChange={e =>
                handleInputCVCChange(Number.parseInt(e.target.value))
              }
              onFocus={handleInputFocus}
            />
          </div>
          <InputLabel
            sizes="small"
            label="Card holder"
            placeholder="JOHN DOE"
            className="focus:border-primary-300 block h-11 w-full rounded-lg border-neutral-200 bg-white px-4 text-sm uppercase"
            name={'name'}
            required
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
      </div>
    </div>
  );
};
