import { useState,useEffect } from "react";
import Filter from "./filter";
import Header from "../../components/layout/header";
import { useParams,useLocation } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { SEARCH_ANIME_QUERY } from "../../graphQl/queries"; // Adjust the import path as needed
import Card from "../../components/common/card";

const GetQueryParams = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
    const [keyWord,setKeyWord] = useState("")
    const query = GetQueryParams();
    const searchKeyword = query.get("keyword");
    useEffect(() => {
        if (searchKeyword) {
            setKeyWord(searchKeyword);
        }
    }, [searchKeyword]);

    const showFilterBtn = () => {
        var filterWrapper = document.querySelector("#filter-wrapper");
        if(filterWrapper){
            if (filterWrapper.classList.contains("hidden")) {
                filterWrapper.classList.remove("hidden");
                filterWrapper.classList.add("block");
            } else {
                filterWrapper.classList.remove("block");
                filterWrapper.classList.add("hidden");
            }
        }
    };

    return (
        <>
            <Header />
            <div className="w-full h-full p-5 mt-16">
                <div className="lg:w-9/12 md:w-11/12 sm:w-11/12 w-12/12 mx-auto flex flex-col gap-3">
                    <div className="w-full h-auto lg:block hidden" id="filter-wrapper">
                        <Filter />
                    </div>
                    <div className="flex justify-between text-xl font-semibold gap-2">
                        <div className="flex gap-2">
                            <p>Search:</p>
                            <p className="text-primary">{keyWord}</p>
                        </div>
                        <button className="lg:hidden" onClick={showFilterBtn}>
                            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/>
                            </svg>
                        </button>
                    </div>
                    <SearchResult/>
                </div>
            </div>
        </>
    );
};
const SearchResult = () => {
  const [keyWord, setKeyWord] = useState("");
  const query = GetQueryParams();
  const searchKeyword = query.get("keyword");
  const { loading, error, data } = useQuery(SEARCH_ANIME_QUERY, {
    variables: { searchValue: keyWord },
    skip: !keyWord,
  });

  useEffect(() => {
    if (searchKeyword) {
      setKeyWord(searchKeyword);
    }
  }, [searchKeyword]);

  if (loading) return <div className="w-full h-auto">Loading...</div>;
  if (error) return <div className="w-full p-3 rounded bg-base-100 bg-opacity-90">Error: {error.message}</div>;

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 xl:gap-5 lg:gap-5 md:gap-4 gap-4">
      {keyWord && data.Page.media.length !== 0 ? (
        data.Page.media.map((anime: any) => (
            <Card anime={anime} cardRef={null} width="w-full" height="xl:h-60 lg:h-56 md:h-56 sm:h-52 h-52"/>
        ))
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
};


export default SearchPage;
