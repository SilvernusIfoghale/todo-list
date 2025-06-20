import React from "react";
import { GoSearch } from "react-icons/go";
import { FiMoon } from "react-icons/fi";

interface Props {
  mode: boolean;
  onModeChange: (mode: boolean) => void;
  setFilter: (filter: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const Header: React.FC<Props> = ({
  mode,
  onModeChange,
  setFilter,
  search,
  setSearch,
}) => {
  return (
    <>
      {/* ================ search | Sort | Light/Dark Mode ================ */}
      <div className="py-5 flex items-center gap-3 w-full mb-3">
        <div className=" border w-full rounded flex items-center px-2 border-[#6C63FF]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search note..."
            className="w-full  p-2 outline-0  "
          />
          <GoSearch className="text-xl  " />
        </div>
        <div>
          <select
            name="sort"
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#6C63FF] rounded p-2 outline-0 text-white cursor-pointer hover:bg-[#534CC2]"
          >
            <option value="All" key="all" className="bg-white text-[#6C63FF] ">
              ALL
            </option>
            <option
              value="Complete"
              key="Complete"
              className="bg-white text-[#6C63FF] "
            >
              Complete
            </option>
            <option
              value="InComplete"
              key="InComplete"
              className="bg-white text-[#6C63FF] "
            >
              InComplete
            </option>
          </select>
        </div>
        <div
          className="bg-[#6C63FF] rounded p-2 h-fit text-white hover:bg-[#534CC2]"
          onClick={() => onModeChange(!mode)}
        >
          <FiMoon className="text-xl cursor-pointer " />
        </div>
      </div>
    </>
  );
};

export default Header;
