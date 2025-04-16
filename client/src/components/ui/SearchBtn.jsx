import { SearchIcon } from "@/assets/icons/icons";

const SearchBtn = ({ placeholder, search, setSearch }) => {
  return (
    <form className="relative group flex-grow" onSubmit={(e) => e.preventDefault()}>
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 ml-2 stroke-gray-300 group-focus:stoke-white" />
      <label htmlFor="search" className="absolute -top-96">
        Search
      </label>
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl pl-10 pr-2 py-1.5 bg-transparent ring-[1.25px] focus:outline-none ring-white text-white placeholder:text-gray-400 focus:placeholder:text-gray-400 hover:bg-prim-black focus:bg-prim-black"
      />
    </form>
  );
};

export default SearchBtn;
