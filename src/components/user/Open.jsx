import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotesServices from "../../services/NotesServices";
import MeetingServices from "../../services/MeetingServices";
import DoubtServices from "../../services/DoubtServices";
import AuthServices from "../../services/AuthServices";
import GroupServices from "../../services/GroupServices";
import { toast } from "react-toastify";

function Open() {
  const [data, setData] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [previewModalNote, setPreviewModalNote] = useState(null);
  const [activeTab, setActiveTab] = useState("notes"); // 'notes' | 'meetings'

  const [askDoubtModal, setAskDoubtModal] = useState(false);
  const [doubt, setDoubt] = useState("");

  const [group, setGroup] = useState(null);
  const { id } = useParams();

  const fetchNotes = async () => {
    const notes = await NotesServices.All();
    const groupNotes = notes
      ? notes.filter((note) => String(note.groupId) === String(id) || String(note.group) === String(id))
      : [];

    setData(groupNotes);
    if (groupNotes.length > 0) {
      setSelectedNote(groupNotes[0]);
    }
  };

  const fetchMeetings = async () => {
    const meetingData = await MeetingServices.All();
    const groupMeetings = meetingData
      ? meetingData.filter(
        (m) => String(m.groupId) === String(id) || String(m.group) === String(id)
      )
      : [];

    setMeetings(groupMeetings);
  };

  useEffect(() => {
    fetchNotes();
    fetchMeetings();
    fetchGroup();
  }, [id]);

  const fetchGroup = async () => {
  const groupData = await GroupServices.single(id);
  setGroup(groupData);
};

  const getPdfUrl = (url) => {
    if (!url) return "";
    let cleanUrl = String(url);
    if (cleanUrl.includes("cloudinary.com")) {
      if (!cleanUrl.toLowerCase().includes(".pdf")) {
        if (cleanUrl.includes("?")) {
          const parts = cleanUrl.split("?");
          return `${parts[0]}.pdf?${parts[1]}`;
        }
        return `${cleanUrl}.pdf`;
      }
    }
    return cleanUrl;
  };

  const getPdfThumbnailUrl = (url) => {
    if (!url) return "";
    let cleanUrl = String(url);
    if (cleanUrl.includes("cloudinary.com")) {
      const baseUrl = cleanUrl.replace(/\.pdf$/i, "");
      if (baseUrl.includes("?")) {
        const parts = baseUrl.split("?");
        return `${parts[0]}.jpg?${parts[1]}`;
      }
      return `${baseUrl}.jpg`;
    }
    return cleanUrl;
  };

  const handleDownload = async (fileUrl, title) => {
    if (!fileUrl) return;
    const finalUrl = getPdfUrl(fileUrl);
    try {
      const response = await fetch(finalUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;

      const fileName = title
        ? title.toLowerCase().endsWith(".pdf")
          ? title
          : `${title}.pdf`
        : "note.pdf";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download fallback trigger:", error);
      const link = document.createElement("a");
      link.href = finalUrl;
      link.target = "_blank";
      link.setAttribute("download", title ? `${title}.pdf` : "download.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Helper to determine meeting date status
  const getMeetingStatus = (meetingDate) => {
    if (!meetingDate) return { label: "Scheduled", badgeClass: "bg-info text-dark" };

    const today = new Date().toISOString().split("T")[0];
    if (meetingDate === today) {
      return { label: "Live Today", badgeClass: "bg-success text-white" };
    } else if (meetingDate > today) {
      return { label: "Upcoming", badgeClass: "bg-primary text-white" };
    } else {
      return { label: "Completed / Past", badgeClass: "bg-secondary text-white" };
    }
  };
  // doubt handling
  const handleSubmitDoubt=async(e)=>{
    e.preventDefault();

     if (!doubt.trim()) {
    alert("Please enter your doubt.");
    return;
  }

   const doubtData = {
    groupId: id,
    groupName:  group?.groupName || "",
    studentId: AuthServices.getUid(),
    studentName: AuthServices.getName(),
    status: "pending",
    MessageStudent: doubt.trim(),
    MessageAdmin: "",
  };
   let ans = await DoubtServices.Add(doubtData);
   console.log(ans);

   if (ans == 1) {
         toast.success("Doubt  posted successfully");
         setDoubt("");
    setAskDoubtModal(false);
       }
       else {
         toast.error("DB error");
       }
   

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
                  <h1>Group Dashboard</h1>
                  <p className="mb-0">
                    Access course notes, PDF documents, and live video meetings scheduled for your group.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <ol className="mb-0">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/viewGroup">Groups</Link>
                  </li>
                  <li className="current">Group Details</li>
                </ol>
                <div className="nav nav-pills mt-2 mt-md-0 gap-2">
                  <button
                    className={`btn ${activeTab === "notes" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("notes")}
                  >
                    <i className="bi bi-file-earmark-pdf me-1"></i> Notes & Documents ({data.length})
                  </button>
                  <button
                    className={`btn ${activeTab === "meetings" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("meetings")}
                  >
                    <i className="bi bi-camera-video me-1"></i> Live Meetings ({meetings.length})
                  </button>


                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setAskDoubtModal(true)}
                  >
                    <i className="bi bi-question-circle me-1"></i> Ask Doubt
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="container py-5">
          {/* TAB 1: NOTES & DOCUMENTS */}
          {activeTab === "notes" && (
            <>
              {data.length === 0 ? (
                <div className="alert alert-info text-center shadow-sm p-4 rounded">
                  <i className="bi bi-folder2-open fs-1 text-primary mb-2 d-block"></i>
                  <h4>No Notes Found</h4>
                  <p className="mb-0">There are currently no notes uploaded for this group.</p>
                </div>
              ) : (
                <div className="row">
                  {/* Left Side - Notes List */}
                  <div className="col-md-4 mb-4">
                    <h5 className="mb-3 fw-bold text-secondary">Available Notes ({data.length})</h5>
                    <div
                      className="border rounded p-2 bg-light shadow-sm"
                      style={{ maxHeight: "650px", overflowY: "auto" }}
                    >
                      {data.map((item) => {
                        const isSelected = selectedNote?.id === item.id;
                        const thumbUrl = getPdfThumbnailUrl(item.fileUrl);
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedNote(item)}
                            className={`p-3 mb-2 rounded border transition-all ${isSelected
                              ? "border-primary bg-white shadow-sm"
                              : "bg-white border-light"
                              }`}
                            style={{ cursor: "pointer", transition: "all 0.2s" }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="d-flex align-items-center justify-content-center bg-danger-subtle rounded text-danger overflow-hidden"
                                style={{ width: "50px", height: "50px", minWidth: "50px" }}
                              >
                                <img
                                  src={thumbUrl}
                                  alt={item.title}
                                  className="w-100 h-100 object-fit-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    if (e.target.nextSibling)
                                      e.target.nextSibling.style.display = "block";
                                  }}
                                />
                                <i
                                  className="bi bi-file-earmark-pdf-fill fs-2"
                                  style={{ display: "none" }}
                                ></i>
                              </div>

                              <div className="flex-grow-1 text-truncate">
                                <h6 className="mb-1 text-dark text-truncate fw-bold">{item.title}</h6>
                                <p className="mb-0 text-muted small text-truncate">
                                  {item.description}
                                </p>
                                <span className="badge bg-danger mt-1" style={{ fontSize: "10px" }}>
                                  PDF Document
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side - Note Content Viewer */}
                  <div className="col-md-8">
                    {selectedNote && (
                      <div className="card shadow border-0 overflow-hidden">
                        <div className="card-header bg-white border-bottom p-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
                          <div>
                            <h4 className="mb-1 fw-bold text-dark">{selectedNote.title}</h4>
                            <span className="badge bg-danger">PDF File</span>
                          </div>
                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                              onClick={() => setPreviewModalNote(selectedNote)}
                            >
                              <i className="bi bi-fullscreen"></i> Fullscreen Preview
                            </button>
                            <button
                              className="btn btn-success btn-sm d-flex align-items-center gap-1"
                              onClick={() => handleDownload(selectedNote.fileUrl, selectedNote.title)}
                            >
                              <i className="bi bi-download"></i> Download PDF
                            </button>
                            <a
                              href={getPdfUrl(selectedNote.fileUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                            >
                              <i className="bi bi-box-arrow-up-right"></i> Open PDF
                            </a>
                          </div>
                        </div>

                        <div className="card-body p-3 text-center">
                          <div
                            className="bg-light p-3 rounded border shadow-sm mb-3 d-flex align-items-center justify-content-center"
                            style={{ minHeight: "450px" }}
                          >
                            <img
                              src={getPdfThumbnailUrl(selectedNote.fileUrl)}
                              alt={selectedNote.title}
                              className="img-fluid rounded shadow-sm"
                              style={{ maxHeight: "550px", objectFit: "contain" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                const fallbackElem = document.getElementById(
                                  `pdf-fallback-msg-${selectedNote.id}`
                                );
                                if (fallbackElem) fallbackElem.style.display = "block";
                              }}
                            />
                            <div
                              id={`pdf-fallback-msg-${selectedNote.id}`}
                              style={{ display: "none" }}
                              className="p-4 text-center"
                            >
                              <i className="bi bi-file-earmark-pdf text-danger fs-1 mb-2 d-block"></i>
                              <h5>{selectedNote.title}</h5>
                              <p className="text-muted">
                                Click below to view or download the PDF document.
                              </p>
                              <a
                                href={getPdfUrl(selectedNote.fileUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary mt-2"
                              >
                                Open PDF in New Tab
                              </a>
                            </div>
                          </div>

                          <div className="mt-3 text-start">
                            <h6 className="fw-bold text-secondary">Description</h6>
                            <p className="text-dark bg-light p-3 rounded border mb-0">
                              {selectedNote.description || "No description provided."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: LIVE MEETINGS & CLASSES */}
          {activeTab === "meetings" && (
            <div className="row g-4">
              <div className="col-12 d-flex justify-content-between align-items-center border-bottom pb-3 mb-2">
                <h4 className="fw-bold text-dark mb-0">
                  <i className="bi bi-camera-video text-primary me-2"></i>
                  Group Meetings & Live Sessions ({meetings.length})
                </h4>
              </div>

              {meetings.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-warning text-center shadow-sm p-4 rounded">
                    <i className="bi bi-calendar-x fs-1 text-warning mb-2 d-block"></i>
                    <h4>No Scheduled Meetings</h4>
                    <p className="mb-0">
                      There are currently no live meeting links added for this group.
                    </p>
                  </div>
                </div>
              ) : (
                meetings.map((item, index) => {
                  const statusInfo = getMeetingStatus(item.meetingDate);
                  const isToday = statusInfo.label === "Live Today";

                  return (
                    <div className="col-lg-6" key={item.id || index}>
                      <div
                        className={`card h-100 shadow-sm border ${isToday ? "border-success bg-success-subtle" : "border-light"
                          }`}
                      >
                        <div className="card-body p-4 d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <span className={`badge ${statusInfo.badgeClass} px-3 py-2 fs-6`}>
                              {isToday && <i className="bi bi-record-fill me-1 text-danger animate-pulse"></i>}
                              {statusInfo.label}
                            </span>
                            <span className="text-muted small">
                              <i className="bi bi-clock me-1"></i>
                              {item.meetingTime || "TBA"}
                            </span>
                          </div>

                          <h4 className="card-title fw-bold text-dark mb-2">
                            {item.title || "Group Meeting"}
                          </h4>

                          <div className="mb-3 text-secondary">
                            <i className="bi bi-calendar-event me-2 text-primary"></i>
                            <strong>Date:</strong> {item.meetingDate || "Scheduled Date"}
                          </div>

                          <p className="card-text text-muted flex-grow-1 mb-4">
                            {item.description || "No specific meeting details provided. Click below to join the meeting."}
                          </p>

                          <div className="mt-auto">
                            <a
                              href={item.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 ${isToday ? "btn-success btn-lg shadow" : "btn-primary"
                                }`}
                            >
                              <i className="bi bi-camera-video-fill fs-5"></i>
                              Join Meeting Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Modal for PDF Fullscreen Preview */}
        {previewModalNote && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1055 }}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header bg-dark text-white p-3">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <i className="bi bi-file-earmark-pdf text-danger"></i>
                    {previewModalNote.title} - Fullscreen Preview
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setPreviewModalNote(null)}
                  ></button>
                </div>
                <div
                  className="modal-body p-3 bg-secondary-subtle text-center"
                  style={{ maxHeight: "75vh", overflowY: "auto" }}
                >
                  <img
                    src={getPdfThumbnailUrl(previewModalNote.fileUrl)}
                    alt={previewModalNote.title}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: "70vh", objectFit: "contain" }}
                  />
                </div>
                <div className="modal-footer bg-light p-3 d-flex justify-content-between">
                  <span className="text-muted small">{previewModalNote.description}</span>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleDownload(previewModalNote.fileUrl, previewModalNote.title)
                      }
                    >
                      <i className="bi bi-download me-1"></i> Download PDF
                    </button>
                    <a
                      href={getPdfUrl(previewModalNote.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i> Open PDF in New Tab
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setPreviewModalNote(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ASK DOUBT MODAL */}
        {askDoubtModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 1055,
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow-lg border-0">

                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-question-circle text-primary me-2"></i>
                    Ask Your Doubt
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAskDoubtModal(false)}
                  ></button>
                </div>

                <form onSubmit={handleSubmitDoubt}
                  // onSubmit={(e) => {
                  //   e.preventDefault();

                  //   console.log("Doubt:", doubt);
                  //   console.log("Group ID:", id);

                  //   // TODO: Call your API here

                  //   setDoubt("");
                  //   setAskDoubtModal(false);
                  // }}
                >
                  <div className="modal-body">

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Your Doubt
                      </label>

                      <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write your doubt here..."
                        value={doubt}
                        onChange={(e) => setDoubt(e.target.value)}
                        required
                      ></textarea>
                    </div>

                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setDoubt("");
                        setAskDoubtModal(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      <i className="bi bi-send me-1"></i>
                      Post Doubt
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Open;