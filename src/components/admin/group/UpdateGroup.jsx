import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import GroupServices from "../../../services/GroupServices";
import CloudinaryServices from "../../../services/CloudinaryServices";
import CategoryServices from "../../../services/CategoryServices";



function UpdateGroup(){
  const [groupName,setGroupName]= useState("");
  const [description,setDescription]=useState("");
  const [imageUrl,setImageUrl]=useState("");
  const [image,setImage]=useState();

  const [cate,setCate]=useState("");
  const [data,setData]=useState([]);

  const { id } = useParams();
  const nav =useNavigate()
  

  useEffect(()=>{
    fetchData(),
    fetchDataCategory()
  },[]);


   const fetchDataCategory=async()=>{
         let categoryData=  await CategoryServices.All();
         setData(categoryData);     
        }

  const fetchData = async()=>{
    let data= await GroupServices.single(id);
    console.log(data);
    setGroupName(data.groupName);
    setDescription(data.description);
    setImageUrl(data.image);
    setCate(data.cate);

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    // let url = await CloudinaryServices.uploadImage(image);
    // console.log(url);

    let url =imageUrl;
    if(!!image){
    url= await CloudinaryServices.uploadImage(image);
    }

    let data={
      groupname:groupName,
      description:description,
      image:url,
      cate
    
    }
    console.log(data);
    
    let result=await GroupServices.Update(data,id);
    if(result==1){
      toast.success("Group updated successfully");
      nav("/admin/manageGroup");
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
            <h1>Update Group</h1>
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
          <li className="current">Update Group
            <Link to="/admin/updateGroup"></Link>
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
                  value={groupName}
                  onChange={(e)=>{
                    setGroupName(e.target.value)
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
               

               <div className="col-md-8 ">
              
                <select className="form-control" value={cate} onChange={(el)=>{
                  setCate(el.target.value)
                }}>
                  <option >choose one</option>
                  {
                    data.map((el)=>{
                     return  <option value={el.id}>{el.categoryName}</option>
                    } 
                    )
                  }
                </select>
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
              </div>
            
              <div className="col-md-12 text-center">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
                <button type="submit">Update</button>
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
export default UpdateGroup;