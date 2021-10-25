import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";
import { useHistory } from "react-router-dom";

function NewProject() {
  const history = useHistory();

  function createPost(project) {
    // Initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        history.push("/projects", { message: "Project created" });
      })
      .catch((err) => console.log(err));
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
