import { SearchIcon } from "@icons";

const SearchBtn = () => {
  return (
    <form className="relative group flex-grow">
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 ml-2 stroke-gray-300 group-focus:stoke-white" />
      <label htmlFor="search" className="absolute -top-40">
        Search
      </label>
      <input
        name="search"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        className="rounded-2xl pl-10 pr-2 py-1.5 bg-transparent ring-[1.25px] focus:outline-none ring-white text-white placeholder:text-gray-400 focus:placeholder:text-gray-400 hover:bg-prim-black focus:bg-prim-black"
      />
    </form>
  );
};

export default SearchBtn;
