import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AdminHeader(){
  // const nav=useNavigate();
  // isLogin= AuthServices.getIsLogin();

  const nav =useNavigate();
   let isLogin= AuthServices.getIsLogin();
   




   const logout=()=>{


    Swal.fire({
  title: "confirm Logout",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, logout"
}).then((result) => {
  if (result.isConfirmed) {
        AuthServices.clearData();
    toast.info("Logout");
    nav("/login") 
    
  //   Swal.fire({
  //   title: "L<o",
  //   text: "Your file has been deleted.",
  //   icon: "success"
  // });
  }
    
    
   
});



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
            <Link to="/admin/addcategory">Add Category</Link>
          </li>
           
          <li>
            <Link to="/admin/addproduct">Add Product</Link>
          </li>
           <li>
            <Link to="/admin/manageCategory">Manage Category</Link>
          </li>

            {
             isLogin?<li><button onClick={logout} className="btn btn-danger">Logout</button></li>:
          <li>
            <Link to="/login">Login</Link>
          </li>

          }
        
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list" />
      </nav>
      
    </div>
  </header>
        
        </>

    )
}
export default AdminHeader;