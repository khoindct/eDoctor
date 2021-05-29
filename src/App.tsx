import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.scss";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { authenticated, authorization } = useTypedSelector(
    (state) => state.auth
  );

  const routing = useRoutes(routes(authenticated, authorization));

  return (
    <QueryClientProvider client={queryClient}>{routing}</QueryClientProvider>
  );
};

export default App;
