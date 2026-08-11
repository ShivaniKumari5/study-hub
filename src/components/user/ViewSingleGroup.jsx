import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GroupServices from "../../services/GroupServices";
import GroupMemberServices from "../../services/GroupMemberServices";
import AuthServices from "../../services/AuthServices";
import NotesServices from "../../services/NotesServices";
// import {handlePayment} from "../user/Pay";

// function ViewSingleGroup() {
//   const [data, setData] = useState();

//   const {id}=useParams()

//   const fetchData = async () => {
//     const res = await GroupServices.single(id);
//     console.log(res);
//     setData(res);
//   }

//   useEffect(() => {
//     fetchData()
//   }, []);

//   // async function joinGroup (){
//   //   const uid =await AuthServices.getUid();
//   //   const groupId=id;
//   //   console.log(uid,groupId);

//   //   const data={
//   //     uid:uid,
//   //     groupId:id
//   //   }

//   //   const result= await GroupMemberServices.Add(data);
//   // }

// async function joinGroup() {

//     const uid = AuthServices.getUid();

//     if (!uid) {
//         toast.error("Please login first");
//         return;
//     }

//     // If group is paid
//     if (data.groupType === "paid") {

//         console.log("Paid group");
//         console.log("Amount:", data.price);

//          handlePayment(uid, data);


//     } else {

//         // Free group
//         await addMember(uid, data.id);
//     }
// }

//   return (
//     <>
//       <main className="main">
//         {/* Page Title */}
//         <div className="page-title" data-aos="fade">
//           <div className="heading">
//             <div className="container">
//               <div className="row d-flex justify-content-center text-center">
//                 <div className="col-lg-8">
//                   <h1>View singleGroup</h1>
//                   {/* <p className="mb-0">
//                     Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
//                     quo odio sint voluptas consequatur ut a odio voluptatem. Sit
//                     dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
//                     quaerat ipsum dolorem.
//                   </p> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <nav className="breadcrumbs">
//             <div className="container">
//               <ol>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li className="current">View Group</li>
//               </ol>
//             </div>
//           </nav>
//         </div>
//         {/* End Page Title */}
//         {/* Courses Section */}


// {/* 
// <div className="container py-5">
//   <div className="row g-4">
//     {data.map((el) => (
//       <div
//         className="col-lg-4 col-md-6"
//         key={el._id || el.id}
//         data-aos="fade-up"
//       >
//         <div className="card h-100 shadow-sm border-0">
//           <img
//             src={el.Image}
//             className="card-img-top"
//             alt={el.groupName}
//             style={{
//               height: "250px",
//               objectFit: "cover",
//             }}
//           />

//           <div className="card-body d-flex flex-column">
//             <h5 className="card-title">
//               {el.groupName}
//             </h5>

//             <p className="card-text text-muted flex-grow-1">
//               {el.description}
//             </p>

//             <div className="d-flex gap-3 mt-3">
//               <Link to="">
//                 <i className="bi bi-facebook fs-5"></i>
//               </Link>

//               <Link to="">
//                 <i className="bi bi-instagram fs-5"></i>
//               </Link>

//               <Link to="">
//                 <i className="bi bi-twitter-x fs-5"></i>
//               </Link>

//               <Link to="">
//                 <i className="bi bi-linkedin fs-5"></i>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
//    */}


//    <div className="container py-5">
//   {data && (
//     <div className="row justify-content-center">
//       <div className="col-lg-6">
//         <div className="card shadow-sm border-0">
//           <img
//             src={data.Image}
//             className="card-img-top"
//             alt={data.groupName}
//             style={{
//               height: "300px",
//               objectFit: "cover",
//             }}
//           />

//           <div className="card-body">
//             <h3 className="card-title">{data.groupName}</h3>
//             <p className="card-text text-muted">
//               {data.description}
//             </p>
//             {/* <Link to=""  className="btn btn-primary">Join</Link> */}
//             <button className="btn btn-primary" onClick={joinGroup}>Join</button>

//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </div>
// </main>

//     </>
//   )


// }



