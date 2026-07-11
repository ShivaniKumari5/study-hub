import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";

function AddProduct(){
  const [productName,setProductName]= useState("");
  const [description,setDescription]=useState("");
  const[price,setPrice]=useState();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    let data={
      productName:productName,
      description:description,
      price:price
    }
    let result=await ProductServices.Add(data);
    if(result==1){
      toast.success("Product added successfully");
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
            <h1>Add Product</h1>
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
          <li className="current">Add Product
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
                  onChange={(e)=>{
                    setProductName(e.target.value)
                  }}
                  
                />
              </div>

                <div className="col-md-8 ">
                <input
                  type="number"
                  className="form-control"
                  name="name"
                  placeholder="Price"
                  required=""
                  onChange={(e)=>{
                    setPrice(e.target.value)
                  }}
                  
                />
              </div>
              <div className="col-md-8">
                <textarea
                  name=" Product description"
                  value={description}
                  placeholder="Description"
                  rows={8}
                  cols={101}
                  onChange={(e) => setDescription(e.target.value)}
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
export default AddProduct;