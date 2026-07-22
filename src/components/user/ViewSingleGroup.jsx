import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupServices from "../../services/GroupServices";
import GroupMemberServices from "../../services/GroupMemberServices";
import AuthServices from "../../services/AuthServices";
import NotesServices from "../../services/NotesServices";
function ViewSingleGroup() {
  const [data, setData] = useState();

  const {id}=useParams()

  const fetchData = async () => {
    const res = await GroupServices.single(id);
    console.log(res);
    setData(res);
  }

  useEffect(() => {
    fetchData()
  }, []);

  async function joinGroup (){
    const uid =await AuthServices.getUid();
    const groupId=id;
    console.log(uid,groupId);
    
    const data={
      uid:uid,
      groupId:id
    }
    
    const result= await GroupMemberServices.Add(data);
  }
  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>View singleGroup</h1>
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
   */}


   <div className="container py-5">
  {data && (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card shadow-sm border-0">
          <img
            src={data.Image}
            className="card-img-top"
            alt={data.groupName}
            style={{
              height: "300px",
              objectFit: "cover",
            }}
          />

          <div className="card-body">
            <h3 className="card-title">{data.groupName}</h3>
            <p className="card-text text-muted">
              {data.description}
            </p>
            {/* <Link to=""  className="btn btn-primary">Join</Link> */}
            <button className="btn btn-primary" onClick={joinGroup}>Join</button>

          </div>
        </div>
      </div>
    </div>
  )}
</div>
</main>

    </>
  )


}

export default ViewSingleGroup;