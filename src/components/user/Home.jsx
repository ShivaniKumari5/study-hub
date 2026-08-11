import { Link } from "react-router-dom";

function Home(){
    return(

  <main className="main">
  {/* Hero Section */}
  <section id="hero" className="hero section dark-background">
    {/* <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" /> */}
    <img src="/assets/img/hero-bg.jpg" alt="" />
    
    <div className="container">
      <h2 data-aos="fade-up" data-aos-delay={100}>
        Learning Today,
        <br />
        Leading Tomorrow
      </h2>
      <p data-aos="fade-up" data-aos-delay={200}>
        We are team of talented designers making websites with Bootstrap
      </p>
      <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay={300}>
        <Link to="/courses" className="btn-get-started">
          Get Started
        </Link>
      </div>
    </div>
  </section>
  {/* /Hero Section */}
  {/* About Section */}
  <section id="about" className="about section">
    <div className="container">
      <div className="row gy-4">
        <div
          className="col-lg-6 order-1 order-lg-2"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <img src="/assets/img/about.jpg" className="img-fluid" alt="" />
        </div>
        <div
          className="col-lg-6 order-2 order-lg-1 content"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <h3>Voluptatem dignissimos provident quasi corporis</h3>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul>
            <li>
              <i className="bi bi-check-circle" />{" "}
              <span>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle" />{" "}
              <span>
                Duis aute irure dolor in reprehenderit in voluptate velit.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle" />{" "}
              <span>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate trideta
                storacalaperda mastiro dolore eu fugiat nulla pariatur.
              </span>
            </li>
          </ul>
          <Link to="" className="read-more">
            <span>Read More</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  </section>
  {/* /Linkbout Section */}
  {/* Counts Section */}
  <section id="counts" className="section counts light-background">
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row gy-4">
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
              data-purecounter-start={0}
              data-purecounter-end={1232}
              data-purecounter-duration={1}
              className="purecounter"
            />
            <p>Students</p>
          </div>
        </div>
        {/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
              data-purecounter-start={0}
              data-purecounter-end={64}
              data-purecounter-duration={1}
              className="purecounter"
            />
            <p>Courses</p>
          </div>
        </div>
        {/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
              data-purecounter-start={0}
              data-purecounter-end={42}
              data-purecounter-duration={1}
              className="purecounter"
            />
            <p>Events</p>
          </div>
        </div>
        {/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item text-center w-100 h-100">
            <span
              data-purecounter-start={0}
              data-purecounter-end={24}
              data-purecounter-duration={1}
              className="purecounter"
            />
            <p>Trainers</p>
          </div>
        </div>
        {/* End Stats Item */}
      </div>
    </div>
  </section>
  {/* /Counts Section */}
  {/* Why Us Section */}
  <section id="why-us" className="section why-us">
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
          <div className="why-box">
            <h3>Why Choose Our Products?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              aute irure dolor in reprehenderit Asperiores dolores sed et.
              Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio
              ad corporis.
            </p>
            <div className="text-center">
              <Link to="" className="more-btn">
                <span>Learn More</span> <i className="bi bi-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
        {/* End Why Box */}
        <div className="col-lg-8 d-flex align-items-stretch">
          <div className="row gy-4" data-aos="fade-up" data-aos-delay={200}>
            <div className="col-xl-4">
              <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                <i className="bi bi-clipboard-data" />
                <h4>Corporis voluptates officia eiusmod</h4>
                <p>
                  Consequuntur sunt aut quasi enim aliquam quae harum pariatur
                  laboris nisi ut aliquip
                </p>
              </div>
            </div>
            {/* End Icon Box */}
            <div className="col-xl-4" data-aos="fade-up" data-aos-delay={300}>
              <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                <i className="bi bi-gem" />
                <h4>Ullamco laboris ladore pan</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt
                </p>
              </div>
            </div>
            {/* End Icon Box */}
            <div className="col-xl-4" data-aos="fade-up" data-aos-delay={400}>
              <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                <i className="bi bi-inboxes" />
                <h4>Labore consequatur incidid dolore</h4>
                <p>
                  Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
                  maiores omnis facere
                </p>
              </div>
            </div>
            {/* End Icon Box */}
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Why Us Section */}
  {/* Features Section */}
  <section id="features" className="features section">
    <div className="container">
      <div className="row gy-4">
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="features-item">
            <i className="bi bi-eye" style={{ color: "ffbb2c" }} />
            <h3>
              <Link to="" className="stretched-link">
                Lorem Ipsum
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className="features-item">
            <i className="bi bi-infinity" style={{ color: "5578ff" }} />
            <h3>
              <Link to="" className="stretched-link">
                Dolor Sitema
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          <div className="features-item">
            <i className="bi bi-mortarboard" style={{ color: "e80368" }} />
            <h3>
              <Link to="" className="stretched-link">
                Sed perspiciatis
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={400}
        >
          <div className="features-item">
            <i className="bi bi-nut" style={{ color: "e361ff" }} />
            <h3>
              <Link to="" className="stretched-link">
                Magni Dolores
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={500}
        >
          <div className="features-item">
            <i className="bi bi-shuffle" style={{ color: "47aeff" }} />
            <h3>
              <Link to="" className="stretched-link">
                Nemo Enim
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={600}
        >
          <div className="features-item">
            <i className="bi bi-star" style={{ color: "ffa76e" }} />
            <h3>
              <Link to="" className="stretched-link">
                Eiusmod Tempor
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={700}
        >
          <div className="features-item">
            <i className="bi bi-x-diamond" style={{ color: "11dbcf" }} />
            <h3>
              <Link to="" className="stretched-link">
                Midela Teren
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={800}
        >
          <div className="features-item">
            <i className="bi bi-camera-video" style={{ color: "4233ff" }} />
            <h3>
              <Link to="" className="stretched-link">
                Pira Neve
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={900}
        >
          <div className="features-item">
            <i className="bi bi-command" style={{ color: "b2904f" }} />
            <h3>
              <Link to="" className="stretched-link">
                Dirada Pack
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={1000}
        >
          <div className="features-item">
            <i className="bi bi-dribbble" style={{ color: "b20969" }} />
            <h3>
              <Link to="" className="stretched-link">
                Moton Ideal
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={1100}
        >
          <div className="features-item">
            <i className="bi bi-activity" style={{ color: "ff5828" }} />
            <h3>
              <Link to="" className="stretched-link">
                Verdo Park
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
        <div
          className="col-lg-3 col-md-4"
          data-aos="fade-up"
          data-aos-delay={1200}
        >
          <div className="features-item">
            <i className="bi bi-brightness-high" style={{ color: "29cc61" }} />
            <h3>
              <Link to="" className="stretched-link">
                Flavor Nivelanda
              </Link>
            </h3>
          </div>
        </div>
        {/* End Feature Item */}
      </div>
    </div>
  </section>
  {/* /Features Section */}
  {/* Courses Section */}
  <section id="courses" className="courses section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Courses</h2>
      <p>Popular Courses</p>
    </div>
    {/* End Section Title */}
    <div className="container">
      <div className="row">
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="zoom-in"
          data-aos-delay={100}
        >
          <div className="course-item">
            <img
              src="assets/img/course-1.jpg"
              className="img-fluid"
              alt="..."
            />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Web Development</p>
                <p className="price">$169</p>
              </div>
              <h3>
                <Link to="course-details.html">Website Design</Link>
              </h3>
              <p className="description">
                Et architecto provident deleniti facere repellat nobis iste. Id
                facere quia quae dolores dolorem tempore.
              </p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-1-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <Link to="" className="trainer-link">
                    Antonio
                  </Link>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;50 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;65
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End Course Item*/}
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
          data-aos="zoom-in"
          data-aos-delay={200}
        >
          <div className="course-item">
            <img
              src="assets/img/course-2.jpg"
              className="img-fluid"
              alt="..."
            />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Marketing</p>
                <p className="price">$250</p>
              </div>
              <h3>
                <Link to="course-details.html">Search Engine Optimization</Link>
              </h3>
              <p className="description">
                Et architecto provident deleniti facere repellat nobis iste. Id
                facere quia quae dolores dolorem tempore.
              </p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-2-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <Link to="" className="trainer-link">
                    Lana
                  </Link>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;35 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;42
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End Course Item*/}
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
          data-aos="zoom-in"
          data-aos-delay={300}
        >
          <div className="course-item">
            <img
              src="assets/img/course-3.jpg"
              className="img-fluid"
              alt="..."
            />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="category">Content</p>
                <p className="price">$180</p>
              </div>
              <h3>
                <Link to="course-details.html">Copywriting</Link>
              </h3>
              <p className="description">
                Et architecto provident deleniti facere repellat nobis iste. Id
                facere quia quae dolores dolorem tempore.
              </p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img
                    src="assets/img/trainers/trainer-3-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <Link to="" className="trainer-link">
                    Brandon
                  </Link>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bi bi-person user-icon" />
                  &nbsp;20 &nbsp;&nbsp;
                  <i className="bi bi-heart heart-icon" />
                  &nbsp;85
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End Course Item*/}
      </div>
    </div>
  </section>
  {/* /Courses Section */}
  {/* Trainers Index Section */}
  <section id="trainers-index" className="section trainers-index">
    <div className="container">
      <div className="row">
        <div
          className="col-lg-4 col-md-6 d-flex"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="member">
            <img
              src="assets/img/trainers/trainer-1.jpg"
              className="img-fluid"
              alt=""
            />
            <div className="member-content">
              <h4>Walter White</h4>
              <span>Web Development</span>
              <p>
                Magni qui quod omnis unde et eos fuga et exercitationem. Odio
                veritatis perspiciatis quaerat qui aut aut aut
              </p>
              <div className="social">
                <Link to="">
                  <i className="bi bi-twitter-x" />
                </Link>
                <Link to="">
                  <i className="bi bi-facebook" />
                </Link>
                <Link to="">
                  <i className="bi bi-instagram" />
                </Link>
                <Link to="">
                  <i className="bi bi-linkedin" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Team Member */}
        <div
          className="col-lg-4 col-md-6 d-flex"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className="member">
            <img
              src="assets/img/trainers/trainer-2.jpg"
              className="img-fluid"
              alt=""
            />
            <div className="member-content">
              <h4>Sarah Jhinson</h4>
              <span>Marketing</span>
              <p>
                Repellat fugiat adipisci nemo illum nesciunt voluptas
                repellendus. In architecto rerum rerum temporibus
              </p>
              <div className="social">
                <Link to="">
                  <i className="bi bi-twitter-x" />
                </Link>
                <Link to="">
                  <i className="bi bi-facebook" />
                </Link>
                <Link to="">
                  <i className="bi bi-instagram" />
                </Link>
                <Link to="">
                  <i className="bi bi-linkedin" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Team Member */}
        <div
          className="col-lg-4 col-md-6 d-flex"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          <div className="member">
            <img
              src="assets/img/trainers/trainer-3.jpg"
              className="img-fluid"
              alt=""
            />
            <div className="member-content">
              <h4>William Anderson</h4>
              <span>Content</span>
              <p>
                Voluptas necessitatibus occaecati quia. Earum totam consequuntur
                qui porro et laborum toro des clara
              </p>
              <div className="social">
                <Link to="">
                  <i className="bi bi-twitter-x" />
                </Link>
                <Link to="">
                  <i className="bi bi-facebook" />
                </Link>
                <Link to="">
                  <i className="bi bi-instagram" />
                </Link>
                <Link to="">
                  <i className="bi bi-linkedin" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Team Member */}
      </div>
    </div>
  </section>
  {/* /Trainers Index Section */}
