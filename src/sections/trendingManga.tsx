import { TRENDING_MANGA_QUERY } from '../graphQl/queries';
import CardCarousel from '../components/cardCarousel';

const TrendingManga: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 lg:w-10/12 w-full mx-auto relative">
      <CardCarousel header_title={"Trending Manga"} query={TRENDING_MANGA_QUERY} />
    </div>
  );
};
export default TrendingManga;
