import User from "@/components/ui/User";
import useDropDown from "@/hooks/useDropDown";
import DropDown from "@/components/dropdowns/DropDown";
import * as navbarComp from "@/components/ui/NavbarBtns";
import { SortIcon, ArrowIcon } from "@/assets/icons/icons";

const MyProcessesHeader = ({ sortBy, setSortBy }) => {
  const { isOpen, setIsOpen, dropdownRef } = useDropDown();

  const sortDropdownBtn = (label) => {
    const isAsc = sortBy.order === 1;
    const isSelected = sortBy.sortBy === label;
    return (
      <button
        onClick={() => handleClick(label)}
        className="w-full flex p-2 items-center justify-between cursor-pointer rounded-xl hover:bg-neutral-900">
        <p className={`${isSelected ? "text-prim-yellow-100" : "text-white"}`}>{label}</p>
        {isSelected && (
          <ArrowIcon className={`w-4 h-4 stroke-3 stroke-prim-yellow-100 ${isAsc ? "rotate-180" : ""}`} />
        )}
      </button>
    );
  }

  const handleClick = (criteria) => {
    setSortBy((prev) => {
      if (prev.sortBy === criteria) {
        return { ...prev, order: prev.order * -1 };
      } else {
        return { sortBy: criteria, order: 1 };
      }
    });
    setIsOpen(false);
  }

  return (
    <header className="flex justify-between items-center py-2">
      <h1 className="text-white text-3xl sm:text-4xl">Assigned</h1>
      <span className="flex items-center gap-5 lg:gap-8">
        <div className="relative" ref={dropdownRef}>
          <navbarComp.RoundBtn
            Icon={() => <SortIcon className="w-6 h-6 text-white" />}
            label="Filter"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <DropDown
              width="140px"
              header="Sort By"
              showHeader={true}
              position="bottom-right"
              setIsOpen={setIsOpen}
              children={
                <div className="flex flex-col p-0.75 rounded-b-xl bg-neutral-800">
                  {sortDropdownBtn("Priority")}
                  {sortDropdownBtn("Deadline")}
                  {sortDropdownBtn("Start Date")}
                </div>
              }
            />
          )}
        </div>
        <User />
      </span>
    </header>
  );
};

export default MyProcessesHeader;
