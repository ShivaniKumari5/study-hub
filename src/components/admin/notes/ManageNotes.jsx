import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import NotesServices from "../../../services/NotesServices";
import GroupServices from "../../../services/GroupServices";

function ManageNotes() {
  const [data, setData] = useState([]);
  const [grpdata, setGroupData] = useState([]);
  const [previewNote, setPreviewNote] = useState(null);
  const [viewMode, setViewMode] = useState("google");

  useEffect(() => {
    fetchData();
    fetchDataGroup();
  }, []);

  const fetchDataGroup = async () => {
    let groupData = await GroupServices.All();
    console.log(groupData);
    setGroupData(groupData);
  };

  const fetchData = async () => {
    let notesData = await NotesServices.All();
    console.log(notesData);
    setData(notesData);
  };

  const deleteNotes = async (id) => {
    console.log(id);
    let res = await NotesServices.Delete(id);
    if (res == 1) {
      toast.success("Notes deleted");
      fetchData();
    } else {
      toast.error("Notes not deleted");
    }
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
    const pdfUrl = getPdfUrl(url);
    if (pdfUrl.includes("cloudinary.com") && pdfUrl.toLowerCase().endsWith(".pdf")) {
      return pdfUrl.slice(0, -4) + ".jpg";
    }
    return pdfUrl;
  };

  const getGoogleDocsViewerUrl = (url) => {
    const pdfUrl = getPdfUrl(url);
    return `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
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
      toast.success("Download started!");
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

      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4 justify-content-center align-items-center">
            <div className="col-lg-12 mt-4">
              <div className="table-responsive shadow-sm rounded">
                <table className="table table-bordered table-hover align-middle mb-0">
                  <thead className="table-dark text-center">
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Preview Thumbnail</th>
                      <th scope="col">Group</th>
                      <th scope="col">Preview PDF</th>
                      <th scope="col">Download</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {data.map((el, index) => {
                      const groupName = grpdata?.find(
                        (c) => c.id == el.groupId || c.id == el.group
                      )?.groupName;
                      const thumbUrl = getPdfThumbnailUrl(el.fileUrl);
                      return (
                        <tr key={el.id || index}>
                          <th scope="row">{index + 1}</th>
                          <td className="fw-bold">{el.title}</td>
                          <td>{el.description}</td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <img
                                width={50}
                                height={50}
                                src={thumbUrl}
                                alt={el.title}
                                className="rounded border object-fit-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "inline-block";
                                }}
                              />
                              <span className="badge bg-danger p-2" style={{ display: "none" }}>
                                <i className="bi bi-file-earmark-pdf-fill me-1"></i> PDF
                              </span>
                            </div>
                          </td>
                          <td>{groupName || "N/A"}</td>
                          <td>
                            <button
                              onClick={() => setPreviewNote(el)}
                              className="btn btn-info btn-sm text-white"
                              title="Preview PDF"
                            >
                              <i className="bi bi-eye me-1"></i> Preview
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDownload(el.fileUrl, el.title)}
                              className="btn btn-success btn-sm"
                              title="Download PDF"
                            >
                              <i className="bi bi-download me-1"></i> Download
                            </button>
                          </td>
                          <td>
                            <Link
                              to={"/admin/updateNotes/" + el.id}
                              className="btn btn-primary btn-sm"
                            >
                              <i className="bi bi-pencil me-1"></i> Edit
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={() => deleteNotes(el.id)}
                              className="btn btn-danger btn-sm"
                            >
                              <i className="bi bi-trash me-1"></i> Delete
                            </button>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                el.status ? "bg-success" : "bg-warning text-dark"
                              }`}
                            >
                              {el.status ? "Active" : "Block"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Preview Modal */}
      {previewNote && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1055 }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header bg-dark text-white p-3">
                <h5 className="modal-title d-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-pdf text-danger"></i>
                  Preview Note: {previewNote.title}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setPreviewNote(null)}
                ></button>
              </div>
              <div className="modal-body p-3 bg-light text-center" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <img
                  src={getPdfThumbnailUrl(previewNote.fileUrl)}
                  alt={previewNote.title}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "65vh", objectFit: "contain" }}
                />
              </div>
              <div className="modal-footer bg-white p-3 d-flex justify-content-between">
                <span className="text-muted small">{previewNote.description}</span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleDownload(previewNote.fileUrl, previewNote.title)}
                  >
                    <i className="bi bi-download me-1"></i> Download PDF
                  </button>
                  <a
                    href={getPdfUrl(previewNote.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-box-arrow-up-right me-1"></i> Open in New Tab
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setPreviewNote(null)}
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
  );
}

export default ManageNotes;