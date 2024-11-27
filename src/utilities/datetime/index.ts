import { parse, differenceInDays, format, addHours, isSameDay, addDays, toDate } from 'date-fns';

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
export const countTotalDaysInRange = (startDate: string, endDate: string): number => {
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
   let formattedTime = timePart.length === 5 ? timePart : timePart.substring(0, 5);

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

   for (let i = 0; i < maxSlots; i++) {
      const slotDate = addHours(startDate, i);

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
   currentDate: Date = new Date()
): Date => {
   const parsedDate = date ? toDate(date) : fallbackDate;
   return parsedDate < currentDate ? fallbackDate : parsedDate;
};

export const formatDateMMM = (date: Date | string): string => {
   return format(date, "MMM d");
};

export const formatDated = (date: Date | string): string => {
   return format(date, "d");
};
