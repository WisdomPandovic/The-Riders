// "use client";
// import React, { useState, useEffect, useContext } from 'react';
// import Link from "next/link";
// import styles from "./navbar.module.css"
// function Nav() {

//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Function to check if the screen width is larger than a certain threshold
//   const isLargeScreen = () => {
//     return window.innerWidth > 768; // Change the threshold as needed
//   };

//   return (
//     <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${isLargeScreen() && scrolled ? 'bg-dark' : 'bg-light'}`}>
//       <div className="container">
//         <a className="navbar-brand text-uppercase" href="/home">
//           {/* <img src="/logo.svg" alt="Logo" width="30" height="30" className="d-inline-block align-top" /> */}
//           The Ri<span className={styles.logoText}>ders</span>
//         </a>

//         <button className={`navbar-toggler ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar links */}
//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav ">
//             <li className="nav-item">
//               <a className={`nav-link ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} href="/home">Home</a>
//             </li>
//             <li className="nav-item">
//               <a className={`nav-link ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} href="/about">About</a>
//             </li>
//             <li className="nav-item">
//               <a className={`nav-link ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} href="/our-service">Services</a>
//             </li>
//             <li className="nav-item">
//               <a className={`nav-link ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} href="/our-classes">Classes</a>
//             </li>
//             <li className="nav-item">
//               <a className={`nav-link ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} href="/blog">Blog</a>
//             </li>
//             <li className="nav-item">
//               <a className={`nav-link ${isLargeScreen() && scrolled ? 'text-white' : 'text-dark'}`} href="/contact-us">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;


"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./navbar.module.css";

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${scrolled ? 'bg-dark' : 'bg-light'}`}>
      <div className="container">
        <Link className="navbar-brand text-uppercase" href="/home">
          The Ri<span className={styles.logoText}>ders</span>
        </Link>

        <button
          className={`navbar-toggler ${scrolled ? 'text-white' : 'text-dark'}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? 'text-white' : 'text-dark'}`} href="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? 'text-white' : 'text-dark'}`} href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? 'text-white' : 'text-dark'}`} href="/our-service">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? 'text-white' : 'text-dark'}`} href="/our-classes">Classes</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? 'text-white' : 'text-dark'}`} href="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? 'text-white' : 'text-dark'}`} href="/contact-us">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
