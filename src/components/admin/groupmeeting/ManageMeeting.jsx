import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MeetingServices from "../../../services/MeetingServices";
import GroupServices from "../../../services/GroupServices";

function ManageMeeting() {
  const [meetings, setMeetings] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let meetingData = await MeetingServices.All();
    let groupData = await GroupServices.All();
    setMeetings(meetingData || []);
    setGroups(groupData || []);
  };

  const deleteMeeting = (id) => {
    Swal.fire({
      title: "Delete Meeting Link?",
      text: "Are you sure you want to remove this meeting?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await MeetingServices.Delete(id);
        if (res === 1) {
          toast.success("Meeting link deleted successfully");
          fetchData();
        } else {
          toast.error("Failed to delete meeting");
        }
      }
    });
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Manage Group Meetings</h1>
                <p className="mb-0">View, test, or delete scheduled meetings for groups.</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li className="current">Manage Meetings</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-dark mb-0">Scheduled Meetings ({meetings.length})</h4>
            <Link to="/admin/addmeeting" className="btn btn-primary">
              <i className="bi bi-plus-circle me-1"></i> Add New Meeting
            </Link>
          </div>

          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Group</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Details</th>
                  <th scope="col">Meeting Link</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {meetings.length === 0 ? (
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
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ManageMeeting;
