import React from 'react';
import { useQuery,OperationVariables } from '@apollo/client';
import { TOP_ANIME_QUERY, UPCOMING_NEXT_SEASON_ANIME_QUERY } from '../graphQl/queries';

const TopAnime: React.FC = () => {
  
const { loading, error, data } = useQuery(TOP_ANIME_QUERY);
  if (loading) return <span className="loading loading-dots loading-xl"></span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="carousel w-full h-auto">
      {data.Page.anime.map((anime:any ) => (
        <div key={anime.id} className="carousel-item w-full relative">
          <div
            style={{ backgroundImage: `url(${anime.bannerImage})` }}
            className="w-full lg:h-96 md:h-72 sm:h-48 h-56 bg-cover bg-center bg-no-repeat relative p-2 animate-bg-slide">
            <div className="absolute z-10 bottom-0 left-0 p-3 py-4 w-full flex flex-col gap-2">
              <h1 className="lg:text-4xl md:2xl text-sm font-bold text-white">{anime.title.english || 'N/A'}</h1>
              <div className="line-clamp-3">
                <p className="leading-none text-sm md:text-base lg:text-md xl:text-lg 2xl:text-2xl text-white">
                  {anime.description || 'No description available'}
                </p>
              </div>
              <div className="flex flex-row"> 
                <button className="btn lg:btn-md btn-sm w-40 p-1 px-3 rounded btn-outline">Watch Now</button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopAnime;