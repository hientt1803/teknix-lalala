import 'react-international-phone/style.css';

import { PhoneNumberUtil } from 'google-libphonenumber';
import { useEffect, useState } from 'react';
import { ParsedCountry, PhoneInput } from 'react-international-phone';

import { Label } from '@/components/ui/label';

type Props = {
  onChange?: (city: string, phone: string, isError: boolean) => void;
  value: string;
  readOnly?: boolean;
};

const phoneUtils = PhoneNumberUtil.getInstance();

const isValidNumberPhone = (phoneNumber: string, code: string) => {
  try {
    const phone = phoneUtils.parseAndKeepRawInput(phoneNumber, code);
    return phoneUtils.isValidNumber(phone);
  } catch {
    return false;
  }
};

const InputPhoneNumber = ({ onChange, value, readOnly }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleOnchangePhone = (
    phone: string,
    meta: { country: ParsedCountry; inputValue: string },
  ): void => {
    const isValid = isValidNumberPhone(phone, meta.country.iso2);
    setIsError(!isValid);
    onChange &&
      onChange(
        meta.country.name + ` (${meta.country.iso2.toUpperCase()})`,
        phone,
        !isValid,
      );
  };

  return (
    <div className="flex flex-col gap-[3px]">
      <Label className="text-sm text-neutral-800 dark:text-neutral-300">
        Phone number <span className="text-red-500">*</span>
      </Label>

      <PhoneInput
        disabled={readOnly}
        style={{
          height: 44,
          borderRadius: '1rem',
          boxShadow: isFocused
            ? '0 0 0 0.15rem rgba(147, 197, 253, 0.5)'
            : 'none',
        }}
        inputStyle={{
          display: 'block',
          border: `1px solid ${isFocused ? '#93c5fd' : '#e2e8f0'}`,
          // backgroundColor: "#ffffff",
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: 400,
          height: '2.75rem',
          padding: '0.75rem 1rem',
          width: '100%',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        countrySelectorStyleProps={{
          buttonStyle: {
            height: 44,
            width: 60,
            border: `1px solid ${isFocused ? '#93c5fd' : '#e2e8f0'}`,
            borderTopLeftRadius: '1rem',
            borderBottomLeftRadius: '1rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          },
        }}
        defaultCountry="vn"
        value={value}
        onChange={handleOnchangePhone}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isError && (
        <span className="mt-1 text-[13px] font-medium text-red-500">
          Please enter a valid phone number
        </span>
      )}
    </div>
  );
};

export default InputPhoneNumber;
