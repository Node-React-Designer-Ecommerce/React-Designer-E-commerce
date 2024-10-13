import { Link, useLocation } from 'react-router-dom';

export default function SuccessPayment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('orderId');
  const totalPrice = searchParams.get('amount');
  const paymentStatus = searchParams.get('paymentStatus');


  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="flex flex-col justify-center items-center border ">
        <img src="/success.png" alt="success payment" className="w-3/6" />
        <div className="">
          <div className="flex justify-center items-center flex-col text-center p-5">
            <h1 className="font-bold">Payment Successful!</h1>
            <h3 className="">Thank you for your purchase</h3>
          </div>
          <div className="flex justify-between   p-3 mt-4 mb-9">
            <div className="mr-4 p-2">
              <p className="">Order ID:</p>
              <p className="">Amount Paid:</p>
              <p className="">Payment Status:</p>
            </div>
            <div className="text-right p-2">
              <div className="text-SecondaryColor">{orderId}</div>
              <div className="text-SecondaryColor">EGP {totalPrice}</div>
              <div className="text-SecondaryColor">{paymentStatus}</div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="btn bg-buttonColor hover:bg-hoverButton text-white p-3 mt-3" replace>Back Home</Link>
    </div>
  );
}




// import { useLocation } from 'react-router-dom';
// import SuccessPaymentModal from './SuccessPayment';
// import { useState } from 'react';

// export default function PaymentPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({});

//   const handlePaymentSuccess = (orderId, totalPrice, paymentStatus) => {
//     setOrderDetails({ orderId, totalPrice, paymentStatus });
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   // Example usage of handlePaymentSuccess
//   // You can call this function when you receive the payment success callback
//   const simulatePaymentSuccess = () => {
//     const orderId = '12345';
//     const totalPrice = '100';
//     const paymentStatus = 'success';
//     handlePaymentSuccess(orderId, totalPrice, paymentStatus);
//   };

//   return (
//     <div>
//       {/* Your payment form or button */}
//       <button onClick={simulatePaymentSuccess}>Simulate Payment Success</button>

//       {/* Success Payment Modal */}
//       <SuccessPaymentModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         orderId={orderDetails.orderId}
//         totalPrice={orderDetails.totalPrice}
//         paymentStatus={orderDetails.paymentStatus}
//       />
//     </div>
//   );
// }