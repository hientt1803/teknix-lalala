const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen min-w-full items-center justify-center overflow-hidden bg-zinc-900/20">
      <div className="spinner">
        <div className="spinner1" />
      </div>
    </div>
  );
};

export default Loading;
