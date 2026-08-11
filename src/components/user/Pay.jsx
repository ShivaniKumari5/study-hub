import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Pay = () => {

    const [price, setprice] = useState();

    const el={
        price:467
    }

    const handlePay = (amt) => {
      
        var options = {
            // "key": "rzp_test_Q8bKRaQdmgftXW", 
            "key": "rzp_test_TDKU6vfIJHggqf", 
            "amount": amt * 100, // Amount is in currency subunits.
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
           
            "handler": function (response) {
               toast.success("Payment successfull")
               
            //    call 

            },
            "prefill": { 
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#cc3d33"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
           toast.error("Payment Failed")
        });
       
        rzp1.open();
          
        
    }
    return (
        <>
            <div className="container">
                <h1>Pay </h1>

                <input
                    value={price}
                    onChange={(e)=>{
                        setprice(e.target.value)
                    }}
                type="text" />
                <button onClick={() => {
                    handlePay(el.price)
                }}>Pay Now</button>
            </div>
        </>
    )
}

export default Pay