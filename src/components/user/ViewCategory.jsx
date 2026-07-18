import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryServices from "../../services/CategoryServices";

function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await CategoryServices.All();
      setCategories(res || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h1>View Categories</h1>
                <p className="mb-0">
                  Browse all available categories with their descriptions.
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
              <li className="current">Categories</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Categories */}
      <section className="container py-5">
        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Loading categories...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="alert alert-warning text-center">
            No categories found.
          </div>
        )}

        <div className="row g-4">
          {!loading &&
            categories.map((category) => (
              <div
                className="col-lg-4 col-md-6"
                key={category._id || category.id}
                data-aos="fade-up"
              >
                <Link to={"/ViewGroup/"+category.id}>

                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={category.Image}
                      className="card-img-top"
                      alt={category.categoryName}
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        {category.categoryName}
                      </h5>

                      <p className="card-text text-muted flex-grow-1">
                        {category.description}
                      </p>

                      {/* <div className="d-flex gap-3 mt-3">
                    

                      
                    </div> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

export default ViewCategory;