import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DoubtServices from "../../../services/DoubtServices";

function ViewDoubt() {

  const [doubt, setDoubt] = useState([]);
  const [replyModal, setReplyModal] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [reply, setReply] = useState("");


  useEffect(() => {
    fetchDoubt();
  }, [])

  const fetchDoubt = async () => {
    let data = await DoubtServices.All();
    console.log(data);
    setDoubt(data);
  }

  const handleReply = async (e) => {
    e.preventDefault();

    if (!reply.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    let ans = await DoubtServices.Update(
      {
        MessageAdmin: reply
      },
      selectedDoubt.id
    );

    if (ans === 1) {

      toast.success("Reply sent successfully");

      setReply("");
      setSelectedDoubt(null);
      setReplyModal(false);

      // Get updated doubts
      fetchDoubt();

    } else {
      toast.error("Failed to send reply");
    }
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>View Doubts</h1>
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
                  <th scope="col">Student</th>
                  <th scope="col">Group</th>
                  <th scope="col">Doubt</th>
                  <th scope="col">Status</th>
                  <th scope="col">Admin Reply</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {/* {meetings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-4 text-muted">
                      No group meetings found. <Link to="/admin/addmeeting">Add one now</Link>.
                    </td>
                  </tr>
                ) : (
                  meetings.map((el, index) => {
                    const groupObj = groups.find(
                      (g) => String(g.id) === String(el.groupId) || String(g.id) === String(el.group)
                    );
                    return (
                      <tr key={el.id || index}>
                        <th scope="row">{index + 1}</th>
                        <td className="fw-bold text-start">{el.title || "Group Meeting"}</td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {groupObj ? groupObj.groupName : "All Groups"}
                          </span>
                        </td>
                        <td>{el.meetingDate || "N/A"}</td>
                        <td>{el.meetingTime || "N/A"}</td>
                        <td className="text-start small text-truncate" style={{ maxWidth: "200px" }}>
                          {el.description || "No description"}
                        </td>
                        <td>
                          <a
                            href={el.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="bi bi-box-arrow-up-right me-1"></i> Test Link
                          </a>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteMeeting(el.id)}
                            className="btn btn-danger btn-sm"
                            title="Delete Meeting"
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )} */}

                {doubt.map((item, index) => (

                  <tr key={item.id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.studentName}
                    </td>

                    <td>
                      {item.groupName}
                    </td>

                    <td>
                      {item.MessageStudent}
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "pending"
                            ? "badge bg-warning text-dark"
                            : "badge bg-success"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.MessageAdmin || "No reply yet"}
                    </td>

                    <td>

                      {item.status === "pending" ? (

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setSelectedDoubt(item);
                            setReply("");
                            setReplyModal(true);
                          }}
                        >
                          <i className="bi bi-reply me-1"></i>
                          Reply
                        </button>

                      ) : (

                        <span className="text-success">
                          <i className="bi bi-check-circle"></i>
                          Answered
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>
            </table>


            {replyModal && (

  <div
    className="modal show d-block"
    tabIndex="-1"
    style={{
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 1055
    }}
  >

    <div className="modal-dialog modal-dialog-centered">

      <div className="modal-content">

        <div className="modal-header">

          <h5 className="modal-title">
            <i className="bi bi-reply me-2"></i>
            Reply to Doubt
          </h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setReplyModal(false);
              setReply("");
              setSelectedDoubt(null);
            }}
          ></button>

        </div>

        <form onSubmit={handleReply}>

          <div className="modal-body">

            {selectedDoubt && (

              <>

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Student
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={selectedDoubt.studentName}
                    readOnly
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Student's Doubt
                  </label>

                  <div className="p-3 bg-light border rounded">
                    {selectedDoubt.MessageStudent}
                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Your Reply
                  </label>

                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your answer..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  ></textarea>

                </div>

              </>

            )}

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setReplyModal(false);
                setReply("");
                setSelectedDoubt(null);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              <i className="bi bi-send me-1"></i>
              Send Reply
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ViewDoubt;
