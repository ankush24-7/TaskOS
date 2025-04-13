const PersonalInfo = ({ user }) => {
  return (
    <div className="flex rounded-2xl px-3 py-2 mt-2 border border-white/20">
      <div className="flex flex-col gap-3 w-1/2">
        <div className="flex flex-col">
          <p className="text-gray-300">Full Name</p>
          <p className="text-md max-w-80 text-ellipsis overflow-hidden whitespace-nowrap text-white">
            {user.name.firstName} {user.name.lastName || ""}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-300">Email</p>
          <p className="text-md max-w-80 text-ellipsis overflow-hidden whitespace-nowrap text-white">
            {user.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-1/2">
        <div className="flex flex-col">
          <p className="text-gray-300">Username</p>
          <p className="text-md max-w-80 text-ellipsis overflow-hidden whitespace-nowrap text-white">
            {user.username}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-300">Organization</p>
          <p className="text-md max-w-80 text-ellipsis overflow-hidden whitespace-nowrap text-white">
            {user.organization || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
