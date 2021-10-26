import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProject, updateProject } from "../controllers/Requests";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import { parse, v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setshowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await getProject(id);
      setProject(result);
    }
    fetchMyAPI();
  }, [id]);

  function toggleProjectForm(project) {
    setshowProjectForm(!showProjectForm);
  }

  function toggleServiceForm(project) {
    setShowServiceForm(!showServiceForm);
  }

  function createService(project) {
    setMessage([]);
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage(["Over budget!!! Review service value", "error"]);
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    async function updateService(project) {
      const result = await updateProject(project);

      if (!isEmpty(result)) {
        setMessage(["Service added", "success"]);
      } else {
        setMessage(["Error adding service", "error"]);
      }
    }
    updateService(project);
  }

  function editPost(project) {
    setMessage([]);
    if (project.budget < project.cost) {
      setMessage(["Project cost cant be higher that project budget", "error"]);
      return false;
    }
    async function fetchMyAPI() {
      const result = await updateProject(project);
      setProject(result);
      setshowProjectForm(false);
      setMessage(["Project edited", "success"]);
    }
    fetchMyAPI();
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          {message[0] && <Message msg={message[0]} type={message[1]} />}
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>
              {!showProjectForm ? (
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
            <div className={styles.service_form_container}>
              <h2>Add a service</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Add Service" : "Close"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services:</h2>
            <Container customClass="start">
              <p>List Services</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
