import style from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProject } from "../controllers/Requests";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await getProject(id);
      setProject(result);
    }
    fetchMyAPI();
  }, [id]);

  return <p>{project.name}</p>;
}

export default Project;
