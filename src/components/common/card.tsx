import React,{ useState, useRef,useEffect } from "react";
import ImageChecker from "../../hooks/imageChecker";
interface CardProps {
  anime: any;
  cardRef: React.RefObject<HTMLDivElement>|null;
  width:string;
  height:string;
}
const Card: React.FC<CardProps> = ({ anime, cardRef,width,height }) => {
  return (
    <a
      href={`/${anime.type.toLowerCase()}/${anime.id}`}
      key={anime.idMal}
      className={`carousel-item group relative flex flex-col gap-2 ${width}`}
    >
      <div
        id="card-item"
        ref={cardRef}
        className={`w-full ${height} rounded bg-accent flex items-center justify-center relative overflow-hidden`}
      >
        <ImageChecker
          imageUrl={anime.coverImage.large.replace("medium", "large")}
          title={anime.title.english || anime.title.native}
          size="h-full w-full"
        />
        <div className="absolute hidden transition-all ease-in-out duration-200 bottom-0 group-hover:bg-opacity- overflow-hidden w-full group-hover:h-full h-0 bg-gradient-to-t from-base-100 via-transparent to-transparent">
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
                {anime.genres.slice(0, 2).map((genre: any, index: number) => (
                  <a key={index} href={`/search/genre`} className="">
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
  );
};


export default Card;
