import "./LandingPage.scss";
import { ReactComponent as MedicineSvg } from "../assets/images/undraw_medicine_b1ol.svg";
import { ReactComponent as DatePickerSvg } from "../assets/images/undraw_date_picker_gorr.svg";
import { ReactComponent as ReportSvg } from "../assets/images/undraw_report_mx0a.svg";
import { ReactComponent as LocationSvg } from "../assets/images/undraw_My_location_re_r52x.svg";
import { ReactComponent as DoctorSvg } from "../assets/images/undraw_doctors_hwty.svg";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useNavigate } from "react-router";
import CustomFooter from "../layouts/MainLayout/footer";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToRegisterClinic = () => {
    navigate("/register-clinic");
  };

  const navigateToSearching = () => {
    navigate("/search-clinic");
  };

  return (
    <div className="landing">
      <div className="hero">
        <h1 className="hero__title">
          We care about your health
          <span className="hero__title--border"></span>
        </h1>
        <h3 className="hero__subtitle">
          Discover the best doctors, clinic & hospital the city nearest to you.
        </h3>
        <ArrowDownwardIcon className="hero__icon" />
      </div>

      <div className="features">
        <div className="features__header">
          <h2 className="features__title">
            How it works
            <span className="hero__title--border"></span>
          </h2>
        </div>
        <div className="features__content">
          <div className="features__card">
            <MedicineSvg className="features__media" />
            <h4 className="features__text">Search Clinic</h4>
            <p className="features__subtext">
              Find the nearest clinic by a simple click. Fast and Convenient
            </p>
          </div>
          <div className="features__card">
            <DatePickerSvg className="features__media" />
            <h4 className="features__text">Book appointment</h4>
            <p className="features__subtext">
              Flexible time. No more spending hours to wait for your turn
            </p>
          </div>
          <div className="features__card">
            <ReportSvg className="features__media" />
            <h4 className="features__text">Review service</h4>
            <p className="features__subtext">
              Rating and give oppinion about the service of clinics
            </p>
          </div>
        </div>
      </div>

      <div className="searching">
        <LocationSvg className="searching__media" />
        <div className="searching__content">
          <h2 className="searching__title">Search clinics</h2>
          <p className="searching__text">
            Look for clinic, you can review and rating for specific clinic, with
            easy to use UI, you won't spend much time to understand what you are
            looking for
          </p>
          <button className="searching__button" onClick={navigateToSearching}>
            Search Clinics
          </button>
        </div>
      </div>

      <div className="booking">
        <DoctorSvg className="booking__media" />
        <div className="booking__content">
          <h2 className="booking__title">Register clinic account</h2>
          <p className="booking__text">
            Register clinic account to manage appointments, and you also have a
            beautiful event noting that help you manage your work easier
          </p>
          <button
            className="booking__button"
            onClick={navigateToRegisterClinic}
          >
            Register Now
          </button>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};

export default LandingPage;
