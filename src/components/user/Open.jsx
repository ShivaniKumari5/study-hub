import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotesServices from "../../services/NotesServices";

function Open() {
  const [data, setData] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [previewModalNote, setPreviewModalNote] = useState(null);
  const { id } = useParams();

  const fetchNotes = async () => {
    const notes = await NotesServices.All();
    console.log("URL Group ID:", id);
    console.log("All Notes:", notes);

    const groupNotes = notes ? notes.filter(note => String(note.groupId) === String(id) || String(note.group) === String(id)) : [];
    console.log("Group Notes:", groupNotes);

    setData(groupNotes);

    if (groupNotes.length > 0) {
      setSelectedNote(groupNotes[0]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [id]);

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

      const fileName = title ? (title.toLowerCase().endsWith(".pdf") ? title : `${title}.pdf`) : "note.pdf";
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

  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Notes & PDF Preview</h1>
                  <p className="mb-0">
                    Browse, preview, and download course notes and PDF documents for your group.
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
                <li className="current">View Notes</li>
                <li ><i class="bi bi-camera-video fs-3"></i></li>
                
              </ol>
            </div>
          </nav>
        </div>

        <div className="container py-5">
          {data.length === 0 ? (
            <div className="alert alert-info text-center shadow-sm p-4">
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
                        className={`p-3 mb-2 rounded border transition-all ${
                          isSelected ? "border-primary bg-white shadow-sm" : "bg-white border-light"
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
                                if (e.target.nextSibling) e.target.nextSibling.style.display = "block";
                              }}
                            />
                            <i className="bi bi-file-earmark-pdf-fill fs-2" style={{ display: "none" }}></i>
                          </div>

                          <div className="flex-grow-1 text-truncate">
                            <h6 className="mb-1 text-dark text-truncate fw-bold">{item.title}</h6>
                            <p className="mb-0 text-muted small text-truncate">{item.description}</p>
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
                            const fallbackElem = document.getElementById(`pdf-fallback-msg-${selectedNote.id}`);
                            if (fallbackElem) fallbackElem.style.display = "block";
                          }}
                        />
                        <div id={`pdf-fallback-msg-${selectedNote.id}`} style={{ display: "none" }} className="p-4 text-center">
                          <i className="bi bi-file-earmark-pdf text-danger fs-1 mb-2 d-block"></i>
                          <h5>{selectedNote.title}</h5>
                          <p className="text-muted">Click below to view or download the PDF document.</p>
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
                <div className="modal-body p-3 bg-secondary-subtle text-center" style={{ maxHeight: "75vh", overflowY: "auto" }}>
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
                      onClick={() => handleDownload(previewModalNote.fileUrl, previewModalNote.title)}
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
      </main>
    </>
  );
}

export default Open;