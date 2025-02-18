import { useEffect, useState } from "react";
import userAPI from "@/services/api/userAPI";
import ProjectNav from "./components/ProjectNav";
import ProjectRow from "./components/ProjectRow";
import projectAPI from "@/services/api/projectAPI";
import Pagination from "@/components/ui/Pagination";
import ProjectTable from "./components/ProjectTable";

const ProjectsPage = () => {
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPreferences = async () => {
      const { status, data } = await userAPI.getPreference("projects");
      if (status === 200) {
        setSort(data.sort);
        setOrder(data.order);
      } else {
        console.log(`Error ${status}: ${data}`);
      }
    }

    getPreferences();
  }, []);

  useEffect(() => {
    const updatePreferences = async () => {
      const projects = { sort, order };
      const response = await userAPI.updatePreferences(projects);
      if(response.status !== 200) {
        console.log(`Error ${response.status}: ${response.message}`);
      }
    };

    updatePreferences();
  }, [sort, order]);

  useEffect(() => {
    if (search && currentPage !== 1) 
      setCurrentPage(1); 
  }, [search]);

  useEffect(() => {
    const paginatePage = async () => {
      const { status, data } = await projectAPI.getProjectPage({ page: currentPage, search, sort, order });
      if (status === 200) {
        const projects = data.projects.map(project => <ProjectRow key={project._id} {...project} />);
        setTotalPages(data.totalPages);
        setProjects(projects);
      } else {
        console.log(`Error ${status}: ${data}`);
      }
    };

    paginatePage();
  }, [search, order, sort, currentPage]);

  return (
    <div className="flex flex-col w-full flex-grow sm:px-10 bg-gradient-to-r from-grad-l to-grad-r">
      <ProjectNav 
        search={search} 
        setSearch={setSearch} 
      />
      <ProjectTable 
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        projects={projects} 
      />
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}  
      />
    </div>
  );
};

export default ProjectsPage;
