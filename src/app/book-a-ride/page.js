import BookingForm from "../components/bookingComponent/BookingForm";
import HeroSection from "../components/bookingComponent/HeroSection";
import BackgroundTextComponent from "../components/bookingComponent/BackgroundTextComponent";
import SpecialBooking from "../components/bookingComponent/SpecialBooking";
function page() {
  return (
    <div>
      <HeroSection />
      <div className="container contact-text mt-5 mb-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Book a ride with Riders</h2>
          </div>
          <div className="col-md-6">
            <BookingForm />
          </div>
          <div className="col-md-6">
            <div style={{ width: '100%', height: '500px' }}>
              <iframe
                title="map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?q=abuja_id&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

      </div>

      <BackgroundTextComponent />
     <div className="container mt-5">
      <div className="row">
      <div className="col-md-8">
            <h2>Book a ride for your special need.</h2>
          </div>
      <div className="col-md-6">
        <SpecialBooking />
      </div>
      </div>
     </div>
    </div>
  );
}
export default page;
