import "./LandingPage.scss";
import { ReactComponent as MedicineSvg } from "../assets/images/undraw_medicine_b1ol.svg";
import { ReactComponent as DatePickerSvg } from "../assets/images/undraw_date_picker_gorr.svg";
import { ReactComponent as ReportSvg } from "../assets/images/undraw_report_mx0a.svg";
import { ReactComponent as LocationSvg } from "../assets/images/undraw_My_location_re_r52x.svg";
import { ReactComponent as DoctorSvg } from "../assets/images/undraw_doctors_hwty.svg";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToBooking = () => {
    navigate("/book-clinic");
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
        <button className="hero__button">Register</button>
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
          <h2 className="searching__title">
            Natural styling with almost nothing to learn
          </h2>
          <p className="searching__text">
            Evie brings you the pages you'll need and the structure to create
            your own, without a learning curve. It is minimal and mostly styles
            plain elements. There are only a few classes you'll need to know but
            nothing to disrupt your preferred coding style.
          </p>
          <button className="searching__button" onClick={navigateToSearching}>
            Search More
          </button>
        </div>
      </div>

      <div className="booking">
        <DoctorSvg className="booking__media" />
        <div className="booking__content">
          <h2 className="booking__title">
            Natural styling with almost nothing to learn
          </h2>
          <p className="booking__text">
            Evie brings you the pages you'll need and the structure to create
            your own, without a learning curve. It is minimal and mostly styles
            plain elements. There are only a few classes you'll need to know but
            nothing to disrupt your preferred coding style.
          </p>
          <button className="booking__button" onClick={navigateToBooking}>
            Register Now
          </button>
        </div>
      </div>

      <footer className="footer">
        <ul className="nav">
          <li className="nav__item">
            <Link to="" className="nav__link">
              Find your dream home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="" className="nav__link">
              Request proposal
            </Link>
          </li>
          <li className="nav__item">
            <Link to="" className="nav__link">
              Download home planner
            </Link>
          </li>
          <li className="nav__item">
            <Link to="" className="nav__link">
              Contact us
            </Link>
          </li>
          <li className="nav__item">
            <Link to="" className="nav__link">
              Submit your property
            </Link>
          </li>
          <li className="nav__item">
            <Link to="" className="nav__link">
              Come work with us!
            </Link>
          </li>
        </ul>
        <p className="copyright">
          &copy; Copyright 2021 by Quach Luyl Da's Team. Feel free to use this
          project for your own purposes. This does NOT apply if you plan to
          produce your own course or tutorials based on this project.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
