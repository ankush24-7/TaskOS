import { priority, modalIcons, user, down } from "../../../../../assets/icons/icons";

function roundButton(icon) {
    return (
        <button className="hover:bg-[#18181a15] p-1.5 rounded-full">
        <img src={icon} alt="icon-{icon}" className="w-6" />
        </button>
    );
}

function Modal({ task, onClose }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-40 z-10"
      onClick={ handleBackgroundClick }>
      <div className="bg-white absolute top-10 w-2/3 h-[35rem] flex flex-col rounded-2xl drop-shadow-[0_0_1rem_rgba(0,0,0,0.5)] overflow-y-scroll scrollbar-hide">
        <div className="flex justify-between items-center border-b-[1px] px-6 py-3.5">
          <button className="flex items-center rounded-full p-1 hover:bg-gray-200">
            <img src={user} alt="icon-current-project" className="w-6 rounded-full" />
            <p className="text-zinc-700 text-lg pl-1"> Assign </p>
            <img src={down} alt="logo_down" className="mt-1 w-5 pl-0.5" />
          </button>

          <div className="flex items-center gap-5">
            <button className="flex p-1 gap-2 rounded-full border-green-500 border-2 group hover:bg-green-500">
              <p className="text-green-500 font-medium group-hover:text-white">
                Complete Task
              </p>
              <svg
                className="group-hover:stroke-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0ed100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </button>

            {roundButton(modalIcons.del)}
            {roundButton(modalIcons.archive)}
            {roundButton(modalIcons.copy)}

            <button
              className="bg-[#18181a15] p-1 rounded-full ml-4"
              onClick={onClose}>
              <img src={modalIcons.close} alt="icon-close" className="w-4" />
            </button>
          </div>
        </div>

        <div className="flex divide-x-[1px] h-full">
            <div className="flex flex-col w-[75%] p-6">
                <input type="text" placeholder={task.name} className="focus:outline-none hover:bg-[#18181a15] rounded-md px-4 py-2 text-lg" />
                <input type="text" placeholder={"Add a description"} className="text-base focus:outline-none hover:bg-[#18181a15] rounded-md px-4 py-1" />
                <button className="mb-4 rounded-full hover:bg-[#18181a15]">
                    <img src={priority[task.priority]} alt="priority" className="h-8" />
                </button>
            </div>

            <div className="flex flex-col grow items-center divide-y-[1px]">
                <button className="w-full flex items-center gap-3 px-4 py-6">
                    <img src={modalIcons.calander} alt="icon-calander" />
                    <p className="text-lg font-medium text-[#71717a]">Due Date</p>
                    <img src={down} alt="icon-down" />
                </button>

                <div className="flex w-full gap-2 px-4 py-6">
                    {task.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                        {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
