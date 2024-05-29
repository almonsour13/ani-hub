import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GENRE, TYPE, SEASON, STATUS, SORT } from '../../graphQl/filterQueries';
import DropDown from "./dropDown";

const Filter = () => {
    const { loading: genreLoading, error: genreError, data: genreData } = useQuery(GENRE);
    const { loading: formatLoading, error: formatError, data: formatData } = useQuery(TYPE);
    const { loading: seasonLoading, error: seasonError, data: seasonData } = useQuery(SEASON);
    const { loading: statusLoading, error: statusError, data: statusData } = useQuery(STATUS);
    const { loading: sortLoading, error: sortError, data: sortData } = useQuery(SORT);

    if (genreLoading || formatLoading || seasonLoading || statusLoading || sortLoading) return <FilterSkeleton/>;
    if (genreError || formatError || seasonError || statusError || sortError) return <FilterSkeleton/>;

    return (
        <div className="flex flex-col gap-3 rounded">
            <div className="flex font-semibold">
                <h1>Filter</h1>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-3">
                {genreData && <Genre type="Genre" data={genreData.GenreCollection} />}
                {formatData && <DropDown type="Type" data={formatData.__type.enumValues} />}
                {statusData && <DropDown type="Status" data={statusData.__type.enumValues} />}
                {seasonData && <DropDown type="Season" data={seasonData.__type.enumValues} />}
                {sortData && <DropDown type="Sort" data={sortData.__type.enumValues} />}
            </div>
        </div>
    );
};
interface GenreProps{
    type:string;
    data:any[];
}

const Genre: React.FC<GenreProps> = ({ type, data }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleSelect = (val: string) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(val)) {
                return prevSelected.filter((item) => item !== val);
            } else {
                return [...prevSelected, val];
            }
        });
    };
    const renderSelected = () => {
        if (selected.length > 2) {
            return `${selected.slice(0, 1).join(", ")} +${selected.length - 1}`;
        } else if (selected.length > 0) {
            return selected.join(", ");
        } else {
            return "All";
        }
    };

    const removeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSelected([]);
    };

    return (
        <div className="dropdown w-full bg-base-200 rounded cursor-pointer" tabIndex={0}>
            <div className="flex gap-2 w-full p-3 text-xs font-semibold rounded">
                <p>{type}:</p>
                <div className="flex text-primary w-full">
                    {renderSelected()}
                </div>
                    {selected.length>0 ? (
                        <button onClick={removeSelect}>
                            <svg
                                className="fill-current h-4 w-4"
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
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] mt-2 gap-2 p-2 shadow-lg bg-base-200 rounded w-52 text-xs max-h-96 overflow-auto"
            >
                {data.map((item: string, index: number) => (
                    <li
                        onClick={() => handleSelect(item)}
                        className={`flex justify-between hover:bg-base-100 hover:text-primary p-3 cursor-pointer rounded ${
                            selected.includes(item) ? "text-primary" : "text-white"
                        }`}
                        key={index}
                        value={index}
                    >
                        <p>{item}</p>
                        <input
                            type="checkbox"
                            className="checkbox h-3 w-3 rounded"
                            checked={selected.includes(item)}
                            readOnly
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FilterSkeleton = () => {
    return(
        <div className="flex flex-col gap-3 p-3">
            <div className="h-6 w-16 skeleton rounded"></div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-3"> 
                {[...Array(5)].map((_, index) => (
                    <div className="h-10 w-full skeleton rounded"></div>
                ))}
            </div>
        </div>
    )
}

export default Filter;