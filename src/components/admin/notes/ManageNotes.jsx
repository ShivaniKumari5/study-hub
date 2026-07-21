import { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";
import { toast } from "react-toastify";
import NotesServices from "../../../services/NotesServices";
import GroupServices from "../../../services/GroupServices";

function ManageNotes() {

  const [data, setData] = useState([]);
  const [grpdata, setGroupData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDataGroup();
  }, [])

  const fetchDataGroup = async (req, res) => {
    let groupData = await GroupServices.All();
    console.log(groupData);
    setGroupData(groupData);
  }


  const fetchData = async () => {
    let notesData = await NotesServices.All()
    console.log(notesData);
    setData(notesData);
  }


  const deleteNotes = async (id) => {
    console.log(id);
    let res = await NotesServices.Delete(id);
    if (res == 1) {
      toast.success("Notes  deleted");
      fetchData()
    }
    else {
      toast.error("Notes not deleted");
    }
  }
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Manage Notes</h1>
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
              <li className="current">Manage Notes</li>
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
                    <th scope="col">Notes</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Group</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((el) => {
                      return <>
                        <tr>
                          <th scope="row">1</th>
                          <td>{el.title}</td>
                          <td>{el.description}</td>
                          <td><img width={50} src={el.fileUrl} alt="" /></td>
                          {/* <td>
  <a
    href={el.fileUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary btn-sm"
  >
    View PDF
  </a>
</td> */}

                          {/* <td>{el.cateId}</td>    group*/ }
                          <td>{
                            grpdata?.find((c) => c.id == el.groupId)?.groupName
                          }
                          </td>
                          <td><button onClick={(id) => {
                            deleteNotes(el.id);
                          }} className="btn btn-danger">Delete</button></td>

                          <td><Link to={"/admin/updateNotes/" + el.id} className="btn btn-primary">Update</Link></td>

                          <td>{el.status ? "Active" : "Block"}</td>
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
export default ManageNotes;