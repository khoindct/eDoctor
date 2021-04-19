import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import routes from "./routes";
import GlobalStyles from "./GlobalStyles";

const App: React.FC = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
