import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";
import { useHistory } from "react-router-dom";
import { postProjects } from "../controllers/Requests";

function NewProject() {
  const history = useHistory();

  async function createPost(project) {
    // Initialize cost and services
    project.cost = 0;
    project.services = [];

    await postProjects(project);
    history.push("/projects", { message: "Project created" });
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create a project to add services</p>
      <ProjectForm handleSubmit={createPost} btnText="Create project" />
    </div>
  );
}

export default NewProject;
