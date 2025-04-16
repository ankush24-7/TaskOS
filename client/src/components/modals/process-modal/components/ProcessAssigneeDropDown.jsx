import useDropDown from "@/hooks/useDropDown";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown } from "@/assets/icons/icons";
import { useDashboard } from "@/contexts/DashboardContext";
import DisplayPicture from "@/components/ui/DisplayPicture";

const ProcessAssigneeDropDown = ({ assignedTo, setAssignedTo }) => {
  const { project } = useDashboard();
  const { isOpen: showAssignee, setIsOpen: setShowAssignee, dropdownRef: assigneeRef } = useDropDown();

  const handleClick = (member) => {
    member._id === assignedTo?._id
      ? setAssignedTo(null)
      : setAssignedTo(member);
    setShowAssignee(false);
  };

  return (
    <div className="relative w-fit" ref={assigneeRef}>
      <button
        type="button"
        onClick={() => setShowAssignee(!showAssignee)}
        style={{ backgroundColor: showAssignee && "#fff" }}
        className="btn-shadow group flex items-center justify-center rounded-full cursor-pointer bg-white">
        {assignedTo ? (
          <span className="flex gap-1.5 items-center justify-between py-0.5 pl-1.5 pr-3">
            <DisplayPicture
              radius={"24px"}
              color={assignedTo.color || "#B1401B"}
              firstName={assignedTo.name.firstName}
              publicId={assignedTo.displayPicture?.publicId || ""}
            />
            <div className="flex flex-col items-start">
              <p className="text-[11px] leading-none text-neutral-700">
                Assigned to
              </p>
              <span className="flex items-center gap-1">
                <p className="text-sm leading-tight text-neutral-900">
                  {assignedTo.username}
                </p>
                <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 stroke-neutral-900 transition-opacity duration-200 ease-in-out" />
              </span>
            </div>
          </span>
        ) : (
          <span className="flex items-center gap-1 py-1 px-2">
            <p className="text-neutral-900">Assign</p>
            <ChevronDown className="w-5 h-5 stroke-neutral-900" />
          </span>
        )}
      </button>

      {showAssignee && (
        <DropDown
          showHeader={false}
          position="bottom-left"
          children={
            <div className="flex flex-col min-w-28 max-h-60 rounded-xl bg-white">
              {project.teamMembers.map((member) => {
                return (
                  <button
                    key={member._id}
                    type="button"
                    onClick={() => handleClick(member)}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl cursor-pointer text-neutral-900 hover:bg-prim-black/10">
                    <DisplayPicture
                      radius="24px"
                      color={member.color}
                      firstName={member.name.firstName}
                      publicId={member.displayPicture.publicId}
                    />
                    <p>{member.username}</p>
                  </button>
                );
              })}
            </div>
          }
        />
      )}
    </div>
  );
};

export default ProcessAssigneeDropDown;
