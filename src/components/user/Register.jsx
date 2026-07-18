import { Link } from "react-router-dom";
import { useState } from "react";
import UserServices from "../../services/UserServices";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CloudinaryServices from "../../services/CloudinaryServices";

function  Register(){
 

 const nav= useNavigate();
 const [name,setName]=useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [contact,setContact]=useState("");
 const [profile,setProfile]=useState("");
 const [address,setAddress]=useState("");

 
const handleChange= async (e)=>{
e.preventDefault();
let imageUrl=await CloudinaryServices.uploadImage(profile);
  console.log(imageUrl);
  
 const userData={
    name,
    email,
    password,
    contact,
    profile:imageUrl,
    address
 }
    let result = await UserServices.Register(userData);
    console.log(result);

    if(result==1){
      toast.success(" Register & loggedin successfully")
      nav('/admin');
    }
    else if(result==2){
      nav('/');
    }
    else{
      toast.error("invadiad details")
    }
  }

     return(
        <main className="main">
  {/* Page Title */}
  <div className="page-title" data-aos="fade">
    <div className="heading">
      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-8">
            <h1>Register</h1>
           
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
          <li className="current">Register</li>
        </ol>
      </div>
    </nav>
  </div>
  {/* End Page Title */}
  {/* Contact Section */}
  <section id="contact" className="contact section">
    
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row gy-4">
        
        <div className="col-lg-12">
          <form
            action="forms/contact.php"
            method="post"
            className="php-email-form"
            data-aos="fade-up"
            data-aos-delay={200}
            onSubmit={handleChange}
          >
            <div className="row gy-4 p-5 d-flex justify-content-center align-items-center">
             
              <div className="col-md-8 ">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  required=""
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-8">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  required=""
                  value={email} 
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required=""
                  value={password} 
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}
                />
              </div>
                <div className="col-md-8">
                <input
                  type="number"
                  className="form-control"
                  name="contact"
                  placeholder="Contact"
                  required=""
                  value={contact} 
                  onChange={(e)=>{
                    setContact(e.target.value);
                  }}
                />
              </div>

               <div className="col-md-8">
                <input
                  type="file"
                  className="form-control"
                  name="name"
                  placeholder="Profile"
                  required=""
                  
                  onChange={(e)=>{
                    setProfile(e.target.files[0]);
                  }}
                />
              </div>

                 <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  required=""
                  value={address} 
                  onChange={(e)=>{
                    setAddress(e.target.value);
                  }}
                />
              </div>

              
            
              <div className="col-md-12 text-center">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
        {/* End Contact Form */}
      </div>
    </div>
  </section>
  {/* /Contact Section */}
</main>


    )
}
export default Register;