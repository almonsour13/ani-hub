import {TRENDING_ANIME_QUERY, } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const TrendingAnime: React.FC = () => {
  const { loading, error, data } = useQuery(TRENDING_ANIME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
    <h1 className="ml-3 mb-1">Trending Anime</h1>
    <div className="carousel w-full h-auto">
{data.Page.anime.map((anime: any, index: number) => (
  <div key={anime.id} className="carousel-item lg:w-1/6 md:w-1/5  sm:w-1/4 w-1/3 flex flex-col ml-3 gap-1">
    <img src={anime.coverImage.large.replace('medium','large')} className="w-full lg:h-80 md:h-64 sm:h-60 h-64 rounded-md object-cover mx-3 my-2" alt={anime.title.english} />
    <div className="line-clamp-2">
     <p className="leading-none text-xs md:text-base lg:text-xs xl:text-lg  mx-3">{anime.title.english?anime.title.english:anime.title.native}</p>
     </div>
  </div>
))}

    </div> 
    </div>
  );  
};
export default TrendingAnime;