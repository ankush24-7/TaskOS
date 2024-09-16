import user from "../../../../assets/user.svg";
import Tags from "./Tags";
import priority3 from "../../../../assets/priority/priority3.svg";

function Task() {
  return (
    <div className="flex flex-col mx-2 py-2 h-[7.75rem] rounded-2xl bg-white justify-between">
      <div className="flex justify-between px-3 items-center">
        <div className="flex">
            <p className="text-lg">Task Name</p>
            <img src={priority3} alt="priority" />
        </div>
        <img src={user} alt="assigned_user" className="w-7" />
      </div>

      <div className="flex gap-2 px-3 items-center">
        <Tags />
        <Tags />
        <Tags />
      </div>
    </div>
  );
}

export default Task;
