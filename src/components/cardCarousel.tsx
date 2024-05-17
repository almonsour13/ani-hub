import React from "react";
import { useQuery } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CardCarSkeleton from "./skeletons/cardCarSkeleton";

interface CardCarouselProps {
  header_title: any;
  query: any;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ header_title, query }) => {
  const { loading, error, data } = useQuery(query);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !error && data && containerRef.current && cardRef.current) {
      const width = cardRef.current.clientWidth;
      const container = containerRef.current;
      container.scrollLeft = currentSlide * (width + 12);
      console.log(data)
    }
  }, [currentSlide, loading, error, data]);

  const handleSwipeLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentSlide < data.Page.anime.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (loading) return <CardCarSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-between lg:px-0 px-3 mt-2 ">
        <h1 className="lg:text-2xl md:text-lg text-md font-bold">
          {header_title}
        </h1>
        <a className="text-md font-bold">❯</a>
      </div>
      <div className="w-full relative  mt-2">
        <div
          className="carousel w-full h-auto gap-3 lg:scroll-px-0 scroll-px-3 lg:px-0 px-3"
          ref={containerRef}
        >
          {data.Page.anime.map((anime: any) => (
            <Link
              to={`/${anime.type.toLowerCase()}/${anime.id}`}
              key={anime.idMal}
              className="carousel-item lg:w-44 md:w-40 sm:w-36 w-32 h-auto flex flex-col gap-2"
            >
                <div ref={cardRef} className="w-full lg:h-64 md:h-60 sm:h-56 h-48 rounded-md bg-accent flex items-center justify-center relative">
                  <ImageChecker
                    imageUrl={anime.coverImage.large.replace('medium','large')}
                    title={anime.title.english || anime.title.native}
                  />
                  <div className="absolute left-0 rounded-bl bottom-0 w-auto z-10 p-1">
                  <p className="font-bold text-xs drop-shadow-xl">
                    {anime.format === "MANGA"
                      ? anime.countryOfOrigin === "JP"
                        ? "Manga"
                        : anime.countryOfOrigin === "KR"
                          ? "Manhwa"
                          : "Manhua"
                      : anime.format}
                  </p>
                  </div>
                  <div className="absolute z-1 h-full inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-50"></div>
                </div>
                <div className=" p-0 bg-transparent">
                  <div className="line-clamp-2">
                    <p className="xl:text-base lg:text-sm md:text-sm text-xs font-bold shadow-black">
                      {anime.title.english || anime.title.native}
                    </p>
                  </div>
                </div>
        
            </Link>
          ))} 
          </div>
        <div className="absolute z-10 lg:w-48 md:w-44 sm:w-40 w-20 h-full  right-0 top-0  bg-gradient-to-l from-base-100 via-transparent to-transparent"></div>
      </div>
      {data.Page.anime.length ? (
        <div className="lg:flex md:flex hidden gap-2 lg:ml-0 ml-3">
          <button
            className={`btn btn-primary btn-sm p-2 px-4 rounded ${currentSlide == 0 ? "btn-disabled" : ""}`}
            onClick={handleSwipeLeft}
          >
            ❮
          </button>
          <button
            className={`btn btn-primary btn-sm p-2 px-4 rounded ${currentSlide === data.Page.anime.length - 2 ? "btn-disabled" : ""}`}
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
const ImageChecker: React.FC<{ imageUrl:string; title: string }> = ({
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
 
    img.src = imageUrl.replace('large','medium');
  };
checkImageExists()
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
