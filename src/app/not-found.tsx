import { Metadata, ResolvingMetadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import Link from 'next/link';

const ebGaramond = EB_Garamond({
   subsets: ['latin'],
   weight: ['400', '700'],
});

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
   const { description } = await parent;

   return {
      title: 'Not found - Lalala - you found a sceret page !!!',
      description: description,
      openGraph: {
         images: '/assets/favicon/lalala.svg',
         title: ' Not found',
         description: description || 'Lalala Not found page',
         url: `/not-found`,
         locale: 'en-US',
         siteName: 'Not found',
         type: 'website',
      },
      alternates: {
         canonical: `/not-found`,
      },
      twitter: {
         title: 'Not found page',
         description: 'Lalala Not found page',
         card: 'summary_large_image',
      },
   };
}

const NotFound = () => {
   return (
      <div
         className={`relative transition-all min-h-screen flex justify-center items-center flex-col gap-3 bg-gradient-to-r from-[#fff] via-[#f6f6f6] to-[#ebebeb] ${ebGaramond.className}`}
      >
         <div className="relative flex justify-center items-center">
            {/* Center the 404 text */}
            <span
               className="absolute text-[15rem] sm:text-[20rem] md:text-[30rem] lg:text-[45rem] text-white font-extrabold flex gap-0"
               style={{
                  WebkitTextStroke: '0.4px #bdbdbd',
                  fontFamily: ebGaramond.className,
               }}
            >
               <span>40</span>
               <span style={{ transform: 'scaleX(-1)' }}>4</span>
            </span>

            {/* Content below the 404 text */}
            <div className="relative z-10 text-center">
               <div className="hidden md:block blockquote-style absolute top-[40%] left-[20%] italic h-fit font-thin fw-[400] text-start text-neutral-500 text-6xl">
                  found <br /> or <br />
                  <strong className="text-black"> not found</strong>
               </div>

               <Link href="/">
                  <div className="relative max-w-[540px] mt-[50rem] uppercase font-mono font-bold text-center group">
                     <div className="text-neutral-600 font-medium text-lg">
                        What about trying to go to another page?
                     </div>
                     <span className="block h-[2px] w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full mt-1"></span>
                  </div>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default NotFound;
