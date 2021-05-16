import CardClinicForm from "../components/card-clinic-form/CardClinicForm";
import CardClinicPicture from "../components/card-clinic-picture/CardClinicPicture";
import Page from "../components/Page";
import "./CustomerEditPage.scss";

const CustomerEditPage: React.FC = () => {
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

export default CustomerEditPage;
