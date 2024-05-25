const SlideCarSkeleton: React.FC = () => {
  return (
    <div className="carousel w-full h-auto">
        <div className="carousel-item w-full relative rounded-none">
          <div className="w-full lg:h-screen h-96 skeleton relative p-2 rounded-none">
            <div className="absolute z-10 bottom-0 left-0 p-3 py-4 w-full flex flex-col justify-center items-center gap-2">
              </div>
          
          </div>
        </div>
    </div>
  );
};
export default SlideCarSkeleton;
