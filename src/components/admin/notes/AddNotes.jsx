import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CloudinaryServices from "../../../services/CloudinaryServices";
import GroupServices from "../../../services/GroupServices";
import NotesServices from "../../../services/NotesServices";

function AddNotes(){
  const [title,setTitle]= useState("");
  const [description,setDescription]=useState("");
  const [fileUrl,setFileUrl]=useState();
  const [data,setData]=useState([]);
  const [group,setGroup]= useState("");


   useEffect(()=>{
      fetchData();
    },[])

  const fetchData=async()=>{
      let grpData= await GroupServices.All()
       setData(grpData);     
      }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if (fileUrl && fileUrl.name && !fileUrl.name.toLowerCase().endsWith('.pdf') && fileUrl.type !== 'application/pdf') {
      toast.error("Only PDF files (.pdf) are allowed!");
      return;
    }

    let url = await CloudinaryServices.uploadFile(fileUrl);
    console.log(url);

    let data={
      title:title,
      description:description,
      fileUrl:url,
      group
    }
    console.log(data);
    
    let result=await NotesServices.Add(data);
    console.log(result);
    
    if(result==1){
      toast.success("Notes added successfully");
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
            <h1>Add Notes</h1>
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
          <li className="current">Add Notes
            <Link to="/admin/addgroup"></Link>
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
                  name="title"
                  placeholder="Title"
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
                  accept=".pdf,application/pdf"
              
                  onChange={(e)=>{
                    setFileUrl(e.target.files[0]);
                  }}
                  
                />
              </div>

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
export default AddNotes;