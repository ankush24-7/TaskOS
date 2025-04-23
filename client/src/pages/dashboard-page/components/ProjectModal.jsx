import { useState } from "react";
import SearchSection from "./SearchSection";
import { useNavigate } from "react-router-dom";
import CloseBtn from "@/components/ui/CloseBtn";
import { useUser } from "@/contexts/UserContext";
import { validateProjectName } from "@/utils/validateForm";
import { useDashboard } from "@/contexts/DashboardContext";

const ProjectModal = ({ newProject, setShowModal }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("white");
  const { project, setProject, projectCRUD } = useDashboard();
  const [name, setName] = useState(project.title || "");
  const [team, setTeam] = useState(project.teamMembers || []);
  const [deadline, setDeadline] = useState(project.deadline && new Date(project.deadline).toISOString().split("T")[0] || "");

  const handleSubmit = async () => {
    if (!name) return;
    if (!team.some(member => member._id === user._id)) team.push(user);
    const project = {
      title: name,
      status: document.getElementById('status').value,
      deadline,
      teamMembers: team
    };
    const id = await projectCRUD.updateProject(project);
    setProject(project);
    setShowModal(false);
    if (newProject) navigate(`/projects/${id}/dashboard`, { replace: true });
  }

  const handleCancel = () => {
    if (newProject) projectCRUD.deleteProject(project._id);
    if (!name) validateProjectName(name, setColor, setError);
    else setShowModal(false);
  }

  return (
    <div className="absolute z-20 inset-0 flex justify-center md:pt-16 lg:pt-10 backdrop-blur-[1px] bg-black/5">
      <div className="modal relative z-30 flex flex-col items-center w-full md:w-8/10 lg:w-[50rem] h-full md:h-[34rem] md:rounded-3xl 
      drop-shadow-[20px_20px_20px_rgba(0,0,0,0.3)] bg-[#E0EBF5]">
        <div className="flex w-full justify-between px-4 py-3 rounded-t-3xl border-b border-black/10 bg-drop-header">
          <h1 className="text-lg text-neutral-900">
            {newProject ? "Create Project" : "Edit Project"}
          </h1>
          <CloseBtn onClick={() => setShowModal(false)} dark={false} />
        </div>

        <div className="flex flex-col md:flex-row p-4 w-full h-full border-b border-black/10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col w-3/4 pr-4 md:border-r border-black/10">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-md text-neutral-900">
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
              <label htmlFor="status" className="text-md text-neutral-900">
                Status
              </label>
              <select
                id="status"
                className="p-2 mt-2 w-40 rounded-md cursor-pointer focus:outline-none bg-white"
                defaultValue={project.status || "Active"}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="flex flex-col mt-4 w-1/2">
              <label htmlFor="name" className="text-md text-neutral-900">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="p-2 mt-2 w-40 rounded-md focus:outline-none bg-white"
              />
            </div>
          </form>

          <section className="h-full flex flex-col pt-4 md:pt-0 md:pl-4">
            <SearchSection
              search={search}
              setSearch={setSearch}
              team={team}
              setTeam={setTeam}
            />
          </section>
        </div>

        <div className="flex gap-4 justify-end w-full p-4">
          <button 
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded-lg cursor-pointer bg-prim-yellow-100 hover:bg-prim-yellow-200 active:bg-prim-yellow-250">
            <p className="text-md text-white">Save</p>
          </button>
          <button 
            onClick={handleCancel}
            className="px-4 py-1.5 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-400">
            <p className="text-md text-white">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
