import {
  add,
  addDays,
  addHours,
  differenceInDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isValid,
  parse,
  parseISO,
  startOfDay,
  toDate,
} from 'date-fns';

/**
 * The function `countTotalDaysInRange` calculates the total number of days between a start date and an
 * end date, inclusive.
 * @param {string} startDate - The `startDate` parameter is the beginning date of the range for which
 * you want to count the total number of days.
 * @param {string} endDate - The `endDate` parameter is the date that marks the end of the range for
 * which you want to count the total number of days.
 * @returns The function `countTotalDaysInRange` returns the total number of days between the
 * `startDate` and `endDate`, including both the start and end dates.
 */
export const countTotalDaysInRange = (
  startDate: string,
  endDate: string,
): number => {
  const format = 'yyyy-MM-dd'; // Date format yyyy/mm/dd

  // Parse the date strings into Date objects
  const start = parse(startDate, format, new Date());
  const end = parse(endDate, format, new Date());

  // Calculate the difference in days
  return differenceInDays(end, start); // +1 to include both start and end dates
};

/**
 * The `formatTime` function in TypeScript parses a time string and formats it into 'h:mm a' format.
 * @param {string} timeString - The `timeString` parameter is a string representing a time in the
 * format 'HH:mm:ss' (e.g., '14:30:00' for 2:30 PM).
 * @returns The `formatTime` function is returning a formatted time string in the format 'HH:mm a'
 * (e.g., '7:00 AM', '8:00 PM').
 */
export const formatTime = (timeString: string): string => {
  // Parse the time string into a Date object
  const parsedTime = parse(timeString, 'HH:mm:ss', new Date());
  // console.log(parsedTime);

  // Format the time to 'h:mm a' (e.g., '7:00 AM', '8:00 PM')
  return format(parsedTime, 'HH:mm a');
};

/**
 * The function `timeFormatString` takes an arrival time string, extracts the time part, ensures it is
 * in the format "hh:mm", and adds ":00" for seconds before returning the formatted time.
 * @param {string} arriveTime - The `arriveTime` parameter is a string representing a time value in the
 * format "hh:mm:ss" (hours:minutes:seconds). The function `timeFormatString` takes this time value as
 * input and returns a formatted time string in the format "hh:mm:00" (hours:
 * @returns The function `timeFormatString` takes an `arriveTime` string as input, extracts the time
 * part from it, ensures that the time part has a length of 5 characters, and then adds `:00` to the
 * end of the time part. The final formatted time string is returned by the function.
 */
export function timeFormatString(arriveTime: string) {
  // Tách chuỗi nếu có chứa ký tự đặc biệt "Oct" hoặc bất kỳ chữ cái nào
  const timePart = arriveTime.split(' ')[0];

  // Đảm bảo định dạng hh:mm có đúng 5 ký tự
  let formattedTime = timePart.length === 5 ? timePart : timePart.slice(0, 5);

  // Thêm ":00" cho giây
  return `${formattedTime}:00`;
}

/**
 * The function `formatDateMonth` takes a string or Date value and returns it formatted as 'MMM dd'.
 * @param {string | Date} value - The `value` parameter in the `formatDateMonth` function can be either
 * a string or a Date object.
 * @returns The `formatDateMonth` function is returning the input `value` formatted as a month
 * abbreviation followed by the day of the month.
 */
export const formatDateMonth = (value: string | Date) => {
  return format(value, 'MMM dd');
};

/**
 * The function generates an array of time slots starting from a specified time with a specified
 * interval, up to a maximum number of slots.
 * @param {string} startTime - The `startTime` parameter is the initial time from which you want to
 * start generating time slots. It should be a string representing a valid date and time format that
 * can be parsed by the `Date` constructor in JavaScript.
 * @param {number} [maxSlots=20] - The `maxSlots` parameter determines the maximum number of time slots
 * to generate starting from the specified `startTime`. In the provided function, it defaults to 20 if
 * not explicitly specified when calling the function. This means that by default, the function will
 * generate 20 time slots unless a different value is
 * @param {number} [intervalHours=1] - The `intervalHours` parameter in the `generateTimeSlotsFromNow`
 * function determines the time interval between each time slot. By default, it is set to 1 hour,
 * meaning that each time slot will be spaced 1 hour apart from the previous one. You can adjust this
 * parameter to change
 * @returns The `generateTimeSlotsFromNow` function returns an array of strings representing time slots
 * starting from the specified `startTime` and continuing at regular intervals for a maximum of
 * `maxSlots`. Each time slot is formatted as either 'HH:mm' if it falls on the same day as the
 * `startTime`, or 'HH:mm MMM d' if it falls on a different day.
 */
