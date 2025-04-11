import { useEffect, useState } from "react";
import userAPI from "@/services/api/userAPI";
import { useUser } from "@/contexts/UserContext";
import { SearchIcon } from "@/assets/icons/icons";
import { FoundUserCard, NetworkUserCard } from "@/components/ui/UserCards";

const Network = () => {
  const [search, setSearch] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const { user: currentUser, network } = useUser();

  useEffect(() => {
    const searchUsers = async () => {
      try {
        if (!search) return setFoundUsers([]);
        const { status, data } = await userAPI.searchUsers(search);
        if (status === 200) {
          const foundUsers = data.map((user) => (
            <FoundUserCard
              key={user._id}
              user={user}
              label={
                user.network.find((u) => u._id === currentUser._id)
                  ? "Connected"
                  : user.requests.find((req) => req.sender._id === currentUser._id && req.type === "connect")
                  ? "Requested"
                  : "Connect"
              }
            />
          ));
          setFoundUsers(foundUsers);
        } else throw new Error(data);
      } catch (error) {
        console.log(error);
      }
    };

    searchUsers();
  }, [search]);

  return (
    <div className="h-full p-4">
      <form
        className="relative group flex-grow"
        onSubmit={(e) => e.preventDefault()}>
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 ml-2 stroke-gray-300 group-focus:stoke-white" />
        <label htmlFor="search" className="absolute -top-96">
          Search
        </label>
        <input
          name="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl w-full pl-10 pr-2 py-1.5 bg-transparent ring-[1.25px] focus:outline-none ring-white text-white placeholder:text-gray-400 focus:placeholder:text-gray-400 hover:bg-prim-black focus:bg-prim-black"
        />
      </form>

      <div className="max-h-84 py-1 overflow-y-scroll vertical-scrollbar">
        <div className="flex flex-col pr-1">
          {search ? (
            foundUsers
          ) : (
            network && network.map((user, i) => (
              <NetworkUserCard
                key={i}
                user={user}
                backgroundColor={i % 2 ? "transparent" : "#11111190"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Network;
