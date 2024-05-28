import CreateContactForm from "../components/contactComponent/CreateContactForm";
import HeroSection from "../components/contactComponent/HeroSection";
import { FaCar, FaPlane, FaCalendarAlt} from 'react-icons/fa';

function page() {

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const location = 'Abuja, NG'; 
  const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;

  return (
<div>
<HeroSection/>
<div className="container contact-text mt-5 mb-5">

      <div className="text-center mb-5"><h3>The Riders</h3></div>
      <div className="container text-center mt-5 mb-5">

        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="icon">
              <FaCar size={80} className="customIconColor" />
            </div>
            <div className="text mt-3 mb-3 customIconColor">Location</div>
            <p className="customColorGray">The Riders Company, FCT Abuja</p>
            <p className="customColorGray">Mon - Sat : 6am - 11pm</p>
            <p className="customColorGray">Sun : 1pm - 11pm</p>
          </div>
          <div className="col-md-4 mb-4">
            <div className="icon">
              <FaPlane size={80} className="customIconColor" />
            </div>
            <div className="text mt-3 mb-3 customIconColor">Email</div>
            <p className="customColorGray">info@riders.com</p>
          </div>
          <div className="col-md-4 mb-4">
            <div className="icon">
              <FaCalendarAlt size={80} className="customIconColor" />
            </div>
            <div className="text mt-3 mb-3 customIconColor">Phone</div>
            <p className="customColorGray">+234 800 800 800</p>
            <p className="customColorGray">+562 300 300 300</p>
          </div>

        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-8">
          <h2>Get in touch.</h2>
          <h2>We are glad to hear from you.</h2>
          <p>Our team of experts is standing by and ready to help you find the right solution for your business’s needs.</p>
        </div>
        <div className="col-md-6">
          <CreateContactForm />
        </div>
      </div>

      <div style={{ width: '100%', height: '400px' }}>
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
  );
}
export default page;
