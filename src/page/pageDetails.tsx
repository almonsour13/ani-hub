import React from "react";
import { useQuery } from "@apollo/client";
import { SERIES_PAGE_QUERY } from "../graphQl/queries";
import { useParams } from 'react-router-dom';

//156822
const PageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(SERIES_PAGE_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-auto">
      <div
        className="w-full lg:h-96 md:h-88 h-64 bg-cover bg-center bg-no-repeat relative p-3 animate-bg-slide"
        style={{
          backgroundImage: `url(${data.Media.bannerImage || data.Media.coverImage.large})`,
        }}
      >
        <div className="absolute z-10 bottom-0 left-0 w-full p-3 flex gap-3">
          <div className=" w-28 lg:h-80 md:h-64 sm:h-60 xs:h-44 h-40 rounded-md bg-secondary drop-shadow-md">
            <img
              className="h-full w-full rounded object-cover"
              src={data.Media.coverImage.large.replace("medium", "large")}
              alt={data.Media.title.english || data.Media.title.native}
            />
          </div>
          <div className="w-52 relative ">
            <div className="absolute bottom-0 left-0 flex flex-row gap-1">
              <button className="btn lg:btn-md btn-sm lg:w-56 w-auto px-3 rounded btn-primary flex flex-row align-center justify-center text-md">
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                Watch Now
              </button>
              <label className="swap p-0">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                      className="swap-off fill-current w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                      className="swap-on fill-current w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                    </svg>
                  </label>
            </div>
          </div>
        </div>
        <div className="absolute z-1 h-full inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
        <div className="absolute z-1 h-full w-full bg-base-100 top-0 left-0 opacity-70"></div>
      </div>
      {
        //details
      }
      <div className="w-full h-auto p-3 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="leading-none lg:text-4xl md:text-2xl text-2xl text-wrap font-bold  drop-shadow-md">
            {data.Media.title.english || data.Media.title.native}
          </h1>
          <div className="flex flex-row gap-1">
            <p className="text-xs pr-1 border-primary border-r">{data.Media.type}</p>
            <p className="text-xs pr-1 border-primary border-r">{data.Media.status}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.Media.genres.map((genre: any) => (
              <a
                href="#"
                className="btn btn-xs btn-outline btn-primary rounded leading-none text-xs md:text-base lg:text-md xl:text-lg 2xl:text-2xl font-bold"
              >
                {genre}
              </a>
            ))}
          </div>
        </div>
        <div className="w-full h-auto rounded line-clamp-5">
          <p dangerouslySetInnerHTML={{ __html: data.Media.description }} />
        </div>
      </div>
    </div>
  );
};
export default PageDetails;
