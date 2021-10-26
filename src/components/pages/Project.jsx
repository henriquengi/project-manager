import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProject, updateProject } from "../controllers/Requests";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message"

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectform, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await getProject(id);
      setProject(result);
    }
    fetchMyAPI();
  }, [id]);

  function toggleProjectForm(project) {
    setShowProjectForm(!showProjectform);
  }

  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage(["Project cost cant be higher that project budget", "error"])
      return false;
    }
    async function fetchMyAPI() {
      const result = await updateProject(project);
      setProject(result);
      setShowProjectForm(false);
      setMessage(["Project edited", "success"])

      setTimeout(() => {
        setMessage([])
      }, 4000);
    }
    fetchMyAPI();
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          {message[0] && (
            <Message msg={message[0]} type={message[1]} />
          )}
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectform ? "Edit Project" : "Close"}
              </button>
              {!showProjectform ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total budget:</span> U${project.budget}
                  </p>
                  <p>
                    <span>Total spented:</span> U${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Save"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
