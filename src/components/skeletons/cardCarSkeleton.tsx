const CardCarSkeleton: React.FC = () => {
  
  return (     
    <>
    <div className="skeleton lg:px-0 px-3 h-6 w-36 rounded"></div>
    <div className="carousel w-full h-auto transition duration-300 gap-3 lg:scroll-px-0 scroll-px-3 lg:px-0 px-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="carousel-item lg:w-44 md:w-40 sm:w-36 w-32 h-auto flex flex-col gap-3">
          <div className="skeleton w-full lg:h-64 md:h-60 sm:h-56 h-48 rounded-md "></div>
          <div className="rounded skeleton h-4 w-92"></div>
        <div className="rounded skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
    <div className="flex flex-row gap-2 lg:px-0 px-3">
      <div className="skeleton h-8 w-10 rounded"></div>
      <div className="skeleton h-8 w-10 rounded"></div>
    </div>
    </>
  );
};
export default CardCarSkeleton;