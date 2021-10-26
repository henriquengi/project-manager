import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProject } from "../controllers/Requests";
import Loading from "../layout/Loading";
import Container from "../layout/Container";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectform, setShowProjectForm] = useState(false);

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

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectform ? "Edit Project" : "Close"}
              </button>
              {!showProjectform ? (
                <div className={styles.project_info}>
                  <p><span>Category:</span> {project.category.name}</p>
                  <p><span>Total budget:</span> U${project.budget}</p>
                  <p><span>Total spented:</span> U${project.cost}</p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>Project details</p>
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
