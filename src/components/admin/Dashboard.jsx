// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AuthServices from "../../services/AuthServices";
// import CategoryServices from "../../services/CategoryServices";
// import GroupServices from "../../services/GroupServices";
// import GroupMemberServices from "../../services/GroupMemberServices";
// import NotesServices from "../../services/NotesServices";
// import MeetingServices from "../../services/MeetingServices";
// import DoubtServices from "../../services/DoubtServices";

// function Dashboard() {
//   const adminName = AuthServices.getName() || "Admin";

//   const [stats, setStats] = useState({
//     categories: 0,
//     groups: 0,
//     students: 0,
//     notes: 0,
//     meetings: 0,
//     pendingDoubts: 0,
//   });

//   const [recentStudents, setRecentStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       const [cats, grps, members, nts, meets, doubts] = await Promise.all([
//         CategoryServices.All(),
//         GroupServices.All(),
//         GroupMemberServices.All(),
//         NotesServices.All(),
//         MeetingServices.All(),
//         DoubtServices.All(),
//       ]);

//       setStats({
//         categories: cats?.length || 0,
//         groups: grps?.length || 0,
//         students: members?.length || 0,
//         notes: nts?.length || 0,
//         meetings: meets?.length || 0,
//         pendingDoubts:
//           doubts?.filter((d) => d.status === "pending").length || 0,
//       });

//       const sorted = (members || [])
//         .filter((m) => m.joinedAt)
//         .sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))
//         .slice(0, 5);

//       setRecentStudents(sorted);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---- Theme colors ----
//   const THEME_GREEN = "#3fbb5c";

//   const statCards = [
//     {
//       label: "Categories",
//       value: stats.categories,
//       icon: "bi-tags-fill",
//       color: THEME_GREEN,
//       link: "/admin/manageCategory",
//     },
//     {
//       label: "Groups",
//       value: stats.groups,
//       icon: "bi-people-fill",
//       color: THEME_GREEN,
//       link: "/admin/manageGroup",
//     },
//     {
//       label: "Students",
//       value: stats.students,
//       icon: "bi-person-check-fill",
//       color: THEME_GREEN,
//       link: "/admin/manageGroup",
//     },
//     {
//       label: "Notes",
//       value: stats.notes,
//       icon: "bi-file-earmark-pdf-fill",
//       color: THEME_GREEN,
//       link: "/admin/managenotes",
//     },
//     {
//       label: "Meetings",
//       value: stats.meetings,
//       icon: "bi-camera-video-fill",
//       color: THEME_GREEN,
//       link: "/admin/managemeeting",
//     },
//     {
//       label: "Pending Doubts",
//       value: stats.pendingDoubts,
//       icon: "bi-question-circle-fill",
//       color: THEME_GREEN,
//       link: "/admin/viewdoubt",
//     },
//   ];

//   const quickActions = [
//     { label: "Add Category", icon: "bi-plus-circle", link: "/admin/addcategory" },
//     { label: "Add Group", icon: "bi-plus-circle", link: "/admin/addgroup" },
//     { label: "Add Notes", icon: "bi-plus-circle", link: "/admin/addnotes" },
//     { label: "Add Meeting", icon: "bi-plus-circle", link: "/admin/addmeeting" },
//     { label: "Manage Category", icon: "bi-list-ul", link: "/admin/manageCategory" },
//     { label: "Manage Groups", icon: "bi-list-ul", link: "/admin/manageGroup" },
//     { label: "Manage Notes", icon: "bi-list-ul", link: "/admin/managenotes" },
//     { label: "View Doubts", icon: "bi-chat-dots", link: "/admin/viewdoubt" },
//   ];

//   const today = new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <main className="main">
//       <div className="container py-5">

//         {/* ---- Welcome Banner ---- */}
//         <div
//           className="rounded-4 p-4 p-md-5 mb-5 text-white shadow-sm position-relative overflow-hidden"
//           style={{
//             background: `linear-gradient(135deg, ${THEME_GREEN} 0%, #2fa04a 100%)`,
//           }}
//           data-aos="fade-up"
//         >
//           <div className="position-relative" style={{ zIndex: 2 }}>
//             <p className="mb-1 text-white-50 small">
//               <i className="bi bi-calendar3 me-2"></i>
//               {today}
//             </p>
//             <h2 className="fw-bold mb-2 text-white">
//               Welcome back, {adminName} 👋
//             </h2>
//             <p className="mb-0 text-white-50">
//               Here's what's happening in your Study Group platform today.
//             </p>
//           </div>

