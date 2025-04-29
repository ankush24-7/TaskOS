import { useEffect, useState } from "react";
import userAPI from "@/services/api/userAPI";
import ProjectNav from "./components/ProjectNav";
import ProjectRow from "./components/ProjectRow";
import projectAPI from "@/services/api/projectAPI";
import ProjectCard from "./components/ProjectCard";
import Pagination from "@/components/ui/Pagination";
import ProjectTable from "./components/ProjectTable";

const ProjectsPage = () => {
  const isScreenLarge = window.innerWidth >= 640;
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showArchived, setShowArchived] = useState(false);

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
      const newPreferences = { 
        preferences: {
          projects: { sort, order }
        }
      }

      const response = await userAPI.updatePreferences(newPreferences);
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
      setIsLoading(true);
      const orderBy = order || "desc";
      const sortBy = sort || "updatedat";
      const width = window.innerWidth;
      const limit = width >= 1024 ? 8 : width >= 768 ? 9 : 10;
      const { status, data } = await projectAPI.getProjectPage({ limit, page: currentPage, search, sort: sortBy, order: orderBy, archived: showArchived });
      if (status === 200) {
        let projects;
        if (isScreenLarge) {
          projects = data.projects.map(project => <ProjectRow key={project._id} {...project} />);
        } else {
          projects = data.projects.map(project => <ProjectCard key={project._id} {...project} />);
        }
        setTotalPages(data.totalPages);
        setProjects(projects);
      } else {
        console.log(`Error ${status}: ${data}`);
      }
      setIsLoading(false);
    };

    paginatePage();
  }, [search, order, sort, currentPage, showArchived]);

  return (
    <div className="flex flex-col w-full h-8/10 pb-2 px-2 md:px-4 md:h-full lg:px-10">
      <ProjectNav 
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        search={search} 
        setSearch={setSearch} 
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />
      <ProjectTable 
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        projects={projects} 
        isLoading={isLoading}
        showArchived={showArchived}
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
