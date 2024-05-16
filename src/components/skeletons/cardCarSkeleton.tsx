const CardCarSkeleton: React.FC = () => {
  
  return (     
    <>
    <div className="skeleton ml-3 h-6 w-36 rounded"></div>
    <div className="carousel w-full h-auto transition duration-300 gap-3 scroll-px-3 px-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="carousel-item lg:w-1/6 md:w-1/5 sm:w-1/4 w-1/3 flex flex-col gap-2">
          <div className="skeleton w-full lg:h-80 md:h-64 sm:h-60 xs:h-44 h-40 rounded-md "></div>
          <div className="rounded skeleton h-4 w-92"></div>
        <div className="rounded skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
    </>
  );
};
export default CardCarSkeleton;