export function generateTimeSlotsFromNow(
  startTime: string,
  maxSlots: number = 20,
  intervalHours: number = 1,
): string[] {
  const slots: string[] = [];
  const startDate = new Date(startTime);

  for (let index = 0; index < maxSlots; index++) {
    const slotDate = addHours(startDate, index);

    // Kiểm tra xem ngày có trùng với ngày bắt đầu hay không
    const formattedTime = isSameDay(startDate, slotDate)
      ? format(slotDate, 'HH:mm')
      : format(slotDate, 'HH:mm MMM d');

    slots.push(formattedTime);
  }

  return slots;
}

/**
 * Hàm kiểm tra và trả về một ngày hợp lệ.
 * @param date - Ngày dưới dạng string hoặc null.
 * @param fallbackDate - Ngày mặc định nếu date không hợp lệ hoặc là quá khứ.
 * @param currentDate - Ngày hiện tại (mặc định là ngày hiện tại).
 * @returns Ngày hợp lệ (không nằm trong quá khứ).
 */
export const getValidatedDate = (
  date?: string | Date,
  fallbackDate: Date = addDays(new Date(), 2),
  currentDate: Date = new Date(),
): Date => {
  const parsedDate = date ? toDate(date) : fallbackDate;
  return parsedDate < currentDate ? fallbackDate : parsedDate;
};

/**
 * The function `formatDateMMM` takes a Date object or string as input and returns the date in the
 * format "MMM d".
 * @param {Date | string} date - The `date` parameter in the `formatDateMMM` function can be either a
 * `Date` object or a string representing a date.
 * @returns The function `formatDateMMM` is returning a formatted date string in the format "MMM d".
 */
export const formatDateMMM = (date: Date | string): string => {
  return format(date, 'MMM d');
};

/**
 * The `formatDated` function takes a Date object or string and returns a formatted date string using
 * the "d" format specifier.
 * @param {Date | string} date - The `date` parameter in the `formatDated` function can be either a
 * `Date` object or a string representing a date.
 * @returns The function `formatDated` is returning the formatted date in the "d" format.
 */
export const formatDated = (date: Date | string): string => {
  return format(date, 'd');
};

/**
 * The function `checkIfDateIsGreaterThanToday` compares a given date with today's date and returns
 * the greater of the two dates.
 * @param {Date} date - The `date` parameter is a Date object representing a specific date and time.
 * @returns The function `checkIfDateIsGreaterThanToday` returns either the input date if it is
 * after today or the same as today, or it returns today's date if the input date is before today.
 */
export const checkIfDateIsGreaterThanToday = (date: Date) => {
  const today = startOfDay(new Date());
  const inputDate = startOfDay(date);

  return isAfter(inputDate, today) || isSameDay(inputDate, today)
    ? inputDate
    : today;
};

/**
 * The function `getAdjustedEndDate` takes two date strings, adjusts them if necessary, and returns
 * the end date ensuring it is after the start date.
 * @param {string | undefined} startDateStr - The `startDateStr` parameter is a string representing
 * the start date in the format of "YYYY-MM-DD". It can be undefined if no start date is provided.
 * @param {string | undefined} endDateStr - The `endDateStr` parameter in the `getAdjustedEndDate`
 * function is a string representing the end date. It is an optional parameter, meaning it can be
 * either a valid date string or `undefined`. If provided, the function will use this end date for
 * calculations. If not provided (`undefined`
 * @returns The `getAdjustedEndDate` function returns the adjusted end date based on the provided
 * start date and end date strings. If the start date is after today's date, it is used as is. If the
 * end date is after today's date, it is used as is. If the end date is before the start date or the
 * same as the start date, the end date is adjusted to be one
 */
