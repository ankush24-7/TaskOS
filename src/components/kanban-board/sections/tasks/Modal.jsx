import React from "react";
import { modalIcons, priorityIcons } from "../../../../assets/icons/icons.jsx";

function HeaderItem(Icon) {
    return (
        <button className="hover:bg-gray-200 p-1.5 rounded-full">
          {Icon}
        </button>
    );
}

function rightSectionItem(Icon, text) {
  return (
    <button className="w-full flex items-center justify-start gap-2 px-2.5 py-6 group">
      {Icon}
      <p className="text-base text-[#71717a]">{text}</p>
      <modalIcons.ChevronDown className="rounded-full ml-auto group-hover:bg-gray-200" />
    </button>
  )
};

function Modal({ task, onClose }) { 
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-[0.5px] bg-black/20"
      onClick={ handleBackgroundClick }
    >
      <div className="pop-up absolute top-10 w-2/3 h-[35rem] flex flex-col rounded-2xl overflow-y-scroll scrollbar-hide bg-white">
        <div className="flex justify-between items-center border-b-[1px] px-6 py-3.5">
          <button className="flex items-center rounded-full p-1 hover:bg-gray-200">
            <modalIcons.Profile width="28" />
            <p className="text-zinc-700 text-lg pl-1"> Assign </p>
            < modalIcons.ChevronDown className="mt-1 w-5 pl-0.5" />
          </button>

          <div className="flex items-center gap-5">
            <button className="flex p-1 gap-2 rounded-full border-green-500 border-2 group hover:bg-green-500">
              <p className="text-green-500 font-medium group-hover:text-white">
                Complete Task
              </p>
              <modalIcons.Complete stroke="#0ed100" className="group-hover:stroke-white" />
            </button>

            {HeaderItem(<modalIcons.Del />)}
            {HeaderItem(<modalIcons.Archive />)}
            {HeaderItem(<modalIcons.Copy />)}

            <button
              className="hover:bg-gray-200 p-1 rounded-full ml-4"
              onClick={onClose}>
              <modalIcons.Close width="16" height="16" />
            </button>
          </div>
        </div>

        <div className="flex divide-x-[1px] h-full">
            <div className="flex flex-col w-[75%] pt-4">
              <div className="flex px-4">
                <button>
                    {task ? React.createElement(priorityIcons[task.priority]): React.createElement(priorityIcons[3]) }
                </button>
                {task ? 
                  <input 
                    type="text" 
                    placeholder={task.name} 
                    className="focus:outline-none hover:bg-[#18181a15] placeholder:text-black placeholder:font-semibold placeholder:text-2xl rounded-md px-1 py-1 text-2xl grow" 
                  />
                :
                  <input 
                    type="text" 
                    placeholder={"Task Title"} 
                    className="focus:outline-none hover:bg-[#18181a15] placeholder:text-[#71717a] placeholder:text-2xl rounded-md px-1 py-1 text-2xl grow" 
                  />
                }
                
              </div>

              <input type="text" placeholder={"Add a description"} className="font-light mx-4 mt-2 rounded-md px-3 py-1 focus:outline-none focus:bg-[#18181a15] hover:bg-[#18181a15]" />
            </div>
            <div className="flex flex-col grow items-center divide-y-[1px]">
              {rightSectionItem(<modalIcons.Calander />, "Due Date")}
              {rightSectionItem(<modalIcons.Timeline stroke="#71717a" />, "Schedule Task")}

              <button className="flex flex-col w-full">
                {rightSectionItem(<modalIcons.Tags />, "Tags")}
                <div className="flex gap-2 px-4 pb-2">
                  {task && task.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
              </button>
              
              <div className="px-4 py-2 flex flex-col w-full">
                <p className="text-sm font-medium text-gray-500">&#123;CurrentProject&#125;</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
