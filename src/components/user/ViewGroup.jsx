import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupServices from "../../services/GroupServices";
function ViewGroup() {
  const [data, setData] = useState([]);

  const {id}=useParams()

  const fetchData = async () => {
    const res = await GroupServices.All(id);
    setData(res);
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>View Group</h1>
                  <p className="mb-0">
                    Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                    quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                    dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                    quaerat ipsum dolorem.
                  </p>
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
                <li className="current">View Group</li>
              </ol>
            </div>
          </nav>
        </div>
        {/* End Page Title */}
        {/* Courses Section */}
{/* 
<div className="container mt-5">
  <div className="row g-4">
    {data.map((el, index) => (
      <div className="col-md-4 mb-3" key={index}>
        <div className="card h-100" style={{ width: "18rem" }}>
          <img src={el.Image} className="card-img-top" alt={el.groupName} />

          <div className="card-body">
            <h5 className="card-title">{el.groupName}</h5>
            <p className="card-text">{el.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div> */}


<div className="container py-5">
  <div className="row g-4">
    {data.map((el) => (
      <div
        className="col-lg-4 col-md-6"
        key={el._id || el.id}
        data-aos="fade-up"
      >
        <div className="card h-100 shadow-sm border-0">
          <img
            src={el.Image}
            className="card-img-top"
            alt={el.groupName}
            style={{
              height: "250px",
              objectFit: "cover",
            }}
          />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              {el.groupName}
            </h5>

            <p className="card-text text-muted flex-grow-1">
              {el.description}
            </p>

            <div className="d-flex gap-3 mt-3">
              <Link to="">
                <i className="bi bi-facebook fs-5"></i>
              </Link>

              <Link to="">
                <i className="bi bi-instagram fs-5"></i>
              </Link>

              <Link to="">
                <i className="bi bi-twitter-x fs-5"></i>
              </Link>

              <Link to="">
                <i className="bi bi-linkedin fs-5"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  
</main>

    </>
  )


}

export default ViewGroup;