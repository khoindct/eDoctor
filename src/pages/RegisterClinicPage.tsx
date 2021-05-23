import { Card, CardMedia } from "@material-ui/core";
import "./RegisterClinicPage.scss";
import Page from "../components/Page";
import StepForm from "../components/register-clinic-form/StepForm";

const RegisterClinicPage = () => {
  return (
    <Page className="register-clinic-page" title="Register Clinic">
      <Card className="register-clinic-card">
        <CardMedia
          className="register-clinic-cover"
          image="assets/images/register-clinic-page.jpg"
          title="beauty illustration"
        />
        <div className="register-clinic-content">
          <StepForm />
        </div>
      </Card>
    </Page>
  );
};

export default RegisterClinicPage;
