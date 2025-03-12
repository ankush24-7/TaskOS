import DropDown from "@/components/ui/DropDown"
import { modalIcons } from "@/assets/icons/icons";
import { useDashboard } from "@/contexts/DashboardContext"

const ProcessAssigneeDropDown = ({ assignedTo, setAssignedTo, setShowAssign }) => {
  const { project } = useDashboard();

  const handleClick = (member) => {
    (member._id === assignedTo?._id) ? setAssignedTo(null) : setAssignedTo(member);
  }

  console.log(project.teamMembers);

  return (
    <DropDown
      showHeader={false}
      setIsOpen={setShowAssign}
      position="bottom-left"
      bgColor="#fff"
      children={
        <div className="flex flex-col max-h-60">
          {project.teamMembers.map((member, i) => {
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleClick(member)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-neutral-900 ${member._id === assignedTo?._id ? "bg-neutral-100" : "hover:bg-gray-100"}`}>
                <modalIcons.Profile className="w-6 h-6 stroke-1 stroke-neutral-900"/>
                <p>{member.name.firstName}</p>
              </button>
            )
          })}
        </div>
      }
    />
  )
}

export default ProcessAssigneeDropDown