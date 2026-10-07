import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupServices from "../../../services/GroupServices";
import GroupMemberServices from "../../../services/GroupMemberServices";
import CategoryServices from "../../../services/CategoryServices";
import { db } from "../../../Firebase";
import { doc, getDoc } from "firebase/firestore";

function ViewGroupDetails() {
  const { id } = useParams();

  const [group, setGroup] = useState(null);
  const [category, setCategory] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, [id]);

  const fetchAll = async () => {
    try {
      setLoading(true);

      // 1. Get the group
      const groupData = await GroupServices.single(id);
      setGroup(groupData);

      // 2. Get the category (if group has one)
      if (groupData?.cateId) {
        const catData = await CategoryServices.single(groupData.cateId);
        setCategory(catData);
      }

      // 3. Get all enrollments for this group
      const allMembers = await GroupMemberServices.All();
      const groupMembers = (allMembers || []).filter(
        (m) => String(m.groupId) === String(id)
      );

      // 4. For each member, fetch the student's user document
      const studentDetails = await Promise.all(
        groupMembers.map(async (member) => {
          try {
            const userRef = doc(db, "users", member.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : {};

            return {
              enrollmentId: member.id,
              uid: member.uid,
              joinedAt: member.joinedAt || null,
              name: userData.name || "Unknown",
              email: userData.email || "—",
              contact: userData.contact || "—",
              address: userData.address || "—",
              profile: userData.profile || "",
            };
          } catch (error) {
            console.log(error);
            return {
              enrollmentId: member.id,
              uid: member.uid,
              name: "Unknown",
              email: "—",
              contact: "—",
            };
          }
        })
      );

      setStudents(studentDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Loading State --------------------
  if (loading) {
    return (
      <main className="main">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading group details...</p>
        </div>
      </main>
    );
  }

  // -------------------- Group Not Found --------------------
  if (!group) {
    return (
      <main className="main">
        <div className="container py-5 text-center">
          <h4>Group not found</h4>
          <Link to="/admin/manageGroup" className="btn btn-primary mt-3">
            Back to Groups
          </Link>
        </div>
      </main>
    );
  }

  // -------------------- Main UI --------------------
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Group Details</h1>
                <p className="mb-0">Students enrolled in this group</p>
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
              <li>
                <Link to="/admin/manageGroup">Groups</Link>
              </li>
              <li className="current">Group Details</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="section">
        <div className="container" data-aos="fade-up">

          {/* Group Info Card */}
          <div className="card shadow-sm border-0 mb-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={group.Image}
                  alt={group.groupName}
                  className="img-fluid rounded-start h-100"
                  style={{ objectFit: "cover", minHeight: "220px" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title fw-bold">{group.groupName}</h3>

                  {category && (
                    <p className="text-muted mb-2">
                      <i className="bi bi-tag me-1"></i>
                      Category: <strong>{category.categoryName}</strong>
                    </p>
                  )}

                  <p className="card-text">{group.description}</p>

                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    <span
                      className={`badge ${
                        group.groupType === "paid"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {group.groupType === "paid" ? "Paid Group" : "Free Group"}
                    </span>

                    {group.groupType === "paid" && (
                      <span className="badge bg-info text-dark">
                        ₹{group.price}
                      </span>
                    )}

                    <span className="badge bg-primary">
                      {students.length}{" "}
                      {students.length === 1 ? "Student" : "Students"} Enrolled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">
              Enrolled Students ({students.length})
            </h4>
            <Link
              to="/admin/manageGroup"
              className="btn btn-outline-secondary btn-sm"
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Groups
            </Link>
          </div>

          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Student</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Address</th>
                  <th scope="col">Enrolled On</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-muted">
                      <i className="bi bi-people fs-1 d-block mb-2 text-secondary"></i>
                      No students have enrolled in this group yet.
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr key={student.enrollmentId}>
                      <th scope="row">{index + 1}</th>

                      <td className="text-start">
                        <div className="d-flex align-items-center gap-2">
                          {student.profile ? (
                            <img
                              src={student.profile}
                              alt={student.name}
                              width={40}
                              height={40}
                              className="rounded-circle"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                              style={{ width: 40, height: 40 }}
                            >
                              {student.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <span className="fw-bold">{student.name}</span>
                        </div>
                      </td>

                      <td>{student.email}</td>
                      <td>{student.contact}</td>
                      <td className="text-muted small">{student.address}</td>

                      <td>
                        {student.joinedAt ? (
                          new Date(student.joinedAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    </main>
  );
}

export default ViewGroupDetails;