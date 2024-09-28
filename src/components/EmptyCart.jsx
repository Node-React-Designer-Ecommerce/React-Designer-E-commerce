import { Link } from "react-router-dom";

export default function EmptyCart() {
    return (
        <div className='flex justify-center items-start py-12 '>
            <div className="flex flex-col gap-3">
                <img src="/emptyCartBG.png" alt="" className='rounded-xl' />
                <Link to="/products" className="btn bg-SecondaryColor text-white hover:bg-SecondaryColor">Back Home</Link>
            </div>
        </div>
    )
}
