import { TRENDING_ANIME_QUERY } from '../../graphQl/queries';
import CardCarousel from '../../components/common/cardCarousel';

const TrendingAnime: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 lg:w-9/12 w-full mx-auto">
      <CardCarousel header_title={"Trending Anime"} query={TRENDING_ANIME_QUERY} />
    </div>
  );
};
export default TrendingAnime;
