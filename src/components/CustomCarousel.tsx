import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CustomCarousel: React.FC = () => {
  return (
    <Carousel>
      <div>
        <img
          alt="Clinic preview"
          src="https://images.unsplash.com/photo-1621570168855-e9651220e831?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        />
      </div>
      <div>
        <img
          alt="Clinic preview"
          src="https://previews.unsplash.com/photo-1621570168855-e9651220e831?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        />
      </div>
      <div>
        <img
          alt="Clinic preview"
          src="https://images.unsplash.com/photo-1621570168855-e9651220e831?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
