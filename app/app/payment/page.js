// // PaymentForm.js
"use client";
// import { apiLink } from "@/api";
// import axios from "axios";
// import { useState } from "react";

import { apiLink } from "@/api";

// const PaymentForm = () => {
//   const [amount, setAmount] = useState("");

//   const handlePayment = async () => {
//     // Call your backend to initiate payment
//     const response = await axios.get(apiLink + "/pay", { params: { amount } });

//     const { data } = response;

//     const options = {
//       key: "rzp_test_ITafrUIVpjBMpW", // Your Razorpay key ID
//       amount: data.amount,
//       currency: "INR",
//       name: "Your Company Name",
//       description: "Product description",
//       order_id: data.id, // Order ID received from backend
//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//         // Handle payment success
//       },
//       prefill: {
//         name: "Your Name",
//         email: "your.email@example.com",
//       },
//       payment_method: {
//         method: "upi",
//       },
//     };

//     const razorpayInstance = new Razorpay(options);
//     razorpayInstance.open();
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={handlePayment}>Pay Now</button>
//     </div>
//   );
// };

// export default PaymentForm;

function Product() {
  const amount = 500;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch(apiLink + "/pay/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "keyid", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Courses For Career", //your business name
      description: "Purchase Course",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(apiLink + "/pay/order/validate", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes, "dddd");
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="product">
      <h2>Tshirt</h2>
      <p>Solid blue cotton Tshirt</p>

      <br />
      <button onClick={paymentHandler}>Pay</button>
    </div>
  );
}

export default Product;
