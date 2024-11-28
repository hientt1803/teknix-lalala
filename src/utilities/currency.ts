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
