import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with your actual API call (e.g., ContactServices.Add(formData))
    try {
      // Example:
      // const result = await ContactServices.Add(formData);
      // if (result === 1) {
      //   toast.success("Your message has been sent. Thank you!");
      //   setFormData({ name: "", email: "", subject: "", message: "" });
      // } else {
      //   toast.error("Something went wrong. Please try again.");
      // }

      // Temporary success simulation
      toast.success("Your message has been sent. Thank you!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Contact Study Group</h1>
                <p className="mb-0">
                  Have a question, suggestion, or need help? Reach out to us
                  and we'll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="current">Contact</li>
            </ol>
          </div>
        </nav>
      </div>
      {/* End Page Title */}

      {/* Contact Section */}
      <section id="contact" className="contact section">
        {/* Google Maps */}
        <div className="mb-5" data-aos="fade-up" data-aos-delay={200}>
          <iframe
            style={{ border: 0, width: "100%", height: 300 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Study Group Location"
          />
        </div>
        {/* End Google Maps */}

        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Our Office</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+9199165423</p>
                  <p className="small text-muted mb-0">Mon – Sat, 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={500}>
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>studygroup@gmail.com</p>
                  <p className="small text-muted mb-0">We reply within 24 hours</p>
                </div>
              </div>
            </div>
            {/* End Contact Information */}

            {/* Contact Form */}
            <div className="col-lg-8">
              <form
                onSubmit={handleSubmit}
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
      {/* End Contact Section */}
    </main>
  );
}

export default Contact;