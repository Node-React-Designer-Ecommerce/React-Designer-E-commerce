import { Link } from "react-router-dom";

export default function EmptyCart() {
    return (
        <div className='flex justify-center items-start py-12 '>
            <div className="flex flex-col gap-3">
                <div className="flex justify-center">
                    <img src="/emptycartpurple.png" alt="" className='rounded-xl w-1/2' />
                </div>
                <Link to="/products" className="btn bg-buttonColor text-white hover:bg-hoverButton">Back Home</Link>
            </div>
        </div>
    )
}
