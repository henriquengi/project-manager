import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";
import { getCategories } from "../controllers/Requests";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await getCategories();
      setCategories(result);
    }
    fetchMyAPI();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  }

  function handleCategoryChange(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Project name"
        name="name"
        placeholder="Insert project name"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type="number"
        text="Project budget"
        name="budget"
        placeholder="Insert budget"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name="category_id"
        text="Select category"
        options={categories}
        handleOnChange={handleCategoryChange}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
