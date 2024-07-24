import React from 'react';
import TopAnime from '../page/sections/topAnime'
import TrendingAnime from './sections/trendingAnime'
import TrendingManga from './sections/trendingManga'
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-7 relative">
      <Header/>
      <TopAnime/>
       <TrendingAnime/>
      <TrendingManga/>
      <Footer/>
    </div>
  );
};
export default Home;