</main>


  // {/* <Link to="“https://themewagon.com">{/* Scroll Top */}</Link>
  // <Link
  //   to=""
  //   id="scroll-top"
  //   className="scroll-top d-flex align-items-center justify-content-center"
  // >
  //   <i className="bi bi-arrow-up-short" />
  // </Link> */}
  // {/* Preloader
  // <div id="preloader" /> */}


    )
}


//  function Home() {
//   const features = [
//     {
//       title: "Analytics",
//       icon: "📊",
//       description: "Track profile views and link clicks with detailed insights.",
//     },
//     {
//       title: "Themes",
//       icon: "🎨",
//       description: "Customize your page with beautiful themes and colors.",
//     },
//     {
//       title: "Unlimited Links",
//       icon: "🔗",
//       description: "Add all your important links without any limits.",
//     },
//     {
//       title: "QR Code",
//       icon: "📱",
//       description: "Generate a QR code for quick profile sharing.",
//     },
//   ];

//   return (
//     <>
//      <main className="bg-gray-50 text-gray-800">

//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">

//           <div>
//             <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//               One Link.
//               <br />
//               <span className="text-blue-600">Every Connection.</span>
//             </h1>

//             <p className="mt-6 text-lg text-gray-600">
//               Create a beautiful page to share all your important links in one
//               place. Perfect for creators, businesses, freelancers, and students.
//             </p>

