//ANCHOR - GET Categoies
async function getCategories() {
  let result = await fetch(process.env.REACT_APP_CAT_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.ok ? result.json() : [].json();
}

//ANCHOR - GET Project
async function getProject(id) {
  let result = await fetch(`${process.env.REACT_APP_CAT_PROJECTS}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.ok ? result.json() : [].json();
}

//ANCHOR - GET Projects
async function getProjects() {
  let result = await fetch(process.env.REACT_APP_CAT_PROJECTS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.ok ? result.json() : [].json();
}

//ANCHOR - DELETE Project
async function deleteProject(id) {
  let result = await fetch(`${process.env.REACT_APP_CAT_PROJECTS}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.ok ? true : false;
}

//ANCHOR - PSOT Projects
async function postProjects(project) {
  let result = await fetch(process.env.REACT_APP_CAT_PROJECTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return result.ok ? result.json() : [].json();
}

export { getCategories, postProjects, getProject, getProjects, deleteProject };
