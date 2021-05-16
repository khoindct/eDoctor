import CardClinicPicture from "../components/card-clinic-picture/CardClinicPicture";
import Page from "../components/Page";
import CardClinicDetail from "../components/card-clinic-detail/CardClinicDetail";
import "./ApplicationDetailPage.scss";

const ApplicationDetailPage: React.FC = () => {
  return (
    <Page className="" title="Detail">
      <div className="">
        <div className="">
          <CardClinicPicture />
        </div>
        <div className="">
          <CardClinicDetail />
        </div>
      </div>
    </Page>
  );
};

export default ApplicationDetailPage;
