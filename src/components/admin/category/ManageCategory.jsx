import { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";
import CategoryServices from "../../../services/CategoryServices";
import { toast } from "react-toastify";
function ManageCategory(){
  const [Data,setData]=useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData=async()=>{
   let cateData=  await CategoryServices.All()
   setData(cateData);
    
  }
  const cateDelete=async(id)=>{
    console.log(id);
    let res= await CategoryServices.deleteCate(id);
    if(res == 1){
      toast.success("Item deleted");
      fetchData()
    }
    else{
      toast.error("Item not deleted");
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
            <h1>Manage Category</h1>
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
          <li className="current">Manage Category</li>
        </ol>
      </div>
    </nav>
  </div>
  {/* End Page Title */}
  {/* Contact Section */}
  <section id="contact" className="contact section">
    
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row gy-4  justify-content-center align-items-center">
      
        <div className="col-lg-8 ">
          {/* form here */}

 <table class="table">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Category Name</th>
      <th scope="col">Description</th>
      <th scope="col">Image</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
     {
      Data.map((el)=>{
        return <>
        <tr>
          <th scope="row">1</th>
          <td>{el.categoryName}</td>
          <td>{el.description}</td>
          <td><img width={50} src={el.Image} alt="" /></td>
          <td><button onClick={(id)=>{
            cateDelete(el.id);
          }}  className="btn btn-danger">Delete</button></td>
          
          <td><Link to={"/admin/updateCategory/"+ el.id} className="btn btn-primary">Update</Link></td>

          <td>{el.status?"Active":"Block"}</td>
        </tr>
        </>
      })
     }


   
  </tbody>
</table>
          
        </div>
        {/* End Contact Form */}
      </div>
    </div>
  </section>
  {/* /Contact Section */}
</main>


    )
}
export default ManageCategory;