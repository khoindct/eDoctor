import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.scss";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App: React.FC = () => {
  const { authenticated, authorization } = useTypedSelector(
    (state) => state.auth
  );

  const routing = useRoutes(routes(authenticated, authorization));

  return <>{routing}</>;
};

export default App;
