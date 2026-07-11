import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { toast } from "react-toastify";

function UserHeader(){
  const nav =useNavigate();
   let isLogin= AuthServices.getIsLogin();
   
   const logout=()=>{
    AuthServices.clearData();
    toast.info("Logout");
    nav("/login")
   }
    return(
        <>
         <header id="header" className="header d-flex align-items-center sticky-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center">
      <Link to="/" className="logo d-flex align-items-center me-auto">
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="assets/img/logo.png" alt=""> */}
        <h1 className="sitename">Mentor</h1>
      </Link>
      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <Link to="/" className="active">
              Home
              <br />
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/trainers">Trainers</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li className="dropdown">
            <Link to="/dropdown">
              <span>Dropdown</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </Link>
            <ul>
              <li>
                <Link to="">Dropdown 1</Link>
              </li>
              <li className="dropdown">
                <Link to="">
                  <span>Deep Dropdown</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </Link>
                <ul>
                  <li>
                    <Link to="">Deep Dropdown 1</Link>
                  </li>
                  <li>
                    <Link to="">Deep Dropdown 2</Link>
                  </li>
                  <li>
                    <Link to="">Deep Dropdown 3</Link>
                  </li>
                  <li>
                    <Link to="">Deep Dropdown 4</Link>
                  </li>
                  <li>
                    <Link to="">Deep Dropdown 5</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="">Dropdown 2</Link>
              </li>
              <li>
                <Link to="">Dropdown 3</Link>
              </li>
              <li>
                <Link to="">Dropdown 4</Link>
              </li>
            </ul>
          </li>
          {
             isLogin?<li><button onClick={logout} className="btn btn-danger"></button></li>:
          <li>
            <Link to="/login">Login</Link>
          </li>

          }
         
          
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list" />
      </nav>
      <Link className="btn-getstarted" to="/courses">
        Get Started
      </Link>
    </div>
  </header>
        
        </>

    )
}
export default UserHeader;