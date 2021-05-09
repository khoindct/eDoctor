import "./LandingPage.scss";
import { MdLocationCity, MdRateReview } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { useNavigate } from "react-router";

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
        <h1 className="hero__title">Search Doctor, Make an Appointment</h1>
        <h3 className="hero__subtitle">
          Discover the best doctors, clinic & hospital the city nearest to you.
        </h3>
      </div>
      <div className="features">
        <div className="features__header">
          <h2 className="features__title">
            Find a Doctors and Book appointments online instantly!
          </h2>
          <h3 className="features__subtitle">
            Choose the best time for you. Book with a click.
          </h3>
        </div>
        <div className="features__content">
          <div className="features__card">
            <i className="features__icon features__icon--purple">
              <MdLocationCity />
            </i>
            <h4 className="features__text">Search Clinic</h4>
            <div className="features__subtext">
              Find the nearest clinic by a simple click. Fast and Convenient
            </div>
          </div>
          <div className="features__card">
            <i className="features__icon features__icon--red">
              <FaAmbulance />
            </i>
            <h4 className="features__text">Book appointment</h4>
            <div className="features__subtext">
              Flexible time. No more spending hours to wait for your turn
            </div>
          </div>
          <div className="features__card">
            <i className="features__icon features__icon--green">
              <MdRateReview />
            </i>
            <h4 className="features__text">Review service</h4>
            <div className="features__subtext">
              Rating and give oppinion about the service of clinics
            </div>
          </div>
        </div>
      </div>
      <div className="searching">
        <button onClick={navigateToSearching}>Search the nearest clinic</button>
      </div>
      <div className="booking">
        <button onClick={navigateToBooking}>Book an appointment</button>
      </div>
    </div>
  );
};

export default LandingPage;