//             <div className="mt-8 flex gap-4">
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
//                 Get Started
//               </button>

//               <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
//                 View Demo
//               </button>
//             </div>
//           </div>

//           {/* Phone Mockup */}
//           <div className="flex justify-center">
//             <div className="w-72 rounded-3xl bg-white shadow-2xl p-6 border">
//               <div className="text-center">
//                 <div className="w-20 h-20 rounded-full bg-blue-500 mx-auto mb-4"></div>

//                 <h3 className="text-xl font-bold">John Doe</h3>

//                 <p className="text-gray-500 mb-6">
//                   Web Developer
//                 </p>

//                 <div className="space-y-3">
//                   <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
//                     🌐 Portfolio
//                   </button>

//                   <button className="w-full bg-gray-100 py-2 rounded-lg">
//                     📺 YouTube
//                   </button>

//                   <button className="w-full bg-gray-100 py-2 rounded-lg">
//                     💼 LinkedIn
//                   </button>

//                   <button className="w-full bg-gray-100 py-2 rounded-lg">
//                     📷 Instagram
//                   </button>

//                   <button className="w-full bg-gray-100 py-2 rounded-lg">
//                     🐙 GitHub
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* Features */}
//       <section className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-6">

//           <h2 className="text-4xl font-bold text-center">
//             Everything You Need
//           </h2>

