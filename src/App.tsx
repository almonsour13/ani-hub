import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './page/home';
import PageDetails from './page/pageDetails/pageDetails';
import SearchPage from './page/searchPage/searchPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/anime/:id" element={<PageDetails/>} />
          <Route path="/manga/:id" element={<PageDetails/>} />
          <Route path="/search/" element={<SearchPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
