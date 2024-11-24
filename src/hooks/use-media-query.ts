import { useEffect, useState } from 'react';

/**
 * A custom hook for using media queries in Next.js with TypeScript.
 * Handles SSR and ensures performance efficiency by updating only on client side.
 *
 * @param query - The media query string (e.g., "(max-width: 768px)").
 * @returns A boolean indicating if the media query matches.
 */
const useMediaQuery = (query: string): boolean => {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      // Ensure window.matchMedia is available
      if (typeof window === 'undefined' || !window.matchMedia) return;

      const mediaQueryList = window.matchMedia(query);
      const updateMatch = () => setMatches(mediaQueryList.matches);

      // Initial check
      updateMatch();

      // Listen for changes
      mediaQueryList.addEventListener('change', updateMatch);

      return () => {
         mediaQueryList.removeEventListener('change', updateMatch);
      };
   }, [query]);

   return matches;
};

export default useMediaQuery;
