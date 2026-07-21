import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import GroupServices from "../../../services/GroupServices";
import CloudinaryServices from "../../../services/CloudinaryServices";
import CategoryServices from "../../../services/CategoryServices";
import NotesServices from "../../../services/NotesServices";


function UpdateNotes(){
  const [description,setDescription]=useState("");
  const [title,setTitle]=useState("");
  const [fileUrl,setFileUrl]=useState();
  const [group,setGroup]= useState("");

  const [groupData,setGroupData]= useState();
  const [data,setData]=useState([]);

  const { id } = useParams();
  const nav =useNavigate()


  useEffect(()=>{
    fetchData(),
    fetchGroupData()
  },[]);


 const fetchGroupData=async()=>{
      let grpData= await GroupServices.All()
       setData(grpData);     
      }

  const fetchData = async()=>{
    let data= await NotesServices.single(id);
    console.log(data);
    setTitle(data.title);
    setDescription(data.description);
    setFileUrl(data.fileUrl);
    setGroupData(data.groupData);

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    let url =fileUrl;
    if(!!fileUrl){
    url= await CloudinaryServices.uploadImage(fileUrl);
    }

    let data={
     title:title,
      description:description,
      fileUrl:url,
      group
    }
    console.log(data);
    
    let result=await NotesServices.Update(data,id);
    if(result==1){
      toast.success("Notes updated successfully");
      nav("/admin/managenotes");
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
            <h1>Update Notes</h1>
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
          <li className="current">Update Notes
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
                  placeholder="Notes"
                  required=""
                  value={title}
                  onChange={(e)=>{
                    setTitle(e.target.value)
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
                    setFileUrl(e.target.files[0]);
                  }}
                  
                />
              </div>
               

               {/* <div className="col-md-8 ">
              
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
              </div> */}
               <div className="col-md-8 ">
              
                <select className="form-control" value={group} onChange={(el)=>{
                  setGroup(el.target.value)
                }}>
                  <option >choose one</option>
                  {
                    data.map((el)=>{
                     return  <option value={el.id}>{el.groupName}</option>
                    } 
                    )
                  }
                </select>
              </div>

                
              <div className="col-md-8">
                <textarea
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
export default UpdateNotes;