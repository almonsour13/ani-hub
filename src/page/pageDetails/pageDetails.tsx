import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SERIES_PAGE_QUERY } from "../../graphQl/queries";
import { useParams } from "react-router-dom";
import ViewCoverImage from "./viewCoverImage";
import ImageChecker from "../../hooks/imageChecker";
import PageDetailsSkeleton from "../../components/skeletons/pageDetailsSkeleton";
import { useNavigate  } from "react-router-dom";

const PageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(SERIES_PAGE_QUERY, {
    variables: { id },
  });

  const viewCoverImageModal = () => {
    const modal = document.getElementById(
      "view-cover-image",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.classList.add("modal-open");
    }
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  if (loading) return <PageDetailsSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="w-full h-auto relative">
        {!loading ? (
          <div
            className="h-auto bg-cover bg-center bg-no-repeat relative animate-bg-slide"
            style={{
              backgroundImage: `url(${data.Media.bannerImage || data.Media.coverImage.large})`,
            }}
          >
            <div className="relative w-full h-auto ">
              <div className="flex flex-col w-full h-full lg:w-9/12 mx-auto lg:px-0 p-5 relative">
                {/* <div className="lg:h-14 h-10 w-full relative">
                  <div className="absolute z-10 top-0 h-full w-full flex content-center items-center">
                    <button className="" onClick={goBack}>
                      <svg
                        className="fill-current lg:h-8 lg:w-8 w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
                      </svg>
                    </button>
                  </div>
                </div> */}
                <div className="w-full lg:h-96 md:h-88 sm:h-80 h-56 relative">
                  <div className="absolute top-0 z-10 w-full h-full flex items-end">
                    <div className="flex gap-2 w-full lg:h-56 md:h-52 sm:h-48 h-40">
                      <div
                        className="flex-0 bg-primary lg:w-40 md:w-36 sm:w-32 w-28 h-full rounded drop-shadow-md cursor-pointer"
                        onClick={viewCoverImageModal}
                      >
                        <ImageChecker
                          imageUrl={data.Media.coverImage.large.replace(
                            "medium",
                            "large",
                          )}
                          title={
                            data.Media.title.english || data.Media.title.native
                          }
                          size="h-full w-full"
                        />
                      </div>
                      <div className="flex-1 h-full flex items-end">
                        <div className="w-full  h-auto flex flex-col gap-2">
                          <h1 className="leading-none lg:text-4xl md:text-2xl text-xl font-bold  drop-shadow-md">
                            {data.Media.title.english ||
                              data.Media.title.native}
                          </h1>
                          <div className="flex flex-row gap-2 lg:text-sm text-xs">
                            <p>{data.Media.format}</p>
                            <p>{data.Media.averageScore}</p>
                            <p>
                              {data.Media.startDate.year} -{" "}
                              {data.Media.endDate.year || "?"}
                            </p>
                            <p>{data.Media.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 bg-base-200 w-full h-full bg-opacity-70"></div>
              <div className="absolute top-0 h-full w-full bg-gradient-to-t from-base-200 via-transparent to-transparent"></div>
              <div className="absolute top-0 h-full w-full bg-gradient-to-r from-base-200 via-transparent to-transparent"></div>
            </div>

            <div className="absolute w-full z-10 bottom-0 hidden">
              <div className="lg:w-10/12 w-full mx-auto lg:px-0 p-3 py-4 flex gap-3">
                <div className="lg:w-40 md:w-36 sm:w-32 w-28 lg:h-56 md:h-52 sm:h-48 h-40 rounded-md bg-secondary drop-shadow-md">
                  <img
                    className="h-full w-full rounded object-cover"
                    src={data.Media.coverImage.large.replace("medium", "large")}
                    alt={data.Media.title.english || data.Media.title.native}
                  />
                </div>
                <div className="w-auto relative ">
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
                    <p className="">{data.Media.status}</p>
                    <p className="">{data.Media.format}</p>
                    <p className="">
                      {data.Media.startDate.year} -{" "}
                      {data.Media.endDate.year || "?"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
        {
          //details
        }
        <div className="lg:w-9/12 w-full mx-auto lg:px-0 p-5 flex flex-col gap-4">
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
                  href={`/search?Genre=${genre}`}
                  className="btn btn-xs btn-outline btn-primary rounded-2xl"
                >
                  {genre}
                </a>
              ))}
            </div>
          </div>
          <Description description={data.Media.description} />
        </div>
        {
          //episodes
        }
        <div className="lg:w-9/12 w-full mx-auto lg:px-0 p-5 flex flex-col gap-4"></div>
      </div>
      <ViewCoverImage
        imageUrl={data.Media.coverImage.large.replace("medium", "large")}
      />
    </>
  );
};
interface DescriptionProps {
  description: any;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [expandDesc, setExpandDesc] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [description]);

  const expand = () => {
    setExpandDesc(!expandDesc);
  };

  return (
    <div className="flex flex-col transition-all">
      <p className="font-bold text-lg">Description:</p>
      <div
        className={`w-full ${expandDesc ? 'h-28' : ''} transition-all rounded overflow-hidden relative pb-7`}
        onClick={expand}
        style={{ height: expandDesc ? '' : `${height + 40}px` }}
      >
        {description ? (
          <div className="h-auto" ref={ref}>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        ) : (
          <p>No Description</p>
        )}
        <div
          className={`absolute bottom-0 left-0 z-10 ${expandDesc ? 'from-base-200' : 'from-transparent'} h-32 w-full bg-gradient-to-t from-base-200 via-transparent to-transparent`}
        >
          <div className="relative w-full h-full flex justify-center">
            <a
              className={`absolute bottom-0 btn btn-sm btn-circle btn-outline ${expandDesc ? '' : 'rotate-180'} transition-all`}
              onClick={expand}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
