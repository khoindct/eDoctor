import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Page from "../components/Page";
import "./NotFoundPage.scss";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Page className="not-found-page" title="404 Not Found">
      <img
        src="assets/images/404_page_not_found.svg"
        style={{ width: "50%" }}
      />
      <CustomButton callback={navigateBack}>
        Return To Previous Page
      </CustomButton>
    </Page>
  );
};

export default NotFoundPage;
