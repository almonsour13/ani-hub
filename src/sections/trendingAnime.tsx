import { TRENDING_ANIME_QUERY } from '../graphQl/queries';
import CardCarousel from '../components/cardCarousel';

const TrendingAnime: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <CardCarousel header_title={"Trending Anime"} query={TRENDING_ANIME_QUERY} />
    </div>
  );
};
export default TrendingAnime;
