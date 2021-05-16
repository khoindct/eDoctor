import { Link as RouterLink, useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => navigate("/app/dashboard", { replace: true });

  return (
    <Page className="" title="Login">
      Login Page
    </Page>
  );
};

export default LoginPage;
