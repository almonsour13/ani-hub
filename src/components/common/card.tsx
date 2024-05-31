import React,{ useState, useRef,useEffect } from "react";

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
                {anime.genres.slice(0, 2).map((genre: any, index: number) => (
                  <a href={`/search/genre`} className="">
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

const ImageChecker: React.FC<{ imageUrl: string; title: string }> = ({
  imageUrl,
  title,
}) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  return (
    <>
      {error ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm40-337 160-160 160 160 160-160 40 40v-183H200v263l40 40Zm-40 257h560v-264l-40-40-160 160-160-160-160 160-40-40v184Zm0 0v-264 80-376 560Z" />
        </svg>
      ) : (
        <img
          className="h-full w-full rounded object-cover"
          src={imageUrl.replace("large", "medium")}
          alt={title}
          onError={onError}
          loading="lazy"
        />
      )}
    </>
  );
};



export default Card;
