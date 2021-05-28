import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import CustomTextField from "../components/CustomTextField";
import Page from "../components/Page";
import "./DoctorSecurityPage.scss";

const DoctorSecurityPage: React.FC = () => {
  return (
    <>
      <Page className="" title="Security">
        <Box mt={5} />
        <form>
          <Card>
            <CardHeader
              title="Security"
              classes={{
                title: "profile__title",
              }}
            />
            <Divider />
            <CardContent>
              <div className="profile__form--input">
                <CustomTextField label="Old Password" />
                <CustomTextField label="New Password" />
                <CustomTextField label="Confirm Password" />
              </div>
            </CardContent>
            <Divider />
            <div className="profile__form--action">
              <CustomButton type="submit">Save Changes</CustomButton>
            </div>
          </Card>
        </form>
      </Page>
    </>
  );
};

export default DoctorSecurityPage;
