import React from "react";
import { useQuery } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CardCarSkeleton from "../skeletons/cardCarSkeleton";

interface CardCarouselProps {
  header_title: any;
  query: any;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ header_title, query }) => {
  const { loading, error, data } = useQuery(query);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [maxSlide, setMaxSlide] = useState(0);

  useEffect(() => {
    if (!loading && !error && data && containerRef.current && cardRef.current) {
      const container = containerRef.current;
      const cardWidth = cardRef.current.clientWidth;
      const containerWidth = container.clientWidth-(cardWidth/2);
      const scrollWidth = container.scrollWidth;
      const maxSlides = Math.ceil(scrollWidth / containerWidth) - 1;
      setMaxSlide(maxSlides);
      container.scrollLeft = currentSlide * (containerWidth-48);
    }
  }, [currentSlide, loading, error, data]);

  const handleSwipeLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (loading) return <CardCarSkeleton />;
  if (error) return <CardCarSkeleton />;

  return (
    <>
      <div className="flex justify-between lg:px-0 px-3 mt-2 lg:text-lg text-md font-bold uppercase">
        <h1>
          {header_title}
        </h1>
        {/* ❯ */}
        <a href="#">
          See All
        </a>
      </div>
      <div className="w-full relative">
        <div
          className="carousel lg:overflow-hidden w-full h-auto gap-3 lg:scroll-px-0 scroll-px-3 lg:px-0 px-3"
          ref={containerRef}
        >
          {data.Page.anime.map((anime: any, index:number) => (
            <a
              href={`/${anime.type.toLowerCase()}/${anime.id}`}
              key={anime.idMal}
              className="carousel-item group relative lg:w-40 md:w-36 sm:w-32 w-28 h-auto flex flex-col gap-2"
            >
              <div
                ref={cardRef}
                className="w-full lg:h-56 md:h-52 sm:h-48 h-40 rounded bg-accent flex items-center justify-center relative overflow-hidden"
              >
                <ImageChecker
                  imageUrl={anime.coverImage.large.replace("medium", "large")}
                  title={anime.title.english || anime.title.native}
                />
                <div className="absolute lg:block hidden transition-all ease-in-out duration-200 bottom-0 group-hover:bg-opacity- overflow-hidden w-full group-hover:h-full h-0 bg-gradient-to-t from-base-100 via-transparent to-transparent">
                  <div className="-w-full h-full flex items-end bg-gradient-to-t from-base-100 via-transparent to-transparent bg-opacity-60"> 
                    <div className="flex flex-col gap-1 p-2 text-xs">
                      <div className="w-full flex gap-1 text-primary uppercase">
                        <p>
                          {anime.format === "MANGA"
                            ? anime.countryOfOrigin === "JP"
                              ? "Mga"
                              : anime.countryOfOrigin === "KR"
                                ? "Mwa"
                                : "Mua"
                            : anime.format}
                        </p>
                        <p>{anime.startDate.year}</p>
                      </div>
                      <div className="w-full flex gap-2 tracking-wide">
                        {anime.genres
                            .slice(0, 2)
                            .map((genre: any, index: number) => (
                              <a
                                href={`/search/genre`}
                                className=""
                              >
                                {genre}
                              </a>
                          ))}
                      </div>
                    </div>  
                  </div>   
                </div>
              </div>
              <div className=" p-0 bg-transparent">
                <div className="w-full line-clamp-2">
                  <p className="group-hover:text-primary lg:text-sm md:text-sm text-xs lg:font-semibold tracking-wide shadow-black">
                    {anime.title.english || anime.title.native}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className={`absolute z-10 lg:w-48 md:w-44 sm:w-40 w-20 h-full top-0 opacity-90 ${currentSlide != maxSlide?"bg-gradient-to-l right-0":"bg-gradient-to-r left-0"} transition from-base-100 via-transparent to-transparent`}></div>
      </div>
      {data.Page.anime.length ? (
        <div className="lg:flex md:flex hidden gap-2 lg:px-0 px-3">
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
      ) : (
        ""
      )}
    </>
  );
};
{
  /*<div className="w-full lg:h-80 md:h-64 sm:h-60 xs:h-44 h-40 rounded-md bg-primary">{response}</div>*/
}
const ImageChecker: React.FC<{ imageUrl: string; title: string }> = ({
  imageUrl,
  title,
}) => {
  const [imageExists, setImageExists] = useState<boolean>(true);
  const checkImageExists = () => {
    const img = new Image();
    img.onload = () => {
      setImageExists(true);
    };
    img.onerror = () => {
      setImageExists(false);
    };

    img.src = imageUrl.replace("large", "medium");
  };
  checkImageExists();
  return (
    <>
      {imageExists ? (
        <img
          className="h-full w-full rounded object-cover"
          src={imageUrl}
          onLoad={checkImageExists}
          onError={checkImageExists}
          alt={title}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm40-337 160-160 160 160 160-160 40 40v-183H200v263l40 40Zm-40 257h560v-264l-40-40-160 160-160-160-160 160-40-40v184Zm0 0v-264 80-376 560Z" />
        </svg>
      )}
    </>
  );
};

export default CardCarousel;
