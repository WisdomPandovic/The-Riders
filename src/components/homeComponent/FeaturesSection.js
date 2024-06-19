import styles from "./home.module.css"
import { FaCheckCircle } from 'react-icons/fa';
import { FaCar, FaPlane, FaCalendarAlt, FaLuggageCart, FaMapMarkerAlt, FaMoneyBillAlt, FaClock, FaHeadset } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <div className="container text-center mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <p className={styles.customIconColor}>Rider Services</p>
          <h2 className={styles.customColorGray}>We offer the best Features</h2>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="icon">
            <FaCar size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2 customColorGray">Car Service</div>
          <p className={`${styles.customColor} mt-2`}>Book a ride with our car service for convenient transportation to and from the airport.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaPlane size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">Airport Shuttle</div>
          <p className={`${styles.customColor} mt-2`}>Enjoy our airport shuttle service, providing hassle-free transportation directly to the terminal.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaCalendarAlt size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">Booking Flexibility</div>
          <p className={`${styles.customColor} mt-2`}>Choose your travel dates with our flexible booking options, tailored to your schedule.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaMapMarkerAlt size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">Location Selection</div>
          <p className={`${styles.customColor} mt-2`}>Select your pickup and drop-off locations with ease using our location services.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaMoneyBillAlt size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">Transparent Pricing</div>
          <p className={`${styles.customColor} mt-2`}>Transparent pricing ensures you know the cost upfront, with no hidden fees.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaClock size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">24/7 Service</div>
          <p className={`${styles.customColor} mt-2`}>Book a ride anytime, day or night, with our 24/7 service availability.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaHeadset size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">Customer Support</div>
          <p className={`${styles.customColor} mt-2`}>Our dedicated customer support team is available to assist you with any inquiries or concerns.</p>
        </div>
        <div className="col-md-3">
          <div className="icon">
            <FaLuggageCart size={80} className={styles.customIconColor} />
          </div>
          <div className="text mt-2">Luggage Assistance</div>
          <p className={`${styles.customColor} mt-2`}>We assist with your luggage, ensuring a smooth and comfortable travel experience.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
