import CardClinicForm from "../components/card-clinic-form/CardClinicForm";
import CardClinicPicture from "../components/card-clinic-picture/CardClinicPicture";
import Page from "../components/Page";
import "./ApplicationEditPage.scss";

const ApplicationEditPage: React.FC = () => {
  return (
    <Page className="" title="Edit">
      <div className="">
        <div className="">
          <CardClinicPicture />
        </div>
        <div className="">
          <CardClinicForm />
        </div>
      </div>
    </Page>
  );
};

export default ApplicationEditPage;
