import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ANIME_QUERY } from "../../graphQl/queries"; // Adjust the import path as needed

const Header: React.FC = () => {
  const [isInView, setIsInView] = useState(true);
  const [keyWord, setKeyWord] = useState("");

  const handleScroll = () => {
    setIsInView(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      window.location.href = `/search?keyWord=${keyWord}`;
    } else {
      setKeyWord((event.target as HTMLInputElement).value);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = `/search?keyWord=${keyWord}`;
  };
  const removeKeyWord = () => {
    setKeyWord("");
    var inputSearch: any = document.querySelector("#search-input");
    if (inputSearch) {
      inputSearch.value = "";
    }
  };
  const openModal = () => {
    const modal = document.getElementById(
      "search-modal",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.classList.add("modal-open");
    }
  };
  return (
    <>
      <div
        className={`fixed top-0 w-full h-auto z-50 transition ease-in-out duration-300 bg-gradient-to-b from-base-100 via-transparent to-transparent 
      ${!isInView ? "bg-opacity-50 backdrop-blur-sm backdrop-brightness-100 bg-base-100" : ""}
      `}
      >
        <div className="navbar lg:w-9/12 w-full mx-auto lg:px-0 px-5 p-2">
          <div className="navbar-start">
            <a className="text-xl font-bold" href="/">
              <img
                className="h-12 w-12"
                src="assets/icon/icon.png"
                alt="icon"
              />
            </a>
          </div>
          <div className="navbar-center w-96 relative lg:hidden hidden">
            <div className="flex w-full " id="search-wrapper">
              <div className="w-full p-2 px-3 flex gap-2 content-center items-start border-2 border-primary rounded-full">
                <button onClick={handleSearch}>
                  <svg
                    className="fill-current h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  id="search-input"
                  className="w-full bg-transparent outline-none"
                  type="text"
                  placeholder="search.."
                  onKeyUp={handleKeyUp}
                />
                {keyWord ? (
                  <button className="h-full" onClick={removeKeyWord}>
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <button onClick={openModal}>
              <svg
                className="fill-current h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          
        {/* <OnKeySearchResult keyWord={keyWord} /> */}
        </div>
      </div>
      <SearchModal />
    </>
  );
};

interface OnKeySearch {
  keyWord: string;
}

const OnKeySearchResult: React.FC<OnKeySearch> = ({ keyWord }) => {
  const { loading, error, data } = useQuery(SEARCH_ANIME_QUERY, {
    variables: { searchValue: keyWord },
    skip: !keyWord,
  });
  useEffect(() => {
  }, [data]);
  if (loading) return <div className="w-full h-auto">loading</div>;
  if (error)
    return (
      <div className="w-full p-3 rounded bg-base-100 bg-opacity-90">
        Error: {error.message}
      </div>
    );

  return (
    <>
      {keyWord && data.Page.media.length != 0 ? (
        <div className="flex flex-col gap-3 rounded bg-base-100 bg-opacity-90">
          <div className="flex w-full flex-col gap-3">
            {data.Page.media.slice(0, 5).map((anime: any) => (
              <a
                href={`/${anime.type.toLowerCase()}/${anime.id}`}
                className="h-auto flex gap-3 group rounded hover:bg-base-200 transition-all ease-in-out duration-300"
                key={anime.id}
              >
                <div className="flex-0 w-12 h-16 bg-primary rounded overflow-hidden">
                  <img
                    className="h-full w-full rounded object-cover scale-100 group-hover:scale-110 transition-all ease-in-out duration-300"
                    src={anime.coverImage.large}
                  />
                </div>
                <div className="flex-1 flex content-center items-center h-16">
                <div className="flex flex-col">
                  <p className="text-wrap group-hover:text-primary lg:text-base text-sm font-semibold w-full truncate">
                    {anime.title.english || anime.title.native}
                  </p>
                  <div className="flex gap-2 text-xs opacity-80">
                    <p>{anime.status}</p>
                    <p>{anime.format}</p>
                    <p>{anime.startDate.year}</p>
                  </div>
                  <div className="flex gap-2 text-xs opacity-80 hidden">
                    {anime.genres.slice(0, 3).map((genre: any) => (
                      <a href="" key={genre}>
                        {genre}
                      </a>
                    ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <a
            href={`/search?keyWord=${keyWord}`}
            className="btn btn-primary btn-sm flex content-center items-center p-3 rounded"
          >
            View All Results
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const SearchModal = () => {
  const [keyWord, setKeyWord] = useState("");
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      window.location.href = `/search?keyWord=${keyWord}`;
    } else {
      setKeyWord((event.target as HTMLInputElement).value);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = `/search?keyWord=${keyWord}`;
  };
  const closeModal = () => {
    const modal = document.getElementById(
      "search-modal",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.classList.remove("modal-open");
    }
    setKeyWord("");
  };
  const close = () => {
    closeModal();
    setKeyWord("");
  };
  const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        closeModal();
    }
  };

  useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
          document.removeEventListener("keydown", handleKeyDown);
      };
  }, []);

  return (
    <dialog
      className={`modal backdrop-blur-sm p-4 px-5 lg:py-12 md:py-12 items-start`}
      id="search-modal"
      role="dialog"
      onClick={handleClickOutside}
    >
      <div className="lg:w-6/12 md:w-10/12 w-full max-h-full h-auto overflow-auto flex gap-6 flex-col bg-base-100 p-3 rounded m-0">
        <div className="flex gap-2 content-center items-start">
          <button onClick={handleSearch}>
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            id="search-input"
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="search.."
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button className="h-full" onClick={close}>
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <OnKeySearchResult keyWord={keyWord} />
      </div>
    </dialog>
  );
};
export default Header;
