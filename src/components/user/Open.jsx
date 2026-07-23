import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotesServices from "../../services/NotesServices";

function Open() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  const fetchNotes = async () => {
    const notes = await NotesServices.All();
    console.log("URL Group ID:", id);
    console.log("All Notes:", notes);
    console.log(notes);

    const groupNotes = notes.filter(note => note.groupId === id);
    console.log(groupNotes);


    setData(groupNotes);

    if (groupNotes.length > 0) {
    setSelectedImage(groupNotes[0]);
    } 
  }

  useEffect(() => {
    fetchNotes()
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
                  <h1>View Open</h1>
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
                <li className="current">View Open</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* <div className="container py-5">
          <div className="row">
            {data.map((el) => (
              <div className="col-lg-4 mb-4" key={el.id}>
                <div className="card shadow-sm border-0">
                  <img
                    src={el.fileUrl}
                    className="card-img-top"
                    alt={el.title}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">
                    <h5>{el.title}</h5>
                    <p>{el.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="container py-5">
  <div className="row">

    {/* Left Side - Thumbnail List */}
    <div className="col-md-3">
      <div
        className="border rounded p-2"
        style={{ height: "600px", overflowY: "auto" }}
      >
        {data.map((item) => (
          <img
            key={item.id}
            src={item.fileUrl}
            alt={item.title}
            onClick={() => setSelectedImage(item)}
            className={`img-fluid mb-2 rounded ${
              selectedImage?.id === item.id ? "border border-primary border-3" : ""
            }`}
            style={{
              cursor: "pointer",
              height: "100px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>

    {/* Right Side - Selected Image */}
    <div className="col-md-9">
      {selectedImage && (
        <div className="card shadow border-0">
          <img
            src={selectedImage.fileUrl}
            alt={selectedImage.title}
            className="card-img-top"
            style={{
              height: "500px",
              objectFit: "contain",
              background: "#f8f9fa",
            }}
          />

          <div className="card-body">
            <h4>{selectedImage.title}</h4>
            <p>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>

  </div>
</div>

      </main>

    </>
  )

}

export default Open;