//           <div
//             className="position-absolute rounded-circle"
//             style={{
//               width: 200,
//               height: 200,
//               background: "rgba(255,255,255,0.08)",
//               top: -50,
//               right: -50,
//             }}
//           />
//           <div
//             className="position-absolute rounded-circle"
//             style={{
//               width: 120,
//               height: 120,
//               background: "rgba(255,255,255,0.06)",
//               bottom: -30,
//               right: 100,
//             }}
//           />
//         </div>

//         {/* ---- Loading ---- */}
//         {loading ? (
//           <div className="text-center py-5">
//             <div
//               className="spinner-border"
//               style={{ color: THEME_GREEN }}
//               role="status"
//             >
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3 text-muted">Loading your dashboard...</p>
//           </div>
//         ) : (
//           <>
//             {/* ---- Stat Cards ---- */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h4 className="fw-bold mb-0">
//                 <i
//                   className="bi bi-graph-up-arrow me-2"
//                   style={{ color: THEME_GREEN }}
//                 ></i>
//                 Overview
//               </h4>
//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={loadStats}
//                 title="Refresh"
//               >
//                 <i className="bi bi-arrow-clockwise"></i>
//               </button>
//             </div>

//             <div className="row g-4 mb-5">
//               {statCards.map((card, index) => (
//                 <div
//                   className="col-lg-2 col-md-4 col-sm-6"
//                   key={index}
//                   data-aos="zoom-in"
//                   data-aos-delay={index * 40}
//                 >
//                   <Link
//                     to={card.link}
//                     className="text-decoration-none"
//                     style={{ color: "inherit" }}
//                   >
//                     <div
//                       className="card border-0 shadow-sm stat-card-hover h-100"
//                       style={{
//                         borderTop: `4px solid ${card.color}`,
//                         transition: "all 0.25s ease",
//                       }}
//                     >
//                       <div className="card-body p-3 text-center">
//                         <div
//                           className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
//                           style={{
//                             width: 56,
//                             height: 56,
//                             background: `${card.color}20`,
//                           }}
//                         >
//                           <i
//                             className={`bi ${card.icon} fs-3`}
//                             style={{ color: card.color }}
//                           ></i>
//                         </div>
//                         <h2
//                           className="fw-bold mb-1"
//                           style={{ color: card.color }}
//                         >
//                           {card.value}
//                         </h2>
//                         <p className="text-muted small mb-0 fw-medium">
//                           {card.label}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* ---- Recent Enrollments ---- */}
//             <div className="card border-0 shadow-sm mb-5">
//               <div className="card-body p-4">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h5 className="fw-bold mb-0">
//                     <i
//                       className="bi bi-clock-history me-2"
//                       style={{ color: THEME_GREEN }}
//                     ></i>
//                     Recent Enrollments
//                   </h5>
//                   <Link
//                     to="/admin/manageGroup"
//                     className="btn btn-sm btn-outline-secondary"
//                   >
//                     View All
//                   </Link>
//                 </div>

