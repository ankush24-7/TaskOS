import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { AddTask, RemoveIcon, Profile, Close } from "@/assets/icons/icons";

const SearchSection = ({ search, setSearch, team, setTeam }) => {
  const { user, network } = useUser();
  const [loading, setLoading] = useState(true);
  const [resultLength, setResultLength] = useState(0);
  const [searchResult, setSearchResult] = useState([]);

  const renderTeam = () => {
    if (!team) return;
    return team.map((member) => {
      return (
        <div
          key={member._id}
          style={{ display: member._id === user._id && "none" }}
          className="flex items-center justify-between gap-2 rounded-xl px-1 py-2 odd:bg-white/20 even:bg-white/50">
          <span className="flex items-center gap-1">
            <Profile className="w-8 h-8 stroke-1 stroke-neutral-900" />
            <span className="flex flex-col">
              <p className="text-sm text-neutral-900">{member.username}</p>
              <p className="text-xs leading-4 text-neutral-900">
                {member.name.firstName + " " + (member.name.lastName || "")}
              </p>
            </span>
          </span>
          <button
            onClick={() => handleRemoveMember(member._id)}
            className="cursor-pointer">
            <RemoveIcon className="w-5 h-5 stroke-neutral-900 hover:stroke-red-500" />
          </button>
        </div>
      );
    });
  };

  const handleAddMember = (user) => {
    setTeam((prev) => [...prev, user]);
    setSearchResult((prev) => prev.filter((result) => result.key !== user._id));
  };

  const handleRemoveMember = (userId) => {
    setTeam((prev) => prev.filter((member) => member._id !== userId));
  }

  useEffect(() => {
    const searchNetwork = () => {
      if (!search) return setLoading(true);
      const notTeam = network.filter((user) => team.every((member) => member._id !== user._id));
      const searchFilter = notTeam.filter(
        (user) =>
          user.username.includes(search.toLowerCase()) ||
          user.name.firstName.toLowerCase().startsWith(search.toLowerCase()) ||
          user.name.lastName?.toLowerCase().startsWith(search.toLowerCase())
      );

      setResultLength(searchFilter.length);
      setSearchResult(
        searchFilter.map((user, i) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-lg px-1 py-1.5 odd:bg-black/7">
            <div className="flex items-center gap-2">
              <Profile className="w-8 h-8 stroke-1 stroke-neutral-900" />
              <span className="flex flex-col">
                <p className="text-sm text-neutral-900">{user.username}</p>
                <p className="text-xs leading-4 text-neutral-900">
                  {user.name.firstName + " " + (user.name.lastName || "")}
                </p>
              </span>
            </div>
            <button
              onClick={() => {handleAddMember(user); console.log("User:", user)}}
              className="cursor-pointer">
              <AddTask className="w-5 h-5 stroke-neutral-900 hover:stroke-green-600" />
            </button>
          </div>
        ))
      );

      setLoading(false);
    };

    searchNetwork();
  }, [search]);

  return (
    <div className="h-full">
      <p className="text-md mb-2 text-neutral-900">Manage Team</p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative">
        <label htmlFor="search" className="absolute -top-96">Manage Team</label>
        <input
          id="search"
          type="text"
          autoComplete="off"
          value={search}
          placeholder="Search your network"
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderBottomLeftRadius: search ? 0 : "0.375rem",
            borderBottomRightRadius: search ? 0 : "0.375rem",
          }}
          className="w-full p-2 pr-6 rounded-t-md focus:outline-none bg-white"
        />
        <button 
          onClick={() => setSearch("")}
          className="w-5 h-5 cursor-pointer rounded-full absolute right-0 top-1/2 -translate-y-1/2 -translate-x-0.5 hover:bg-neutral-200">
          <Close className="w-5 h-5 stroke-neutral-400" />
        </button>
      </form>

      {search ? (
        <section className="max-h-76 flex flex-col gap-0.5 rounded-b-lg pl-1 pb-1 overflow-y-scroll vertical-scrollbar bg-white">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : resultLength ? (
            searchResult
          ) : (
            <p className="pt-2 text-center text-gray-400">No results found</p>
          )}
        </section>
      ) : (
        <div className="max-h-76 flex flex-col gap-0.5 mt-1 pl-1 overflow-y-scroll vertical-scrollbar">
          {renderTeam()}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
