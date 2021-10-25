import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";

function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <form action="" className={styles.form}>
      <Input
        type="text"
        text="Project name"
        name="name"
        placeholder="Insert project name"
      />
      <Input
        type="number"
        text="Project budget"
        name="budget"
        placeholder="Insert budget"
      />
      <Select name="category_id" text="Select category" options={categories} />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