//                 {recentStudents.length === 0 ? (
//                   <div className="text-center py-4">
//                     <i className="bi bi-inbox fs-1 text-muted"></i>
//                     <p className="text-muted mt-2 mb-0">No enrollments yet.</p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table align-middle mb-0">
//                       <thead>
//                         <tr>
//                           <th className="text-muted small text-uppercase">
//                             Student UID
//                           </th>
//                           <th className="text-muted small text-uppercase">
//                             Group ID
//                           </th>
//                           <th className="text-muted small text-uppercase">
//                             Joined
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {recentStudents.map((student) => (
//                           <tr key={student.id}>
//                             <td>
//                               <span className="badge bg-light text-dark border">
//                                 {student.uid?.slice(0, 10)}...
//                               </span>
//                             </td>
//                             <td>
//                               <span className="badge bg-light text-dark border">
//                                 {student.groupId?.slice(0, 10)}...
//                               </span>
//                             </td>
//                             <td>
//                               <span className="text-muted small">
//                                 <i className="bi bi-calendar-check me-1"></i>
//                                 {new Date(student.joinedAt).toLocaleDateString(
//                                   "en-IN",
//                                   {
//                                     day: "numeric",
//                                     month: "short",
//                                     year: "numeric",
//                                   }
//                                 )}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ---- Quick Actions ---- */}
//             <h4 className="fw-bold mb-3">
//               <i
//                 className="bi bi-lightning-charge-fill me-2"
//                 style={{ color: THEME_GREEN }}
//               ></i>
//               Quick Actions
//             </h4>

//             <div className="row g-3">
//               {quickActions.map((action, index) => (
//                 <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
//                   <Link
//                     to={action.link}
//                     className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2"
//                     style={{
//                       borderColor: THEME_GREEN,
//                       color: THEME_GREEN,
//                       borderWidth: "1.5px",
//                       borderStyle: "solid",
//                       background: "transparent",
//                       transition: "all 0.2s",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = THEME_GREEN;
//                       e.currentTarget.style.color = "#fff";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = "transparent";
//                       e.currentTarget.style.color = THEME_GREEN;
//                     }}
//                   >
//                     <i className={`bi ${action.icon}`}></i>
//                     {action.label}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }

// export default Dashboard;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import CategoryServices from "../../services/CategoryServices";
import GroupServices from "../../services/GroupServices";
import GroupMemberServices from "../../services/GroupMemberServices";
import NotesServices from "../../services/NotesServices";
import MeetingServices from "../../services/MeetingServices";
import DoubtServices from "../../services/DoubtServices";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";

// ---- Dashboard-scoped styles ----
const dashboardStyles = `
  .dashboard-card {
    transition: all 0.2s ease;
  }
  .dashboard-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(63, 187, 92, 0.15) !important;
  }
  .dashboard-action:hover {
    background: #3fbb5c !important;
    color: #ffffff !important;
  }
  .dashboard-action i {
    transition: transform 0.2s ease;
  }
  .dashboard-action:hover i {
    transform: translateX(2px);
  }
`;

function Dashboard() {
  const adminName = AuthServices.getName() || "Admin";

  const [stats, setStats] = useState({
    categories: 0,
    groups: 0,
    students: 0,
    notes: 0,
    meetings: 0,
    pendingDoubts: 0,
  });

  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const [cats, grps, members, nts, meets, doubts] = await Promise.all([
        CategoryServices.All(),
        GroupServices.All(),
        GroupMemberServices.All(),
        NotesServices.All(),
        MeetingServices.All(),
        DoubtServices.All(),
      ]);

      const pending = (doubts || []).filter((d) => d.status === "pending");

      setStats({
        categories: cats?.length || 0,
        groups: grps?.length || 0,
        students: members?.length || 0,
        notes: nts?.length || 0,
        meetings: meets?.length || 0,
        pendingDoubts: pending.length,
      });

      // ---- Recent Enrollments (last 5, enriched) ----
      const sorted = (members || [])
        .filter((m) => m.joinedAt)
        .sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))
        .slice(0, 5);

      const groupMap = {};
      (grps || []).forEach((g) => {
        groupMap[g.id] = g;
      });

      const enriched = await Promise.all(
        sorted.map(async (m) => {
          let studentName = "Unknown";
          let studentEmail = "";
          try {
            const userSnap = await getDoc(doc(db, "users", m.uid));
            if (userSnap.exists()) {
              const u = userSnap.data();
              studentName = u.name || "Unknown";
              studentEmail = u.email || "";
            }
          } catch (err) {
            console.log(err);
          }
          return {
            id: m.id,
            name: studentName,
            email: studentEmail,
            groupName: groupMap[m.groupId]?.groupName || "Unknown Group",
            joinedAt: m.joinedAt,
          };
        })
      );

      setRecentEnrollments(enriched);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const statCards = [
    {
      label: "Categories",
      value: stats.categories,
      icon: "bi-tags-fill",
      link: "/admin/manageCategory",
      trend: "+2 this week",
    },
    {
      label: "Groups",
      value: stats.groups,
      icon: "bi-people-fill",
      link: "/admin/manageGroup",
      trend: "+1 this week",
    },
    {
      label: "Students",
      value: stats.students,
      icon: "bi-person-check-fill",
      link: "/admin/manageGroup",
      trend: "Live",
    },
    {
      label: "Notes",
      value: stats.notes,
      icon: "bi-file-earmark-pdf-fill",
      link: "/admin/managenotes",
      trend: "PDF library",
    },
    {
      label: "Meetings",
      value: stats.meetings,
      icon: "bi-camera-video-fill",
      link: "/admin/managemeeting",
      trend: "Scheduled",
    },
    {
      label: "Pending Doubts",
      value: stats.pendingDoubts,
      icon: "bi-question-circle-fill",
      link: "/admin/viewdoubt",
      trend: "Needs reply",
    },
  ];

  const quickActions = [
    { label: "Add Category", icon: "bi-plus-circle", link: "/admin/addcategory" },
    { label: "Add Group", icon: "bi-plus-circle", link: "/admin/addgroup" },
    { label: "Add Notes", icon: "bi-plus-circle", link: "/admin/addnotes" },
    { label: "Add Meeting", icon: "bi-plus-circle", link: "/admin/addmeeting" },
    { label: "Manage Category", icon: "bi-list-ul", link: "/admin/manageCategory" },
    { label: "Manage Groups", icon: "bi-list-ul", link: "/admin/manageGroup" },
    { label: "Manage Notes", icon: "bi-list-ul", link: "/admin/managenotes" },
    { label: "View Doubts", icon: "bi-chat-dots", link: "/admin/viewdoubt" },
  ];

  const THEME_GREEN = "#3fbb5c";
  const THEME_GREEN_LIGHT = "#e8f7ec";

  return (
    <main className="main">
      {/* ---- Dashboard-scoped styles ---- */}
      <style>{dashboardStyles}</style>

      <div className="container py-5">
        {/* ---- Pending Doubts Alert ---- */}
        {!loading && stats.pendingDoubts > 0 && (
          <div
            className="alert d-flex align-items-center justify-content-between shadow-sm border-0 rounded-3 mb-4"
            style={{ background: "#fff7e6", color: "#b26a00" }}
            role="alert"
          >
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill fs-4"></i>
              <span>
                You have <strong>{stats.pendingDoubts}</strong> unanswered{" "}
                {stats.pendingDoubts === 1 ? "doubt" : "doubts"} waiting for reply.
              </span>
            </div>
            <Link
              to="/admin/viewdoubt"
              className="btn btn-sm"
              style={{ background: "#b26a00", color: "#fff" }}
            >
              Reply Now <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        )}

        {/* ---- Welcome Banner ---- */}
        <div
          className="p-4 p-md-5 rounded-4 shadow-sm mb-4 text-white position-relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${THEME_GREEN} 0%, #2fa04a 100%)`,
          }}
          data-aos="fade-up"
        >
          <div className="position-relative" style={{ zIndex: 2 }}>
            <p className="mb-1 text-white-50 small">
              <i className="bi bi-calendar3 me-2"></i>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h2 className="fw-bold mb-2 text-white">
              {greeting}, {adminName} 👋
            </h2>
            <p className="mb-0 text-white-50">
              Here's what's happening in your Study Group platform today.
            </p>
          </div>
          <div
            className="position-absolute rounded-circle"
            style={{
              width: 220,
              height: 220,
              background: "rgba(255,255,255,0.08)",
              top: -60,
              right: -60,
            }}
          />
          <div
            className="position-absolute rounded-circle"
            style={{
              width: 140,
              height: 140,
              background: "rgba(255,255,255,0.06)",
              bottom: -40,
              right: 140,
            }}
          />
        </div>

        {/* ---- Summary Strip ---- */}
        {!loading && (
          <div className="row g-3 mb-5">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48, background: THEME_GREEN_LIGHT }}
                  >
                    <i
                      className="bi bi-people-fill fs-4"
                      style={{ color: THEME_GREEN }}
                    ></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.students}</h5>
                    <small className="text-muted">Total enrollments</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48, background: THEME_GREEN_LIGHT }}
                  >
                    <i
                      className="bi bi-collection-fill fs-4"
                      style={{ color: THEME_GREEN }}
                    ></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.groups}</h5>
                    <small className="text-muted">Active groups</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48, background: THEME_GREEN_LIGHT }}
                  >
                    <i
                      className="bi bi-chat-dots-fill fs-4"
                      style={{ color: THEME_GREEN }}
                    ></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.pendingDoubts}</h5>
                    <small className="text-muted">Doubts to answer</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Loading ---- */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{ color: THEME_GREEN }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* ---- Overview ---- */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0 d-flex align-items-center">
                <i
                  className="bi bi-graph-up-arrow me-2"
                  style={{ color: THEME_GREEN }}
                ></i>
                Overview
              </h4>
              <button
                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                onClick={loadStats}
                title="Refresh"
              >
                <i className="bi bi-arrow-clockwise"></i>
                <span className="d-none d-sm-inline">Refresh</span>
              </button>
            </div>

            <div className="row g-4 mb-5">
              {statCards.map((card, index) => (
                <div
                  className="col-lg-2 col-md-4 col-sm-6"
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <Link
                    to={card.link}
                    className="text-decoration-none"
                    style={{ color: "inherit" }}
                  >
                    <div
                      className="card h-100 border-0 shadow-sm dashboard-card"
                      style={{ borderTop: `3px solid ${THEME_GREEN}` }}
                    >
                      <div className="card-body text-center p-3">
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                          style={{
                            width: 60,
                            height: 60,
                            background: THEME_GREEN_LIGHT,
                          }}
                        >
                          <i
                            className={`bi ${card.icon} fs-3`}
                            style={{ color: THEME_GREEN }}
                          ></i>
                        </div>
                        <h3
                          className="fw-bold mb-1"
                          style={{ color: THEME_GREEN }}
                        >
                          {card.value}
                        </h3>
                        <p className="text-muted small mb-2">{card.label}</p>
                        <small
                          className="d-block"
                          style={{ color: THEME_GREEN, fontSize: "11px" }}
                        >
                          <i className="bi bi-dot"></i>
                          {card.trend}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* ---- Recent Enrollments ---- */}
            <div className="card border-0 shadow-sm mb-5">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0 d-flex align-items-center">
                    <i
                      className="bi bi-clock-history me-2"
                      style={{ color: THEME_GREEN }}
                    ></i>
                    Recent Enrollments
                  </h5>
                  <Link
                    to="/admin/manageGroup"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    View All <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

                {recentEnrollments.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox fs-1 text-muted"></i>
                    <p className="text-muted mt-2 mb-0">No enrollments yet.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead>
                        <tr>
                          <th className="text-muted small text-uppercase">Student</th>
                          <th className="text-muted small text-uppercase">Email</th>
                          <th className="text-muted small text-uppercase">Group</th>
                          <th className="text-muted small text-uppercase">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentEnrollments.map((s) => (
                          <tr key={s.id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                  style={{
                                    width: 34,
                                    height: 34,
                                    background: THEME_GREEN,
                                    fontSize: 14,
                                  }}
                                >
                                  {s.name?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                                <span className="fw-semibold">{s.name}</span>
                              </div>
                            </td>
                            <td className="text-muted small">{s.email || "—"}</td>
                            <td>
                              <span
                                className="badge rounded-pill"
                                style={{
                                  background: THEME_GREEN_LIGHT,
                                  color: THEME_GREEN,
                                }}
                              >
                                {s.groupName}
                              </span>
                            </td>
                            <td>
                              <span className="text-muted small">
                                <i className="bi bi-calendar-check me-1"></i>
                                {new Date(s.joinedAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* ---- Quick Actions ---- */}
            <h4 className="fw-bold mb-3 d-flex align-items-center">
              <i
                className="bi bi-lightning-charge-fill me-2"
                style={{ color: THEME_GREEN }}
              ></i>
              Quick Actions
            </h4>

            <div className="row g-3">
              {quickActions.map((action, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <Link
                    to={action.link}
                    className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 dashboard-action"
                    style={{
                      border: `1.5px solid ${THEME_GREEN}`,
                      color: THEME_GREEN,
                      background: "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className={`bi ${action.icon}`}></i>
                    {action.label}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;