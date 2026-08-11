import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupServices from "../../services/GroupServices";
import GroupMemberServices from "../../services/GroupMemberServices";
import AuthServices from "../../services/AuthServices";
import { toast } from "react-toastify";

function ViewGroup() {
  const [data, setData] = useState([]);
  const [groupMemberData, setgroupMemberData] = useState([]);

  const { id } = useParams()
  const uid = AuthServices.getUid()

  const fetchData = async () => {
    const res = await GroupServices.All(id);
    setData(res);
  }
  const fetchGroupMemberData = async () => {
    const result = await GroupMemberServices.All(uid);
    console.log(result);

    setgroupMemberData(result);
  }

  useEffect(() => {
    fetchData(),
      fetchGroupMemberData()
  }, []);

  // const handleJoin = async (group) => {
  //   if (group.groupType === "paid") {
  //     // Paid group 
  //     console.log("Payment required:", group.price);
  //     // Payment gateway will be called here
  //     toast.info(`Please pay ₹${group.price} to join this group`);
  //   } else {
  //     // Free group 
  //     console.log("Free group");
  //     //Call your join API here 
  //     //await GroupMemberServices.Add(...) ;
  //     toast.success("You can join this group for free");
  //   }
  // };


  const handleJoin = async (group) => {

    const uid = AuthServices.getUid();

    if (!uid) {
        toast.error("Please login first");
        return;
    }

    if (group.groupType === "paid") {

        console.log("Payment required:", group.price);

        handlePayment(uid, group);

    } else {

        await GroupMemberServices.Add({
            uid: uid,
            groupId: group.id
        });

        toast.success("Joined group successfully!");
    }
};

const handlePayment = async (uid, group) => {

    if (!window.Razorpay) {
        toast.error("Razorpay is not loaded");
        console.log("Razorpay object:", window.Razorpay);
        return;
    }

    const amount = Number(group.price);

    if (!amount || amount <= 0) {
        toast.error("Invalid payment amount");
        return;
    }

    console.log("Opening Razorpay...");
    console.log("Amount:", amount);

    const options = {

        key: "rzp_test_TDKU6vfIJHggqf",

        amount: amount * 100,

        currency: "INR",

        name: "Your App",

        description: `Join ${group.groupName}`,

        handler: async function (response) {

            console.log("Payment successful:", response);

            toast.success("Payment successful!");

            // Only after successful payment
            const result = await GroupMemberServices.Add({
                uid: uid,
                groupId: group.id
            });

            if (result === 1) {
                toast.success("You joined the group!");
            } else {
                toast.error("Payment successful but joining failed");
            }
        },

        prefill: {
            name: "",
            email: "",
            contact: ""
        },

        notes: {
            uid: uid,
            groupId: group.id
        },

        theme: {
            color: "#cc3d33"
        }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {

        console.log("Payment failed:", response);

        toast.error("Payment failed");
    });

    razorpay.open();
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
                  <h1>View Group</h1>

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
                <li className="current">View Group</li>
              </ol>
            </div>
          </nav>
        </div>
        {/* End Page Title */}
        {/* Courses Section */}
        {/* 
<div className="container mt-5">
  <div className="row g-4">
    {data.map((el, index) => (
      <div className="col-md-4 mb-3" key={index}>
        <div className="card h-100" style={{ width: "18rem" }}>
          <img src={el.Image} className="card-img-top" alt={el.groupName} />

          <div className="card-body">
            <h5 className="card-title">{el.groupName}</h5>
            <p className="card-text">{el.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div> */}


        <div className="container py-5">
          <div className="row g-4">
            {data.map((el) => (
              <div
                className="col-lg-4 col-md-6"
                key={el._id || el.id}
                data-aos="fade-up"
              >
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={el.Image}
                    className="card-img-top"
                    alt={el.groupName}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {el.groupName}
                    </h5>

                    <p className="card-text text-muted flex-grow-1">
                      {el.description}
                    </p>

                    {
                      groupMemberData.some(e => e.groupId == el.id) ?
                        <Link to={"/open/" + el.id} className="btn btn-primary">Open</Link>
                        :
                        <button className="btn btn-primary" onClick={() => handleJoin(el)} > {el.groupType === "paid" ? `Join for ₹${el.price}` : "Join Free"} </button>
                        //<Link to={"/viewSingleGroup/" + el.id} className="btn btn-primary">View Details</Link>
                      // logic paid unpaid


                    }

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </>
  )

}

export default ViewGroup;