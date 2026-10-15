import { Link } from "react-router-dom";

function UserFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer id="footer" className="footer position-relative light-background">
        <div className="container footer-top">
          <div className="row gy-4">
            {/* About Section */}
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="logo d-flex align-items-center">
                <span className="sitename">Study Group</span>
              </Link>
              <div className="footer-contact pt-3">
                <p>
                  Study Group is a collaborative learning platform built to help
                  students access notes, join live meetings, ask doubts, and
                  grow together — anytime, anywhere.
                </p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+9199165423</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>studygroup@gmail.com</span>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <i className="bi bi-twitter-x" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="bi bi-facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>

            {/* Quick Access */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Quick Access</h4>
              <ul>
                <li><Link to="/viewGroup">Browse Groups</Link></li>
                <li><Link to="/viewGroup">Study Notes</Link></li>
                <li><Link to="/viewGroup">Live Meetings</Link></li>
                <li><Link to="/viewGroup">Ask a Doubt</Link></li>
                <li><Link to="/viewGroup">Join a Group</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>
                Subscribe to our newsletter and stay updated with new courses,
                study resources, and live sessions!
              </p>
              <form
                action="forms/newsletter.php"
                method="post"
                className="php-email-form"
              >
                <div className="newsletter-form">
                  <input type="email" name="email" placeholder="Enter your email" required />
                  <input type="submit" defaultValue="Subscribe" />
                </div>
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your subscription request has been sent. Thank you!
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="container copyright text-center mt-4">
          <p>
            © <span>{currentYear}</span>{" "}
            <strong className="px-1 sitename">Study Group</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            Designed &amp; Developed by the{" "}
            <strong>Study Group Team</strong>
          </div>
        </div>
      </footer>
    </>
  );
}

export default UserFooter;