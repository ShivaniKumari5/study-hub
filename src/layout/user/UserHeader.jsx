import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { toast } from "react-toastify";

function UserHeader() {
  const nav = useNavigate();
  let isLogin = AuthServices.getIsLogin();

  const logout = () => {
    AuthServices.clearData();
    toast.info("Logout");
    nav("/login")
  }
  return (
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
                <Link to="/ViewCategory">ViewCategory</Link>
              </li>
              <li>
                <Link to="/ViewGroup">ViewGroup</Link>
              </li>
              <li><Link to="/viewreply">ViewReply</Link></li>

              {!isLogin && (
                <li><Link to="/register" className="btn btn-getstarted">Register</Link></li>     
              )}

              
              {isLogin ? (
                <li><button onClick={logout} className="btn btn-getstarted">Logout</button></li>
              ) : (
                <li><Link to="/login" className="btn btn-getstarted">Login</Link></li>
              )}

           
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            

            </ul>

            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
        
        </div>
      </header>

    </>

  )
}
export default UserHeader;