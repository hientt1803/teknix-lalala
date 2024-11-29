/**
 * The function `calculateKilometers` converts meters to kilometers and returns the result with 3
 * decimal places followed by "km".
 * @param {number} meters - The `meters` parameter in the `calculateKilometers` function represents the
 * distance in meters that you want to convert to kilometers.
 * @returns The function `calculateKilometers` takes in a number of meters, converts it to kilometers
 * by dividing by 1000, formats the result to 3 decimal places, and returns a string in the format
 * `${kilometers.toFixed(3)} km`.
 */
export function calculateKilometerDistance(meters: number | string): string {
   const distanceInMeters = Number(meters);

   if (distanceInMeters >= 500) {
      const kilometers = distanceInMeters / 1000;
      return `${kilometers.toFixed(1)} km`;
   } else {
      return `${distanceInMeters.toFixed(0)} m`;
   }
}
