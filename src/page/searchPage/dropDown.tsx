import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const GetQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};
interface DropDownProps {
  type: string;
  data: any;
  setFilterVariables: React.Dispatch<React.SetStateAction<any[]>>;
  filterVariables: any[];
}

const DropDown: React.FC<DropDownProps> = ({
  type,
  data,
  setFilterVariables,
  filterVariables,
}) => {
  const query = GetQueryParams();
  const paramsData:string = query.get(type) || "";
  const [selected, setSelected] = useState(paramsData);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() =>{
    if (setFilterVariables) {
      setFilterVariables((prevFilterVariables) => {
        const updatedFilterVariables = prevFilterVariables.filter(
          (filter) => filter.type !== type,
        );
        return [...updatedFilterVariables, { type, value: paramsData }];
      });
    }
  },[])

  const handleSelect = (val: string) => {
    setSelected(val);
    if (setFilterVariables) {
      const url = new URL(window.location.href);
      setFilterVariables(prevFilterVariables => {
        url.searchParams.set(type, val);
        return [...prevFilterVariables.filter(filter => filter.type !== type), { type, value: val }];
      });
      window.history.pushState({}, "", url.toString());
    }
    setIsOpen(false);
  };
  
  const removeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelected("");
    const url = new URL(window.location.href);
    url.searchParams.delete(type);
    if (setFilterVariables) {
      setFilterVariables(prev => prev.filter(filter => filter.type !== type));
    }
    window.history.pushState({}, "", url.toString());
  }; 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="dropdown w-auto bg-base-200 rounded cursor-pointer"
      tabIndex={0}
    >
      <div
        className="flex gap-2 w-full p-3 text-xs font-semibold rounded"
        onClick={toggleDropdown}
      >
        <p>{type}:</p>
        <div className="flex text-primary w-full">
          {selected ? selected : "All"}
        </div>
        {selected ? (
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
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] mt-2 gap-2 p-2 shadow-lg bg-base-100 rounded w-52 text-xs max-h-96 overflow-auto"
        >
          {data.map((item: any) => (
            <li
              onClick={() => handleSelect(item.name)}
              className={`w-full truncate hover:bg-base-200 hover:text-primary p-3 cursor-pointer rounded ${
                selected === item.name ? "text-primary" : " text-white"
              }`}
              key={item.id}
              value={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
interface GenreProps {
  type: string;
  data: any[];
  setFilterVariables: React.Dispatch<React.SetStateAction<any[]>>;
  filterVariables: any[];
}
const Genre: React.FC<GenreProps> = ({ type, data, setFilterVariables, filterVariables, }) => {
  const query = GetQueryParams();
  const paramsData:string[] = query.getAll(type);
  const [selected, setSelected] = useState(paramsData || []);
  useEffect(() => {
    setFilterVariables((prev) => [
      ...prev.filter((item) => item.type !== type),
      ...selected.map((value) => ({ type, value })),
    ]);
    
    const url = new URL(window.location.href);
    url.searchParams.delete(type);
    selected.forEach((item) => {
      return url.searchParams.append(type, item)
    })
    window.history.pushState({}, "", url.toString());
    console.log(selected)
  }, [selected, type, setFilterVariables]);

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
    setFilterVariables((prevFilters) =>
      prevFilters.filter((filter) => !(filter.type === type)),
    );
    
    const url = new URL(window.location.href);
    url.searchParams.delete(type);
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div
      className="dropdown w-auto bg-base-200 rounded cursor-pointer"
      tabIndex={0}
    >
      <div className="flex gap-2 w-full p-3 text-xs font-semibold rounded">
        <p>{type}:</p>
        <div className="flex text-primary w-full">{renderSelected()}</div>
        {selected.length > 0 ? (
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
export {Genre,DropDown };
