import { Card, CardMedia } from "@material-ui/core";
import "./RegisterClinicPage.scss";
import Page from "../components/Page";
import StepForm from "../components/register-clinic-form/StepForm";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RegisterClinicPage = () => {
  const navigate = useNavigate();
  const { authenticated, authorization } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticated) {
      authorization === "patient" && navigate("/");
      authorization === "doctor" && navigate("/app/dashboard");
      authorization === "admin" && navigate("/admin/clinics");
    }
    // eslint-disable-next-line
  }, []);

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
