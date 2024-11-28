/**
 * Định dạng tiền tệ với mã tiền tệ làm đuôi hiển thị đơn vị.
 * @param amount - Số tiền cần định dạng (có thể là số hoặc chuỗi).
 * @param currencyCode - Mã tiền tệ theo tiêu chuẩn ISO 4217 (ví dụ: "USD", "EUR", "VND").
 * @returns Chuỗi số tiền đã được định dạng với mã tiền tệ làm đuôi.
 */
export const formatCurrency = (
   amount: number | string,
   currencyCode: string = 'VND',
   locale: string = 'vi-VN',
   customSymbolMap: { [key: string]: string } = { VND: 'VND' },
): string => {
   const formattedAmount = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(Number(amount));

   // Kiểm tra xem có ký hiệu tùy chỉnh cho mã tiền tệ không
   const customSymbol = customSymbolMap[currencyCode];

   // Nếu có, thay thế ký hiệu mặc định bằng ký hiệu tùy chỉnh
   return customSymbol
      ? formattedAmount.replace(new RegExp(`[\\p{Sc}]`, 'gu'), customSymbol) // Thay thế tất cả ký hiệu tiền tệ mặc định
      : formattedAmount;
};
/**
 * Định dạng tiền tệ với mã tiền tệ làm đuôi hiển thị đơn vị.
 * @param amount - Số tiền cần định dạng (có thể là số hoặc chuỗi).
 * @param currencyCode - Mã tiền tệ theo tiêu chuẩn ISO 4217 (ví dụ: "USD", "EUR", "VND").
 * @returns Chuỗi số tiền đã được định dạng với mã tiền tệ làm đuôi.
 */
export const formatCurrencyWithCodeAsSuffix = (
   amount: number | string,
   currencyCode?: string | 'VND',
): string => {
   const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

   if (isNaN(parsedAmount)) {
      throw new Error('Invalid amount. Please provide a valid number.');
   }

   const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(parsedAmount);

   return `${formattedAmount} ${currencyCode == '' ? 'VND' : currencyCode}`;
};
