import React from "react";
import { useQuery } from "@apollo/client";
import {
  TOP_ANIME_QUERY
} from "../graphQl/queries";
import SlideCarSkeleton from "../components/skeletons/slideCarSkeleton";

const TopAnime: React.FC = () => {
  const { loading, error, data } = useQuery(TOP_ANIME_QUERY);
  if (loading) return <SlideCarSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="">
      <div className="carousel w-full h-auto">
        {data.Page.anime.map((anime: any) => (
          <div key={anime.id} className="carousel-item w-full relative">
            <div
              style={{
                backgroundImage: `url(${anime.bannerImage})`
              }}
              className="w-full lg:h-96 md:h-88 h-64 bg-cover bg-center bg-no-repeat relative p-2 animate-bg-slide"
            >
              <div className="absolute z-10 bottom-0 left-0 p-3 py-4 w-full flex flex-col gap-2">
                <h1 className="leading-none lg:text-4xl md:text-2xl text-2xl font-bold text-wrap drop-shadow-md">
                  {anime.title.english || "N/A"}
                </h1>
                <p className="leading-none text-xs">{anime.format}</p>
                <p className="leading-none text-xs">{anime.startDate.year} - {anime.endDate.year || "?"}</p>
                <div className="flex flex-wrap">
                  {anime.genres.map((genre: any,index:number) => (
                    <a href="#" className={`mr-1 pr-1 leading-none text-xs md:text-base lg:text-md xl:text-lg 2xl:text-2xl ${index !== anime.genres.length-1?'border-r':"border-none"} border-primary`}>
                      {genre}
                    </a>
                  ))}
                </div>
                <div className="flex flex-row align-center gap-1 ">
                  <button className="btn lg:btn-md btn-sm lg:w-56 w-auto px-3 rounded btn-primary flex flex-row align-center justify-center">
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>{anime.type === "ANIME"?
                    "Watch Now":"Read Now"}
                  </button>
                  <label className="swap p-0">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                      className="swap-off fill-current w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                      className="swap-on fill-current w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                    </svg>
                  </label>
                </div>
              </div>
         {/*     <div className="absolute z-1 h-full inset-0 bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>*/}
                <div className="absolute z-1 h-full inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
        <div className="absolute z-1 h-full w-full bg-base-100 top-0 left-0 opacity-70"></div>
                         
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAnime;
