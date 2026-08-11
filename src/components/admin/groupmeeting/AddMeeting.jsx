import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import GroupServices from "../../../services/GroupServices";
import MeetingServices from "../../../services/MeetingServices";

function AddMeeting(){
  const [link,setLink]= useState("");
  const [time,setTime]=useState("");
  const [date,setDate]=useState("");
  const [data,setData]=useState([]);
  const [group,setGroup]= useState("");


  const meetingLinks = [
  "https://meet.google.com/abc-defg-hij",
  "https://meet.google.com/klm-nopq-rst",
  "https://meet.google.com/uvw-xyza-bcd",
  "https://meet.google.com/efg-hijk-lmn",
  "https://meet.google.com/opq-rstu-vwx"
];
function setRandomLink() {
  const randomIndex = Math.floor(Math.random() * meetingLinks.length);
 setLink(meetingLinks[randomIndex]);
}



   useEffect(()=>{
      fetchData();
    },[])

  const fetchData=async()=>{
      let grpData= await GroupServices.All()
       setData(grpData);     
      }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    

    let data={
      link:link,
      date:date,
      time:time,
      group
    }
     console.log(data);
    
    let result=await MeetingServices.Add(data);
    console.log(result);
    
    if(result==1){
      toast.success("Meeting added successfully");
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
            <h1>Add Meeting</h1>
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
          <li className="current">Add Link
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
                  name="link"
                  placeholder="Link"
                  required=""
                  value={link}
                  
                  onChange={(e)=>{
                    setLink(e.target.value)
                  }}
                  
                />
                <i class="bi bi-arrow-clockwise" onClick={setRandomLink}></i>
              </div>

              <div className="col-md-8 ">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  placeholder="Date"
                  required=""
                  value={date}
                  onChange={(e)=>{
                    setDate(e.target.value)
                  }}
                  
                />
              </div>

              <div className="col-md-8 ">
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  placeholder="Time"
                  required=""
                  value={time}
                  onChange={(e)=>{
                    setTime(e.target.value)
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


              {/* <div className="col-md-8">
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
              </div> */}
            
              <div className="col-md-12 text-center">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
                <button type="submit">ADD</button>
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
export default AddMeeting;