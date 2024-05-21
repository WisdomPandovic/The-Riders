import BookingForm from "../components/bookingComponent/BookingForm";
import HeroSection from "../components/bookingComponent/HeroSection";
import BackgroundTextComponent from "../components/bookingComponent/BackgroundTextComponent";
import SpecialBooking from "../components/bookingComponent/SpecialBooking";
function page() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const location = 'Abuja, NG'; 
  const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;
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
                src={mapSrc}
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
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div>
            <h3>Special Accommodation Requests</h3>
            <p>At our service, we understand that every passenger has unique needs and preferences. To ensure a comfortable and convenient experience for all our customers, we are pleased to offer a range of special accommodation options. Whether you require a wheelchair-accessible vehicle, a pet-friendly vehicle, or have any other specific requirements, we&apos;re here to assist you. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
