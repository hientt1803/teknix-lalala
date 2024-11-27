import {parse, differenceInDays, format, addHours, isSameDay} from "date-fns";

// Function to count total days in a given date range with yyyy/mm/dd format
export const countTotalDaysInRange = (startDate: string, endDate: string): number => {
    const format = "yyyy-MM-dd"; // Date format yyyy/mm/dd

    // Parse the date strings into Date objects
    const start = parse(startDate, format, new Date());
    const end = parse(endDate, format, new Date());

    // Calculate the difference in days
    return differenceInDays(end, start); // +1 to include both start and end dates
};

export const formatTime = (timeString: string): string => {
    // Parse the time string into a Date object
    const parsedTime = parse(timeString, "HH:mm:ss", new Date());
    // console.log(parsedTime);

    // Format the time to 'h:mm a' (e.g., '7:00 AM', '8:00 PM')
    return format(parsedTime, "HH:mm a");
};

export function timeFormatString(arriveTime: string) {
    // Tách chuỗi nếu có chứa ký tự đặc biệt "Oct" hoặc bất kỳ chữ cái nào
    const timePart = arriveTime.split(" ")[0];

    // Đảm bảo định dạng hh:mm có đúng 5 ký tự
    let formattedTime = timePart.length === 5 ? timePart : timePart.substring(0, 5);

    // Thêm ":00" cho giây
    return `${formattedTime}:00`;
}

export const formatDateMonth = (value: string | Date) => {
    return format(value, "MMM dd");
};


export function generateTimeSlotsFromNow(
    startTime: string,
    maxSlots: number = 20,
    intervalHours: number = 1
): string[] {
    const slots: string[] = [];
    const startDate = new Date(startTime);

    for (let i = 0; i < maxSlots; i++) {
        const slotDate = addHours(startDate, i);

        // Kiểm tra xem ngày có trùng với ngày bắt đầu hay không
        const formattedTime = isSameDay(startDate, slotDate)
            ? format(slotDate, "HH:mm")
            : format(slotDate, "HH:mm MMM d");

        slots.push(formattedTime);
    }

    return slots;
}

