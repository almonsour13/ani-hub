import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { TOP_ANIME_QUERY } from "../../graphQl/queries";
import SlideCarSkeleton from "../../components/skeletons/slideCarSkeleton";

const TopAnime: React.FC = () => {
  const { loading, error, data } = useQuery(TOP_ANIME_QUERY);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoSwipeInterval, setAutoSwipeInterval] = useState<NodeJS.Timeout | null | undefined>(null);


  let startX: number;
  let endX: number;

  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    endX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX > endX + 50) {
      handleSwipeRight();
    }

    if (startX < endX - 50) {
      handleSwipeLeft();
    }
  };

  const handleSwipeLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      clearInterval(autoSwipeInterval as number | undefined);
    }
  };

  const handleSwipeRight = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
      clearInterval(autoSwipeInterval as number | undefined);
    }
  };
  const handleAutoSwipe = () => {
    if (currentSlide < maxSlide) {
     setCurrentSlide(currentSlide+1)
    }else{
      setCurrentSlide(0)
    }
  };
  useEffect(() => { 
    if (!loading && !error && data && containerRef.current) {

      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const maxSlides = Math.ceil(scrollWidth / containerWidth) - 2;
      setMaxSlide(maxSlides);
      
      container.scrollLeft = currentSlide * containerWidth;
      const slider = container;
      slider.addEventListener("touchstart", handleTouchStart);
      slider.addEventListener("touchmove", handleTouchMove);
      slider.addEventListener("touchend", handleTouchEnd);
      const interval = setInterval(handleAutoSwipe, 10000);
      return () => {
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
        clearInterval(interval);
      };
    }
  }, [currentSlide, loading, error, data]);

  if (loading) return <SlideCarSkeleton />;
  if (error) return <p className="mt-16">Error: {error.message}</p>;

  return (
    <div className="relative" id="top">
      <div className="carousel w-full h-full relative overflow-x-scroll" ref={containerRef}>
          <Slide data={data.Page.anime} />
      </div>
      <div className="absolute z-30 lg:bottom-20 bottom-0 w-full lg:block hidden">
        <div className="lg:w-9/12 w-full lg:px-0 p-3 flex flex-col gap-3 mx-auto">
          <div className="flex gap-2 lg:flex hidden">
            <button
              className={`btn btn-primary btn-sm rounded ${currentSlide !== 0 ? "" : "btn-disabled"}`}
              onClick={handleSwipeLeft}
            >
              ❮
            </button>
            <button
              className={`btn btn-primary btn-sm rounded ${currentSlide !== maxSlide ? "" : "btn-disabled"}`}
              onClick={handleSwipeRight}
            >
              ❯
            </button>
          </div>
          <PaginationBalls
            length={data.Page.anime.length}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </div>
      </div>
    </div>
  );
};



interface PaginationBallsProps {
  length: number;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationBalls: React.FC<PaginationBallsProps> = ({
  length,
  currentSlide,
  setCurrentSlide
}) => {

  return (
    <div className="lg:w-5/12 w-full flex gap-1 ">
      {[...Array(length)].map((_, index) => (
        <button
          key={index}
          className={`lg:h-2 h-1 w-full rounded border border-primary ${
            index <= currentSlide ? "bg-primary" : "btn-outline"
          }`}
          onClick={() => setCurrentSlide(index)}
        ></button>
      ))}
    </div>
  );
};
interface Slide {
  data: any;
}

const Slide: React.FC<Slide> = ({ data }) => {
  return (
    <>
      {data.map((anime: any, index: number) => (
        <div key={anime.id} className="carousel-item w-full relative">
          <div
            style={{
              backgroundImage: `url(${anime.bannerImage})`,
            }}
            className="w-full lg:h-screen md:h-screen h-96 bg-cover bg-center bg-no-repeat relative animate-bg-slide"
          >
            <div className="absolute z-10 bottom-0 w-full h-full flex content-center items-center">
              <div className="w-full">
                <div className="lg:w-9/12 w-full lg:px-0 p-3 flex flex-col gap-2 mx-auto">
                  <h1 className="text-primary font-bold  lg:text-3xl md:text-2xl text-xl">
                    #{index+1}
                  </h1>
                  <h1 className="leading-none lg:text-5xl text-3xl font-bold text-wrap drop-shadow-md">
                    {anime.title.english || "N/A"}
                  </h1>
                  {/* <div className="flex gap-2">
                    <p className="">{anime.format}</p>
                    <p className="">
                      {anime.startDate.year} - {anime.endDate.year || "?"}
                    </p>
                  </div> */}
                  <div className="line-clamp-2 lg:w-8/12">
                    <p
                      dangerouslySetInnerHTML={{ __html: anime.description }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.slice(0,3).map((genre: any, index: number) => (
                      <a
                        href="#"
                        className="btn btn-xs btn-outline rounded-2xl btn-primary rounded"
                      >
                        {genre}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-row align-center gap-0 mt-1">
                    <button className="btn lg:btn-sm btn-sm w-auto px-4 rounded-2xl btn-primary flex flex-row align-center justify-center mr-2">
                      <svg
                        className="fill-current lg:h-5 lg:w-85 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#e8eaed"
                      >
                        <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                      <p className="lg:text-md md:text-lg md:text-sm text-sm">
                        {anime.type === "ANIME" ? "Watch Now" : "Read Now"}
                      </p>
                    </button>
                    <a
                      href={`/${anime.type.toLowerCase()}/${anime.id}`}
                      className="btn lg:btn-sm btn-sm btn-outline btn-primary w-auto px-4 rounded-2xl flex flex-row align-center justify-center"
                    >
                      <svg
                        className="fill-current lg:h-5 lg:w-85 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                      <p className="lg:text-md md:text-lg md:text-sm text-sm">
                        Details
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*     <div className="absolute z-1 h-full inset-0 bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>*/}
            <div className="absolute z-1 h-full w-full bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
            <div className="absolute z-1 h-full w-full bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>
            <div className="absolute z-1 h-full w-full bg-base-100 top-0 left-0 opacity-70"></div>
          </div>
        </div>
      ))}
    </>
  );
};
export default TopAnime;
