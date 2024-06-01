import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GENRE, TYPE, SEASON, STATUS, SORT } from "../../graphQl/filterQueries";
import { DropDown, Genre } from "./dropDown";

const Filter: React.FC = () => {
  const {
    loading: genreLoading,
    error: genreError,
    data: genreData,
  } = useQuery(GENRE);
  const {
    loading: formatLoading,
    error: formatError,
    data: formatData,
  } = useQuery(TYPE);
  const {
    loading: seasonLoading,
    error: seasonError,
    data: seasonData,
  } = useQuery(SEASON);
  const {
    loading: statusLoading,
    error: statusError,
    data: statusData,
  } = useQuery(STATUS);
  const {
    loading: sortLoading,
    error: sortError,
    data: sortData,
  } = useQuery(SORT);
  if (
    genreLoading ||
    formatLoading ||
    seasonLoading ||
    statusLoading ||
    sortLoading
  )
    return <FilterSkeleton />;
  if (genreError || formatError || seasonError || statusError || sortError)
    return <FilterSkeleton />;

  return (
    <div className="flex flex-col gap-3 rounded">
      <div className="flex font-semibold text-xl">
        <h1>Filter</h1>
      </div>
      <div className="flex flex-wrap gap-3">
        {genreData && <Genre type="Genre" data={genreData.GenreCollection} />}
        {formatData && (
          <DropDown type="Type" data={formatData.__type.enumValues} />
        )}
        {statusData && (
          <DropDown
            type="Status"
            data={statusData.__type.enumValues}
          />
        )}
        {seasonData && (
          <DropDown
            type="Season"
            data={seasonData.__type.enumValues}
          />
        )}
        {sortData && (
          <DropDown
            type="Sort"
            data={sortData.__type.enumValues}
          />
        )}
      </div>
    </div>
  );
};

const FilterSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-4 w-16 skeleton rounded"></div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-9 w-full skeleton rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