function ViewSingleGroup() {

  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);


  // --------------------------------
  // Get Group
  // --------------------------------

  const fetchData = async () => {

    try {

      const result = await GroupServices.single(id);

      console.log("Group:", result);

      setData(result);

    } catch (error) {

      console.log(error);
      toast.error("Unable to load group");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchData();

  }, [id]);


  // --------------------------------
  // Add Member
  // --------------------------------

  const addMember = async (uid, groupId) => {

    try {

      const memberData = {
        uid: uid,
        groupId: groupId
      };

      console.log("Adding member:", memberData);

      const result = await GroupMemberServices.Add(memberData);

      console.log("Member result:", result);

      if (result === 1) {

        toast.success("You joined the group successfully!");

      } else {

        toast.error("Unable to join group");

      }

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }
  };


  // --------------------------------
  // Razorpay Payment
  // --------------------------------

  const handlePayment = (uid, group) => {

    if (!group.price || Number(group.price) <= 0) {

      toast.error("Invalid group price");

      return;
    }


    if (!window.Razorpay) {

      toast.error("Razorpay is not loaded");

      return;
    }


    setPaying(true);


    const options = {

      key: "rzp_test_TDKU6vfIJHggqf",

      amount: Number(group.price) * 100,

      currency: "INR",

      name: "Your App Name",

      description: `Join ${group.groupName}`,

      image: group.Image,


      // --------------------------------
      // Payment Successful
      // --------------------------------

      handler: async function (response) {

        console.log("Payment successful");

        console.log("Payment ID:", response.razorpay_payment_id);


        toast.success("Payment successful!");


        // Add user to group after payment
        await addMember(uid, group.id);

        setPaying(false);
      },


      prefill: {
        name: "",
        email: "",
        contact: ""
      },


      notes: {

        groupId: group.id,

        uid: uid

      },


      theme: {

        color: "#cc3d33"

      }

    };


    const razorpay = new window.Razorpay(options);


    // --------------------------------
    // Payment Failed
    // --------------------------------

    razorpay.on("payment.failed", function (response) {

      console.log("Payment failed:", response);

      toast.error("Payment failed");

      setPaying(false);

    });


    // --------------------------------
    // Open Razorpay
    // --------------------------------

    razorpay.open();

  };


  // --------------------------------
  // Join Group
  // --------------------------------

  const joinGroup = async () => {

    const uid = AuthServices.getUid();


    // User not logged in
    if (!uid) {

      toast.error("Please login first");

      return;
    }


    // Group not loaded
    if (!data) {

      toast.error("Group information not available");

      return;
    }


    console.log("Group type:", data.groupType);
    console.log("Group price:", data.price);


    // --------------------------------
    // PAID GROUP
    // --------------------------------

    if (data.groupType === "paid") {

      handlePayment(uid, data);

      return;
    }


    // --------------------------------
    // FREE GROUP
    // --------------------------------

    await addMember(uid, data.id);

  };


  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {

    return (

      <main className="main">

        <div className="container py-5 text-center">

          <h4>Loading group...</h4>

        </div>

      </main>

    );

  }


  // --------------------------------
  // Group Not Found
  // --------------------------------

  if (!data) {

    return (

      <main className="main">

        <div className="container py-5 text-center">

          <h4>Group not found</h4>

          <Link
            to="/"
            className="btn btn-primary mt-3"
          >
            Go Home
          </Link>

        </div>

      </main>

    );

  }


  // --------------------------------
  // UI
  // --------------------------------

  return (

    <main className="main">


      {/* Page Title */}

      <div
        className="page-title"
        data-aos="fade"
      >

        <div className="heading">

          <div className="container">

            <div className="row d-flex justify-content-center text-center">

              <div className="col-lg-8">

                <h1>View Group</h1>

              </div>

            </div>

          </div>

        </div>


        <nav className="breadcrumbs">

          <div className="container">

            <ol>

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li className="current">
                View Group
              </li>

            </ol>

          </div>

        </nav>

      </div>


      {/* Group Details */}

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-6">

            <div className="card shadow-sm border-0">


              {/* Group Image */}

              <img
                src={data.Image}
                className="card-img-top"
                alt={data.groupName}
                style={{
                  height: "300px",
                  objectFit: "cover"
                }}
              />


              <div className="card-body">


                {/* Group Name */}

                <h3 className="card-title">

                  {data.groupName}

                </h3>


                {/* Description */}

                <p className="card-text text-muted">

                  {data.description}

                </p>


                {/* Group Type */}

                <p>

                  <strong>Type: </strong>

                  {data.groupType === "paid"
                    ? "Paid Group"
                    : "Free Group"
                  }

                </p>


                {/* Price */}

                {data.groupType === "paid" && (

                  <p>

                    <strong>Price: </strong>

                    ₹{data.price}

                  </p>

                )}


                {/* Join Button */}

                <button
                  className="btn btn-primary"
                  onClick={joinGroup}
                  disabled={paying}
                >

                  {paying

                    ? "Opening Payment..."

                    : data.groupType === "paid"

                      ? `Pay ₹${data.price} & Join`

                      : "Join Free"

                  }

                </button>


              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}




export default ViewSingleGroup;