export const getAdjustedEndDate = (
  startDateString: string | undefined,
  endDateString: string | undefined,
) => {
  const startDate = startDateString
    ? checkIfDateIsGreaterThanToday(parseISO(startDateString))
    : new Date();
  const endDate = endDateString
    ? checkIfDateIsGreaterThanToday(parseISO(endDateString))
    : addDays(startDate, 1);

  return isAfter(startDate, endDate) || isSameDay(startDate, endDate)
    ? addDays(startDate, 1)
    : endDate;
};

/**
 * The function `convertStringToDate` takes a string representing a date and returns a Date object.
 * @param {string} dateString - A string representing a date that you want to convert to a JavaScript
 * Date object.
 */
export const convertStringToDate = (dateString: string) => new Date(dateString);

/**
 * The function `convertDateToString` takes a Date object as input and returns a string representation
 * of the date using the `toDateString` method.
 * @param {Date} date - The `date` parameter is of type `Date`, which represents a specific point in
 * time.
 */
export const convertDateToString = (date: Date) => date.toDateString();

/**
 * The function `formatDateToYearMonthDay` takes a Date object as input and returns a string in the
 * format "YYYY-MM-DD".
 * @param {Date} date - The `formatDateToYearMonthDay` function takes a `Date` object as a parameter.
 * This function formats the given date into a string in the format "YYYY-MM-DD" (year-month-day). If
 * the input date is not valid or not provided, it defaults to the current date.
 * @returns The function `formatDateToYearMonthDay` returns a string in the format "YYYY-MM-DD"
 * representing the year, month, and day of the input date.
 */
export const formatDateToYearMonthDay = (date: Date): string => {
  if (!date || !isValid(date)) {
    date = new Date(); // Use current date if input is invalid
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * The function calculates the number of days between two dates in UTC format.
 * @param {Date} startDate - The starting date in UTC.
 * @param {Date} endDate - The ending date in UTC.
 * @returns The number of days between `startDate` and `endDate` in UTC time.
 */
export const daysBetweenDateRange = (
  startDate: Date,
  endDate: Date,
): number => {
  // Validate and default to current date if invalid
  if (!isValid(startDate)) {
    startDate = new Date();
  }
  if (!isValid(endDate)) {
    endDate = new Date();
  }

  // Calculate the difference in days using date-fns
  const daysDifference = differenceInDays(
    new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      ),
    ),
    new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
    ),
  );

  return Math.abs(daysDifference); // Return the absolute value to avoid negative differences
};

/**
 * The function `formatDateUTC` takes a Date object, checks if it is valid using moment.js, and returns
 * the date in the format "MMM D, YYYY".
 * @param {Date} date - The `formatDateUTC` function takes a `Date` object as a parameter.
 * @returns The function `formatDateUTC` is returning a formatted date string in the format "MMM D,
 * YYYY".
 */
export const formatDateUTC = (date: Date | null | undefined): string => {
  if (!date || !isValid(date)) {
    date = new Date(); // Use the current date if invalid or null
  }

  // Add 1 day (86400 seconds)
  const newDate = add(date, { seconds: 86_400 });

  // Format the date as "MMM D, YYYY"
  return format(newDate, 'MMM d, yyyy');
};

/**
 * Tính số nights và days từ checkin và checkout date
 * @param checkinDate - Ngày check-in (chuỗi ISO)
 * @param checkoutDate - Ngày check-out (chuỗi ISO)
 * @returns { nights: number; days: number } - Số đêm (nights) và số ngày (days)
 * @throws Error nếu checkout date không hợp lệ
 */
export function calculateNightsAndDays(
  checkinDate: string,
  checkoutDate: string,
): { nights: number; days: number } {
  const checkin = parseISO(checkinDate); // Chuyển chuỗi ISO thành Date
  const checkout = parseISO(checkoutDate);

  // Kiểm tra nếu ngày checkout trước hoặc bằng ngày checkin
  if (isBefore(checkout, checkin) || checkin.getTime() === checkout.getTime()) {
    throw new Error('Checkout date must be after checkin date');
  }

  const nights = differenceInDays(checkout, checkin); // Tính số đêm
  const days = nights + 1; // Tính số ngày (nights + 1)

  return { nights, days };
}
