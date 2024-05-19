import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SERIES_PAGE_QUERY } from "../../graphQl/queries";
import { useParams } from 'react-router-dom';
import EpisodesList from "./episodeList";
//156822
const PageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(SERIES_PAGE_QUERY, {
    variables: { id },
  });
  const [expandDesc, setEspandDesc] = useState(false);
  const expand = () =>{
    if(!expandDesc){
      setEspandDesc(true)
    }else{
      setEspandDesc(false)
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-auto">
      <div
        className="w-full lg:h-96 md:h-88 sm:h-80 h-80 bg-cover bg-center bg-no-repeat relative animate-bg-slide"
        style={{
          backgroundImage: `url(${data.Media.bannerImage || data.Media.coverImage.large})`,
        }}
      >
        <div className="absolute w-full z-10 top-0 ">
          <div className="lg:w-10/12 w-full mx-auto lg:px-0 p-3">
              <a href="/">back</a>
          </div>
        </div>
        <div className="absolute w-full z-10 bottom-0 ">
          <div className="lg:w-10/12 w-full mx-auto lg:px-0 p-3 py-4 flex gap-3">
            <div className="lg:w-52 md:w-48 sm:w-44 w-44 lg:h-64 md:h-60 sm:h-56 h-44 rounded-md bg-secondary drop-shadow-md">
              <img
                className="h-full w-full rounded object-cover"
                src={data.Media.coverImage.large.replace("medium", "large")}
                alt={data.Media.title.english || data.Media.title.native}
              />
            </div>
            <div className="w-full relative ">
              <div className="absolute bottom-0 left-0 flex flex-col gap-1">
                <h1 className="leading-none lg:text-4xl md:text-2xl text-2xl text-wrap font-bold  drop-shadow-md">
                  {data.Media.title.english || data.Media.title.native}
                </h1>
                {/* <button className="btn lg:btn-md btn-sm lg:w-56 w-auto px-3 rounded btn-primary flex flex-row align-center justify-center text-md">
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
                </button> */}
                <p className="">
                  {data.Media.status}
                </p>
                <p className="">
                  {data.Media.format}
                </p>
                <p className="">
                {data.Media.startDate.year} - {data.Media.endDate.year || "?"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-1 h-full inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
        <div className="absolute z-1 h-full w-full bg-base-100 top-0 left-0 opacity-70"></div>
      </div>
      {
        //details
      }
        <div className="lg:w-10/12 w-full mx-auto lg:px-0 p-3 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {/* <h1 className="leading-none lg:text-4xl md:text-2xl text-2xl text-wrap font-bold  drop-shadow-md">
              {data.Media.title.english || data.Media.title.native}
            </h1> */}
            {/* <div className="flex flex-row gap-1">
              <p className="text-xs pr-1 border-primary border-r">{data.Media.type}</p>
              <p className="text-xs pr-1 border-primary border-r">{data.Media.status}</p>
            </div> */}
            <div className="flex flex-wrap gap-2">
              {data.Media.genres.map((genre: any) => (
                <a
                  href="#"
                  className="btn btn-sm btn-outline btn-primary rounded leading-none text-xs md:text-base lg:text-md"
                >
                  {genre}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col transition-all">
            <p className="font-bold text-lg">Description:</p>
            <div className={`w-full ${expandDesc?"h-28":"h-auto"} transition-all rounded overflow-hidden relative pb-7`} onClick={expand}>
                {data.Media.description?
                  <p dangerouslySetInnerHTML={{ __html: data.Media.description }} />
                  :
                  <p>No Description</p>
                }         
               <div className={`absolute bottom-0 left-0 z-10 ${expandDesc?"from-base-100":"from-transparent"} h-32 w-full bg-gradient-to-t from-base-100 via-transparent to-transparent`}>
                  <div className="relative w-full h-full flex justify-center">
                    <a className={`absolute bottom-0 btn btn-sm btn-circle btn-outline ${expandDesc?"":"rotate-180"} transition-all`} onClick={expand}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      {
        //episodes
      }
      <div className="lg:w-10/12 w-full mx-auto lg:px-0 p-3 flex flex-col gap-4">
          <p className="font-bold text-lg ">
            Episodes:
          </p>
          <EpisodesList/>
      </div>
    </div>
  );
};
export default PageDetails;