import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import styles from "./Projects.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";
import { useState, useEffect } from "react";
import { getProjects, deleteProject } from "../controllers/Requests";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setMessageProject] = useState("");

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      async function fetchMyAPI() {
        const result = await getProjects();
        setProjects(result);
        setRemoveLoading(true);
      }
      fetchMyAPI();
    }, 300);
  }, []);

  function removeProject(id, name = "") {
    async function fetchMyAPI() {
      const result = await deleteProject(id);
      if (result) {
        setProjects(projects.filter((project) => project.id !== id));
        setMessageProject(`The project ${name} was removed`);
      }
    }
    fetchMyAPI();
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Projects</h1>
        <LinkButton to="/newproject" text="Create Project" />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>No registered projects</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
