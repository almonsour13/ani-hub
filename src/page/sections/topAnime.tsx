import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { TOP_ANIME_QUERY } from "../../graphQl/queries";
import SlideCarSkeleton from "../../components/skeletons/slideCarSkeleton";

const TopAnime: React.FC = () => {
  const { loading, error, data } = useQuery(TOP_ANIME_QUERY);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSwipeIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSwipeRight = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };
  useEffect(() => {
    if (!loading && data && containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const maxSlides = Math.ceil(scrollWidth / containerWidth) - 2;
      setMaxSlide(maxSlides);

      if (autoSwipeIntervalRef.current) {
        clearInterval(autoSwipeIntervalRef.current);
      }
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev < maxSlides ? prev + 1 : 0));
      }, 5000);
      autoSwipeIntervalRef.current = interval;

      container.scrollLeft = currentSlide * container.clientWidth;
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        if (autoSwipeIntervalRef.current) {
          clearInterval(autoSwipeIntervalRef.current);
        }
      };
    }
  }, [currentSlide, loading, data]);

  if (loading) return <SlideCarSkeleton />;
  if (error) return <p className="mt-16">Error: {error.message}</p>;

  return (
    <div className="relative" id="top">
      <div
        className="carousel w-full h-full relative scroll-smooth overflow-hidden"
        ref={containerRef}
      >
        <Slide data={data.Page.anime} />
      </div>
      <div className="absolute z-30 lg:bottom-28 bottom-0 w-full">
        <div className="lg:w-9/12 w-full lg:px-0 px-5 flex flex-col items-start gap-3 mx-auto relative">
          {/* {`${currentSlide+1}/${maxSlide+1}`} */}
          <div className="flex gap-2 lg:flex">
            <button
              className={`btn btn-primary btn-sm rounded ${currentSlide !== 0 ? "" : "btn-disabled"}`}
              onClick={handleSwipeLeft}
            >
              ❮
            </button>
            <button
              className={`btn btn-primary btn-sm rounded ${currentSlide !== maxSlide ? "" : ""}`}
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
  setCurrentSlide,
}) => {
  return (
    <div className="w-full flex gap-1">
      {[...Array(length)].map((_, index) => (
        <button
          key={index}
          className={`h-0.5 w-full ${
            index <= currentSlide ? "bg-primary" : "bg-base-100"
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
            className="w-full lg:h-screen md:h-screen h-80 bg-cover bg-center bg-no-repeat relative animate-bg-slide"
          >
            <div className="absolute z-10 lg:bottom-0 bottom-0 w-full lg:h-full flex justify-center items-center">
              <div className="w-full">
                <div className="lg:w-9/12 w-full lg:px-0 p-5 flex flex-col gap-2 mx-auto">
                  <h1 className="leading-none text-primary font-bold lg:text-2xl md:text-2xl text-sm">
                    #{index + 1} Top
                  </h1>
                  <h1 className="leading-none lg:text-5xl text-2xl font-bold text-wrap drop-shadow-md">
                    {anime.title.english || "N/A"}
                  </h1>
                  <div className="flex flex-wrap gap-2 leading-none text-xs lg:flex">
                    <p>{anime.startDate.year}</p>
                    <p>{anime.averageScore}</p>
                    <p>{anime.status}</p>
                  </div>
                  <div className="lg:flex md:flex flex-wrap gap-2 hidden">
                    {anime.genres
                      .slice(0, 3)
                      .map((genre: any, index: number) => (
                        <a
                          href={`/search?Genre=${genre}`}
                          className="btn btn-xs btn-primary btn-outline rounded-2xl"
                        >
                          {genre}
                        </a>
                      ))}
                  </div>
                  <div className="lg:line-clamp-2 md:line-clamp-2 line-clamp-3 lg:w-10/12 hidden">
                    <p
                      dangerouslySetInnerHTML={{ __html: anime.description }}
                    />
                  </div>
                  <div className="flex flex-row align-center gap-2">
                    <button className="btn lg:btn-sm btn-sm w-auto rounded-2xl btn-primary">
                      <svg
                        className="fill-current lg:h-5 lg:w-85 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#e8eaed"
                      >
                        <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                      <p className="">
                        {anime.type === "ANIME" ? "Watch Now" : "Read Now"}
                      </p>
                    </button>
                    <a
                      href={`/${anime.type.toLowerCase()}/${anime.id}`}
                      className="btn lg:btn-sm btn-sm btn-primary rounded-2xl"
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
                      <p className="">Details</p>
                    </a>
                    <button className="btn lg:btn-sm btn-sm rounded-full btn-primary">
                      <svg
                        className="fill-current lg:h-5 lg:w-85 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*     <div className="absolute z-1 h-full inset-0 bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>*/}
            <div className="absolute z-1 h-full w-full bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
            <div className="absolute z-1 h-full w-full bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>
            <div className="absolute z-1 h-full w-full bg-base-200 top-0 left-0 opacity-70"></div>
          </div>
        </div>
      ))}
    </>
  );
};
export default TopAnime;
