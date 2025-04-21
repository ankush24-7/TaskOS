import DropDown from "@/components/dropdowns/DropDown";
import { Pen, Archive, Del } from "@/assets/icons/icons";
import { useDashboard } from "@/contexts/DashboardContext";

const ProjectDropDown = ({ setIsOpen, setShowModal }) => {
  const { project, projectCRUD } = useDashboard();

  const handleEdit = () => {
    setIsOpen(false);
    setShowModal(true);
  }

  const handleArchive = async () => {
    project.archived = !project.archived;
    await projectCRUD.updateProject(project);
    setIsOpen(false);
  }

  return (
    <DropDown
      showHeader={false}
      position="right"
      children={
        <div className="flex flex-col p-0.75 rounded-xl bg-neutral-800">
          <button
            onClick={handleEdit}
            className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-neutral-900">
            <Pen className="w-5 h-5 stroke-white" />
            <p>Edit</p>
          </button>
          <button
            onClick={handleArchive}
            className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-neutral-900">
            <Archive className="w-5 h-5 stroke-white" />
            <p>{ project.archived === false ? "Archive" : "Unarchive"}</p>
          </button>
          <button
            onClick={() => projectCRUD.deleteProject()}
            className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl hover:bg-neutral-900">
            <Del className="w-5 h-5 stroke-red-500" />
            <p className="text-red-500">Delete</p>
          </button>
        </div>
      }
    />
  );
};

export default ProjectDropDown;
