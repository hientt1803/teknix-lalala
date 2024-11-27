/**
 * Định dạng tiền tệ toàn cầu với khả năng thay thế ký hiệu tùy chỉnh cho một số loại tiền tệ.
 * @param amount - Số tiền cần định dạng (có thể là số hoặc chuỗi).
 * @param currencyCode - Mã tiền tệ theo tiêu chuẩn ISO 4217 (ví dụ: "USD", "EUR", "VND").
 * @param locale - Định dạng theo ngôn ngữ/lãnh thổ, mặc định là 'vi-VN'.
 * @param customSymbolMap - Đối tượng ánh xạ mã tiền tệ với ký hiệu tùy chỉnh (nếu có).
 * @returns Chuỗi số tiền đã được định dạng.
 */
export const formatCurrency = (
    amount: number | string,
    currencyCode: string = "VND",
    locale: string = "vi-VN",
    customSymbolMap: {[key: string]: string} = {VND: "VND"}
): string => {
    const formattedAmount = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(amount));

    // Kiểm tra xem có ký hiệu tùy chỉnh cho mã tiền tệ không
    const customSymbol = customSymbolMap[currencyCode];

    // Nếu có, thay thế ký hiệu mặc định bằng ký hiệu tùy chỉnh
    return customSymbol
        ? formattedAmount.replace(new RegExp(`[\\p{Sc}]`, "gu"), customSymbol) // Thay thế tất cả ký hiệu tiền tệ mặc định
        : formattedAmount;
};
