
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
function ViewGroupDetails() {
      const [data, setData] = useState([]);
      useEffect(() => {
              fetchData();
          }, [])

  const fetchData = async () => {
 
         let uid= AuthServices.getUid()
         let data = await DoubtServices.All(uid);
         setData(data);
     }




 
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Manage Group</h1>
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
              <li className="current">View Group Details</li>
            </ol>
          </div>
        </nav>
      </div>
      {/* End Page Title */}
      {/* Contact Section */}
      <section id="contact" className="contact section">

        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4  justify-content-center align-items-center">

            <div className="col-lg-8 mt-5 ">
              {/* form here */}
              <table className="table "  >
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Group Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    {/* <th scope="col">Category</th> */}
                   

                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((el,i) => {
                      return <>
                        <tr>
                          <th scope="row">{i+1}</th>
                          <td>{el.groupName}</td>
                          <td>{el.description}</td>
                          <td><img width={50} src={el.Image} alt="" /></td>
                          {/* <td>{el.cateId}</td> */}
                          {/* <td>{
                            catedata?.find((c) => c.id == el.cateId)?.categoryName
                          } 
                          </td>*/}
                          
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
export default ViewGroupDetails;