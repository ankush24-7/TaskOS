import { useState } from "react";
import CloseBtn from "@/components/ui/CloseBtn";
import { RemoveIcon } from "@/assets/icons/icons";
import { validateProjectName } from "@/utils/validateForm";
import { useDashboard } from "@/contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

const ProjectModal = ({ newProject, setShowModal }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [color, setColor] = useState("white");
  const { project, setProject, projectCRUD } = useDashboard();
  const [name, setName] = useState(project.title || "");

  const renderTeam = () => {
    if (!project.teamMembers) return;
    return project.teamMembers.map((member) => (
      <div
        key={member._id}
        className="flex items-center justify-between gap-2 rounded-lg px-1 py-2 bg-drop-btn hover:bg-drop-btn-hover">
        {/* <img
          src={member.avatar}
          alt={member.name}
          className="w-8 h-8 rounded-full"
        /> */}
        <p className="text-white">{member.name.firstName + " " + (member.name.lastName || "")}</p>
        <button className="cursor-pointer">
          <RemoveIcon className="w-4 h-4 hover:stroke-red-500" />
        </button>
      </div>
    ));
  };

  const handleSubmit = async () => {
    if (!name) return;
    const project = {
        title: name,
        status: document.getElementById('status').value,
        deadline: document.getElementById('deadline').value || null,
    }
    const id = await projectCRUD.updateProject(project);
    setProject(project);
    setShowModal(false);
    if (newProject) navigate(`/projects/${id}/dashboard`);
  }

  const handleCancel = () => {
    if(newProject) projectCRUD.deleteProject(project._id);
    if (!name) validateProjectName(name, setColor, setError);
    else setShowModal(false);
  }

  return (
    <div className="absolute z-20 inset-0 flex justify-center pt-10 backdrop-blur-[1px] bg-white/10">
      <div className="absolute z-30 flex flex-col items-center w-[50rem] h-[34rem] rounded-3xl bg-prim-black">
        <div className="flex w-full justify-between px-4 py-3 rounded-t-3xl border-b border-drop-border bg-drop-header">
          <h1 className="text-lg text-white">Edit Project</h1>
          <CloseBtn onClick={() => setShowModal(false)} dark={true} />
        </div>

        <div className="flex p-4 w-full h-full border-b border-drop-border">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col w-full pr-4 border-r border-drop-border">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-md text-white">
                Project Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="off"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateProjectName(name, setColor, setError)}
                style={{ borderColor: color }}
                className="px-2 py-1.5 mt-2 rounded-md focus:outline-none border-2 bg-white"
              />
              <p className="text-sm h-4 text-red-500">{error}</p>
            </div>
            <div className="flex flex-col mt-1 w-1/2">
              <label htmlFor="status" className="text-md text-white">
                Status
              </label>
              <select
                id="status"
                className="p-2 mt-2 rounded-md focus:outline-none cursor-pointer bg-white"
                defaultValue={project.status || "Active"}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="flex flex-col mt-4 w-1/2">
              <label htmlFor="name" className="text-md text-white">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                className="p-2 mt-2 rounded-md focus:outline-none bg-white"
              />
            </div>
          </form>

          <section className="flex flex-col pl-4">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col w-full">
              <label htmlFor="search" className="text-md text-white">
                Manage Team
              </label>
              <input
                id="search"
                type="text"
                autoComplete="off"
                placeholder="Search your network"
                className="p-2 mt-2 rounded-md focus:outline-none bg-white"
              />
            </form>

            <div className="flex flex-col gap-2 mt-3 max-h-60 overflow-y-scroll scrollbar-hide">
              {renderTeam()}
            </div>
          </section>
        </div>

        <div className="flex gap-4 justify-end w-full p-4">
          <button 
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-500">
            <p className="text-md text-white">Save</p>
          </button>
          <button 
            onClick={handleCancel}
            className="px-4 py-1.5 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-500">
            <p className="text-md text-white">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
