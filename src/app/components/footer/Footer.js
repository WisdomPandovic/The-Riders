'use client'
import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaWeixin } from 'react-icons/fa';
import './footer.css';
import { toast } from 'react-toastify';

const Footer = () => {
    const [formData, setFormData] = useState({
        email: '',
      });

      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubscribe = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);

        try {
            const response = await fetch('/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to Subscribe');
            }

            const data = await response.json();
            console.log('Thank you for subscribing! You will now receive our latest offers and exclusive promotions directly to your inbox:', data);
            toast.success('Thank you for subscribing! You will now receive our latest offers and exclusive promotions directly to your inbox');
        } catch (error) {
            console.error('Failed to subscribe. Please try again later.:', error.message);
            toast.error('Failed to subscribe. Please try again later.:', error.message);
        }
    };

    return (
        <footer className="container-fluid text-light">
            <div className="row py-4">
                <div className="col-md-4">
                    <div className="justify-content-center align-items-center pt-5 pb-5">
                        <div>
                            <h5 className="text-left pb-3">Contact Us</h5>
                            <p>Phone: 081 2874 2738</p>
                            <p>Email: info@Rider.com</p>
                            <p>Location: Lorem ipsum dolor sit, amet consectetur adipisicing elit. In odit eaque at sequi! Vitae, repellendus.</p>
                            <div className="dk_foot_icon d-flex justify-content-cente">
                                <div className="mx-2"><FaInstagram /></div>
                                <div className="mx-2"><FaFacebook /></div>
                                <div className="mx-2"><FaTwitter /></div>
                                <div className="mx-2"><FaLinkedin /></div>
                                <div className="mx-2"><FaWeixin /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="pt-5 pb-5">
                        <h5 className='pb-3'>Cities</h5>
                        <ul className="list-unstyled ">
                            <li className=" mb-3">
                                Lagos
                            </li>
                            <li className="mb-3">
                                Abuja
                            </li>
                            <li className="mb-3">
                                Calabar
                            </li>
                            <li className="mb-3">
                                All Cities
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="pt-5 pb-5">
                        <h5 className='pb-3'>Classes</h5>
                        <ul className="list-unstyled ">
                            <li className=" mb-3">
                                Business Class
                            </li>
                            <li className="mb-3">
                                First Class
                            </li>
                            <li className="mb-3">
                                Comfort Class
                            </li>
                            <li className="mb-3">
                                Mini & VIP VAN class
                            </li>
                            <li className="mb-3">
                                <a className="nav-link" href="/our-classes">All Classes</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-3">

                    <div className="justify-content-center align-items-center pt-5 pb-5">
                        <h5 className='pb-3'>Newsletter</h5>
                        <p>We love to share new offers and <br></br>Exclusive Promotions</p>
                        <form onSubmit={handleSubscribe}>
                            <div className="form-group">
                                <input type="email" className="form-control  text-dark" id="email" name='email' placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                                <button type="submit" className="btn custom-bg text-white mt-2">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr />



            <div className="copyright text-center text-white">
                <h2>@2024 THE RIDER | All Right Reserved</h2>
                <p className="pb-2">Developed & Maintained by Panda</p>
            </div>
        </footer>
    );
}

export default Footer;