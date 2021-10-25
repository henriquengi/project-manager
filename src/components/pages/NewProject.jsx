import styles from "./NewProject.module.css"
import ProjectForm from "../project/ProjectForm";

function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create a project to add services</p>
      <ProjectForm />
    </div>
  )
}

export default NewProject;
