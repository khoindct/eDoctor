import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.scss";

const App: React.FC = () => {
  const routing = useRoutes(routes);

  return <>{routing}</>;
};

export default App;
