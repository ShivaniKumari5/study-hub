import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>404 — Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;