//           <p className="text-center text-gray-600 mt-3">
//             Powerful tools to help you share your online presence.
//           </p>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
//             {features.map((feature) => (
//               <div
//                 key={feature.title}
//                 className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
//               >
//                 <div className="text-5xl mb-4">
//                   {feature.icon}
//                 </div>

//                 <h3 className="text-xl font-semibold mb-3">
//                   {feature.title}
//                 </h3>

//                 <p className="text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-6">

//           <h2 className="text-4xl font-bold text-center">
//             How It Works
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">

//             <div>
//               <div className="text-5xl mb-4">1️⃣</div>
//               <h3 className="font-bold text-xl mb-2">
//                 Register
//               </h3>
//               <p className="text-gray-600">
//                 Create your free LinkHub account.
//               </p>
//             </div>

//             <div>
//               <div className="text-5xl mb-4">2️⃣</div>
//               <h3 className="font-bold text-xl mb-2">
//                 Add Your Links
//               </h3>
//               <p className="text-gray-600">
//                 Include social media, websites, portfolios, and more.
//               </p>
//             </div>

//             <div>
//               <div className="text-5xl mb-4">3️⃣</div>
//               <h3 className="font-bold text-xl mb-2">
//                 Share Anywhere
//               </h3>
//               <p className="text-gray-600">
//                 Share one LinkHub URL across every platform.
//               </p>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* CTA */}
//       <section className="bg-blue-600 text-white py-20">
//         <div className="max-w-4xl mx-auto text-center px-6">

//           <h2 className="text-4xl font-bold">
//             Ready to Build Your LinkHub?
//           </h2>

//           <p className="mt-4 text-lg text-blue-100">
//             Create your free profile today and share everything with one link.
//           </p>

//           <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
//             Register Now
//           </button>

//         </div>
//       </section>

//     </main>
//     </>
   
//   );
// }
export default Home;