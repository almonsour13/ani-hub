import { useState, useEffect } from "react";
import Filter from "./filter";
import Header from "../../components/layout/header";
import { useLocation } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { SEARCH_ANIME_QUERY } from "../../graphQl/queries"; // Adjust the import path as needed
import Card from "../../components/common/card";
import { useUrlState } from "../../hooks/UrlContext";

const GetQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = GetQueryParams();
  const searchKeyword = query.get("keyword");
  const [keyWord, setKeyWord] = useState(searchKeyword || "");
  useEffect(() => {
    if (searchKeyword) {
      setKeyWord(searchKeyword);
    }
  }, [searchKeyword]);

  const showFilterBtn = () => {
    var filterWrapper = document.querySelector("#filter-wrapper");
    if (filterWrapper) {
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
      <div className="w-full h-full mt-16">
        <div className="lg:w-9/12 md:w-11/12 sm:w-11/12 w-12/12 mx-auto flex flex-col gap-5 lg:px-0 px-5 p-2">
          <div className="w-full h-auto lg:block hidden" id="filter-wrapper">
            <Filter />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xl font-semibold gap-2">
              <div className="flex gap-2">
                <p>{keyWord ? "Search Results for: " : "Filter Result:"}</p>
                <p className="text-primary">{keyWord}</p>
              </div>
              <button className="lg:hidden" onClick={showFilterBtn}>
                <svg
                  className="fill-current h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
                </svg>
              </button>
            </div>
            <SearchResult />
          </div>
        </div>
      </div>
    </>
  );
};
const SearchResult: React.FC = () => {
  const location = useLocation();
  const [variables, setVariables] = useState<VariablesType>({});
  const { urlDetection } = useUrlState();

  type VariablesType = {
    searchValue?: string;
    genres?: string[];
    sort?: string;
    status?: string;
    type?: string;
    season?: string;
    [key: string]: string | string[] | undefined; // Index signature
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const updatedVariables: VariablesType = {};

        urlParams.forEach((value: string, key: string) => {
              switch (key) {
                case 'keyWord':
                      updatedVariables.searchValue = value;
                      break;
                case 'Type':
                case 'Status':
                case 'Season':
                case 'Sort':
                    updatedVariables[key.toLowerCase()] = value;
                    break;
                case 'Genre':
                    (updatedVariables.genres ||= []).push(value);
                    break;
                default:
                    break;
            }
        });
    
    setVariables(updatedVariables);
    console.log(updatedVariables)
  }, [urlDetection, location.search]);

  const { loading, error, data } = useQuery(SEARCH_ANIME_QUERY, {
    variables
  });

  useEffect(() => {
    const handleResize = () => {
      if (data) {
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>("#card-item"),
        );
        const heights = cards.map((card) => card.offsetWidth);
        const maxHeight = Math.max(...heights);
        cards.forEach(
          (card) =>
            (card.style.height = `${maxHeight * 2 - maxHeight / 1.8}px`),
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);
  if (loading) return <div className="w-full h-auto">Loading...</div>;
  if (error)
    return (
      <div className="w-full p-3 rounded bg-base-100 bg-opacity-90">
        Error: {error.message}
      </div>
    );

  return (
    <div className="grid grid-flow-row xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 xl:gap-5 lg:gap-5 md:gap-4 gap-4">
      {(variables) && data?.Page?.media?.length !== 0 ? (
        data?.Page?.media.map((anime: any) => (
          <Card
            key={anime.id}
            anime={anime}
            cardRef={null}
            width="w-full"
            height=""
          />
        ))
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
