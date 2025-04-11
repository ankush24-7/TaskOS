import DropDown from "@/components/ui/DropDown"
import { useDashboard } from "@/contexts/DashboardContext"
import DisplayPicture from "@/components/ui/DisplayPicture";

const ProcessAssigneeDropDown = ({ assignedTo, setAssignedTo, setShowAssignee }) => {
  const { project } = useDashboard();

  const handleClick = (member) => {
    (member._id === assignedTo?._id) ? setAssignedTo(null) : setAssignedTo(member);
    setShowAssignee(false);
  }
  
  return (
    <DropDown
      showHeader={false}
      position="bottom-left"
      bgColor="#fff"
      children={
        <div className="flex flex-col min-w-28 max-h-60">
          {project.teamMembers.map((member) => {
            return (
              <button
                key={member._id}
                type="button"
                onClick={() => handleClick(member)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl cursor-pointer text-neutral-900 hover:bg-gray-100">
                <DisplayPicture
                  radius="24px"
                  color={member.color}
                  firstName={member.name.firstName}
                  publicId={member.displayPicture.publicId}
                />
                <p>{member.username}</p>
              </button>
            )
          })}
        </div>
      }
    />
  )
}

export default ProcessAssigneeDropDown