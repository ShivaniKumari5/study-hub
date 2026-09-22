import { useEffect, useState } from "react";
import DoubtServices from "../../services/DoubtServices";
import AuthServices from "../../services/AuthServices";

function ViewReply() {

    const [Data, setData] = useState([]);
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
                                <h1>View Reply</h1>
                                <p className="mb-0">Student's Doubt</p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    {/* <div className="container">
            <ol>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li className="current">Manage Meetings</li>
            </ol>
          </div> */}
                </nav>
            </div>

            <section className="section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>


                    <div className="table-responsive shadow-sm rounded">
                        <table className="table table-bordered table-hover align-middle mb-0">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">StudentName</th>
                                    <th scope="col">GroupName</th>
                                    <th scope="col">Doubt</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Admin Reply</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    Data.map((el,i) => {
                                        return <>
                                            <tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{el.studentName}</td>
                                                <td>{el.groupName}</td>
                                                 <td>{el.MessageStudent}</td>
                                                <td>{el.status}</td>
                                                <td>{el.MessageAdmin}</td>
                                            </tr>
                                        </>
                                    })
                                }



                            </tbody>
                        </table>



                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewReply;
