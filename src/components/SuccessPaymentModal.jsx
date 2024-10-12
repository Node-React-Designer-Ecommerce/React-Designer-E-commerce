import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SuccessPaymentModal({ isOpen, onClose, orderId, totalPrice, paymentStatus }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center border">
          <img src="/success.png" alt="success payment" className="w-3/6" />
          <div className="">
            <div className="flex justify-center items-center flex-col text-center p-5">
              <h1 className="font-bold">Payment Successful!</h1>
              <h3 className="">Thank you for your purchase</h3>
            </div>
            <div className="flex justify-between p-3 mt-4 mb-9">
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
        <Link to="/" className="btn btn-success text-white p-3 mt-3" replace>Back Home</Link>
        <button onClick={onClose} className="btn btn-secondary text-white p-3 mt-3 ml-3">Close</button>
      </div>
    </div>
  );
}

SuccessPaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  paymentStatus: PropTypes.string.isRequired,
};