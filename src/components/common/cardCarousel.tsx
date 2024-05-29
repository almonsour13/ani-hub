import React from "react";
import { useQuery } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CardCarSkeleton from "../skeletons/cardCarSkeleton";
import Card from "./card";
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
      <div className="flex justify-between lg:px-0 px-5 mt-2 lg:text-lg text-md font-bold uppercase">
        <h1>
          {header_title}
        </h1>
        {/* ❯ */}
        <a href="#" className="text-primary">
          See All
        </a>
      </div>
      <div className="w-full relative">
        <div
          className="carousel lg:overflow-hidden w-full h-auto gap-3 lg:scroll-px-0 scroll-px-5 lg:px-0 px-5"
          ref={containerRef}
        >
          {data.Page.anime.map((anime: any, index:number) => (
            <Card anime={anime} cardRef={cardRef} width="lg:w-40 md:w-36 sm:w-32 w-28 h-auto" height="lg:h-56 md:h-52 sm:h-48 h-40"/>
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

export default CardCarousel;
