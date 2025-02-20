import DropDown from "@/components/ui/DropDown";
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
      width={12}
      position="bottom-left"
      header="Options"
      setIsOpen={setIsOpen}
      children={
        <div className="flex flex-col px-1.5 py-2 gap-1.5">
          <button
            onClick={handleEdit}
            className="py-2 rounded-lg cursor-pointer bg-drop-btn hover:bg-drop-btn-hover active:bg-drop-btn-active">
            <p className="text-md text-white">Edit</p>
          </button>
          <button
            onClick={handleArchive}
            className="py-2 rounded-lg cursor-pointer bg-drop-btn hover:bg-drop-btn-hover active:bg-drop-btn-active">
            <p className="text-md text-white">{ project.archived === false ? "Archive" : "Unarchive"}</p>
          </button>
          <button
            onClick={() => projectCRUD.deleteProject()}
            className="py-2 rounded-lg cursor-pointer bg-drop-btn hover:bg-drop-btn-hover active:bg-drop-btn-active">
            <p className="text-md text-red-500">Delete</p>
          </button>
        </div>
      }
    />
  );
};

export default ProjectDropDown;
