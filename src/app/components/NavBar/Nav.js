import Link from "next/link";
import styles from "./navbar.module.css"
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand text-uppercase" href="/">
          {/* <img src="/logo.svg" alt="Logo" width="30" height="30" className="d-inline-block align-top" /> */}
          The Ri<span className={styles.logoText}>ders</span>
        </a>

        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/our-service">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/our-classes">Classes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
