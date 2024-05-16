import React from 'react';
import TopAnime from '../sections/topAnime'
import TrendingAnime from '../sections/trendingAnime'
import TrendingManga from '../sections/trendingManga'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-7">
      <TopAnime/>
      <TrendingAnime/>
      <TrendingManga/>
    </div>
  );
};
export default Home;
