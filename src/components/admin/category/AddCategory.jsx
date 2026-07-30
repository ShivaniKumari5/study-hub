import { useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CloudinaryServices from "../../../services/CloudinaryServices";


function AddCategory(){
  const [name,setName]= useState("");
  const [image,setImage]=useState();
  const [description,setDescription]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();

    let url = await CloudinaryServices.uploadImage(image);
    console.log(url);
    
    let data={
      name:name,
      description:description,
      image:url
    }
    // console.log(data);
    
    let result=await CategoryServices.Add(data);
    if(result==1){
      toast.success("Category added successfully");
    }
    else{
      toast.error("DB error");
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
            <h1>Add Category</h1>
            {/* <p className="mb-0">
              Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
              quo odio sint voluptas consequatur ut a odio voluptatem. Sit
              dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
              quaerat ipsum dolorem.
            </p> */}
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
          <li className="current">Add Category
            <Link to="/admin/addcategory"></Link>
          </li>
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
            // action="forms/contact.php"
            method="post"
            className="php-email-form"
            data-aos="fade-up"
            data-aos-delay={200}
            onSubmit={handleSubmit}
          >
            <div className="row gy-4 p-5 d-flex justify-content-center align-items-center">
             
              <div className="col-md-8 ">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  required=""
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  
                />
              </div>

                <div className="col-md-8 ">
                <input
                  type="file"
                  className="form-control"
                  name="name"
                  placeholder=""
                  required=""
              
                  onChange={(e)=>{
                    setImage(e.target.files[0]);
                  }}
                  
                />
              </div>
              <div className="col-md-8">
                <textarea
                className="form-control"
                  name="description"
                  value={description}
                  placeholder="Description"
                  rows={8}
                  cols={101}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                  {/* <textarea
                  className="form-control"
                  name="message"
                  rows={6}
                  placeholder="Message"
                  required=""
                  defaultValue={""}
                /> */}
              </div>
            
              <div className="col-md-12 text-center">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
                <button type="submit">Add</button>
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
export default AddCategory;