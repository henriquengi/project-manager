import Home from "./Home";
import Projects from "./Projects";
import Company from "./Company";
import NewProject from "./NewProject";
import Project from "./Project";
import Contact from "./Contact";

const RoutePages = [
  { name: "/", component: <Home />, exact: true, key: 0 },
  { name: "/projects", component: <Projects />, exact: false, key: 1 },
  { name: "/company", component: <Company />, exact: false, key: 2 },
  { name: "/newproject", component: <NewProject />, exact: false, key: 3 },
  { name: "/project/:id", component: <Project />, exact: false, key: 4 },
  { name: "/contact", component: <Contact />, exact: false, key: 5 },
];

export default RoutePages