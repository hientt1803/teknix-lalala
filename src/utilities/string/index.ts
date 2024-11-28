export const replaceSize = (value: string, size?: string) => {
   return value.replaceAll('{size}', size || '640x400');
};
