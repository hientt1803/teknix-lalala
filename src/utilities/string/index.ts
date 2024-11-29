/**
 * The `replaceSize` function replaces occurrences of `{size}` in a string with a specified size value
 * or a default size of '640x400'.
 * @param {string} value - The `value` parameter is a string that may contain the placeholder `{size}`
 * which needs to be replaced with the actual size value.
 * @param {string} [size] - The `size` parameter in the `replaceSize` function is an optional parameter
 * that represents the size value that you want to replace in the `value` string. If a `size` value is
 * provided when calling the function, it will replace all occurrences of `{size}` in the `value`
 * @returns The `replaceSize` function is being returned. It takes a `value` string and an optional
 * `size` string parameter. It replaces any occurrence of '{size}' in the `value` string with the
 * provided `size` parameter or '640x400' if no `size` parameter is provided.
 */
export const replaceSize = (value: string, size?: string) => {
   return value.replaceAll('{size}', size || '640x400');
};

/* The `convertKebabToTitleCase` function is taking a string in kebab-case
format (words separated by hyphens) and converting it to title case format
(each word capitalized with spaces between words). */
export const convertKebabToTitleCase = (str: string): string => {
   if (!str) return '';
   return str
      .split('-') // Split the string by the hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with a space
};

/* The `convertSnakeToTitleCase` function takes a string in snake_case
format (words separated by underscores) and converts it to title case 
(each word capitalized with spaces between words). */
export const convertSnakeToTitleCase = (str: string): string => {
   if (!str) return '';
   return str
      .split('_') // Split the string by underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words with a space
};

/**
 * The function `convertToTitleCase` takes a string with words separated by underscores and converts it
 * to title case.
 * @param {string} input - The `convertToTitleCase` function takes a string input in snake_case format
 * and converts it to title case format.
 * @returns The `convertToTitleCase` function takes a string input and converts it to title case, where
 * the first letter of each word is capitalized and the rest are in lowercase. The function splits the
 * input string by underscores, capitalizes the first letter of the first word, and converts the rest
 * of the words to lowercase. Finally, it joins the words back together with spaces and returns the
 * resulting title case
 */
export function convertToTitleCase(input: string): string {
   return input
      .split('_')
      .map((word, index) =>
         index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase(),
      )
      .join(' ');
}
