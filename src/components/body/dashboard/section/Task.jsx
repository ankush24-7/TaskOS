import Tags from "./Tags";
import { priority, user, addTask } from "../../../../assets/icons/icons.js";

function Task() {
  return (
    <>
      <div className="group h-2 flex justify-center">
        <button className="absolute bg-white rounded-full mx-auto w-6 h-6 opacity-0 drop-shadow-xl -translate-y-1 group-hover:opacity-100">
          <img src={ addTask } alt="icon_add" className="mx-auto w-4" />
        </button>
      </div>

      <div className="flex flex-col mx-2 py-2 h-[7.75rem] rounded-2xl bg-white justify-between cursor-pointer">
        <div className="flex justify-between px-3 items-center">
          <div className="flex">
              <p className="text-lg">Task Name</p>
              <img src={priority[0]} alt="priority" />
          </div>
          <img src={user} alt="assigned_user" className="w-7" />
        </div>

        <div className="flex gap-2 px-3 items-center">
          <Tags />
          <Tags />
          <Tags />
        </div>
      </div>
    </>
  );
}

export default Task;
