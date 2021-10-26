import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import RoutePages from "./components/pages/RoutePages";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          {RoutePages.map((routeUnit) => {
            return routeUnit.exact ? (
              <Route exact path={routeUnit.name} key={routeUnit.key}>
                {routeUnit.component}
              </Route>
            ) : (
              <Route path={routeUnit.name} key={routeUnit.key}>
                {routeUnit.component}
              </Route>
            );
          })}
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
