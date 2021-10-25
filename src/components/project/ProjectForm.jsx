import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({ btnText }) {
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
      <Select name="category_id" text="Select category" />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
