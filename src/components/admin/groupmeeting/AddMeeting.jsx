import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import GroupServices from "../../../services/GroupServices";
import MeetingServices from "../../../services/MeetingServices";

function AddMeeting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [group, setGroup] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let grpData = await GroupServices.All();
    setData(grpData || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!group) {
      toast.warning("Please select a group");
      return;
    }

    let payload = {
      title,
      description,
      link,
      date,
      time,
      group
    };

    let result = await MeetingServices.Add(payload);

    if (result === 1) {
      toast.success("Meeting link & details added successfully");
      setTitle("");
      setDescription("");
      setLink("");
      setDate("");
      setTime("");
      setGroup("");
      navigate("/admin/managemeeting");
    } else {
      toast.error("Database error while adding meeting");
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
                <h1>Add Group Meeting</h1>
                <p className="mb-0">
                  Schedule live meetings, virtual classes, or webinars for group members.
                </p>
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
              <li className="current">Add Meeting Link</li>
            </ol>
          </div>
        </nav>
      </div>

      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-8">
              <form
                method="post"
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay={200}
                onSubmit={handleSubmit}
              >
                <div className="row gy-3 p-4">

                  <div className="col-md-12">
                    <label className="form-label fw-bold">Select Group</label>
                    <select
                      className="form-control"
                      value={group}
                      required
                      onChange={(el) => setGroup(el.target.value)}
                    >
                      <option value="">-- Select Group --</option>
                      {data.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.groupName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-bold">Meeting Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="e.g. Weekly Group Q&A Session"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-bold">Meeting Link</label>
                    <div className="input-group">
                      <input
                        type="url"
                        className="form-control"
                        name="link"
                        placeholder="https://meet.google.com/..."
                        required
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={setRandomLink}
                        title="Generate Sample Google Meet Link"
                      >
                        <i className="bi bi-arrow-clockwise me-1"></i> Auto-Generate
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Meeting Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Meeting Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-bold">Meeting Details / Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Provide details about the meetingagenda, instructions for participants..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary px-5 py-2">
                      <i className="bi bi-camera-video me-2"></i>Add Meeting Link
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddMeeting;