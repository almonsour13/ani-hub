import React, { useState } from "react";

interface DropDownProps {
    type: string;
    data: any[];
}

const DropDown: React.FC<DropDownProps> = ({ type, data }) => {
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (val: string) => {
        setSelected(val);
        setIsOpen(false);
    };

    const removeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSelected("");
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle dropdown visibility
    };

    return (
        <div className="dropdown w-full bg-base-200 rounded cursor-pointer" tabIndex={0}>
            <div className="flex gap-2 w-full p-3 text-xs font-semibold rounded" onClick={toggleDropdown}>
                <p>{type}:</p>
                <div className="flex text-primary w-full">{selected ? selected : "All"}</div>
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
                            className={`hover:bg-base-200 hover:text-primary p-3 cursor-pointer rounded ${
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

export default DropDown;
