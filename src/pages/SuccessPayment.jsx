// import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';

export default function SuccessPayment() {
    // const { totalPrice } = useCart();

    return (
        <div className="flex flex-col items-center justify-center p-10">
            <div className="flex flex-col justify-center items-center border w-96">
                <img src="/success.png" alt="success payment" className="w-3/6" />
                <div className="w-64">
                    <div className="flex justify-center items-center flex-col text-center p-5">
                        <h1 className="font-bold">Payment Successful!</h1>
                        <h3 className="">Thank you for your purchase</h3>
                    </div>
                    {/* <div className="flex justify-between w-64 border p-3 mt-4 mb-9">
                        <div className="mr-4">
                            <p className="">Amount Paid:</p>
                        </div>
                        <div className="text-right">
                            <div className="text-SecondaryColor">EGP {totalPrice}</div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Link to="/" className="btn btn-success text-white p-3 mt-3" replace>Back Home</Link>
        </div>
    );
}