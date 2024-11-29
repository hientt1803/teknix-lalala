const Loading = () => {
   return (
      <div className="fixed overflow-hidden z-[999] bg-zinc-900/20 top-0 left-0 min-w-full h-screen flex justify-center items-center">
         <div className="spinner">
            <div className="spinner1" />
         </div>
      </div>
   );
};

export default Loading;
