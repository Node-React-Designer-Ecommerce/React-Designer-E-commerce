import { Link } from "react-router-dom";

export default function NoData() {
    return (
        <div className='flex justify-center items-start py-12  w-1/2'>
            <div className="flex flex-col gap-3">
                <img src="/no-data-found.avif" alt="" className='rounded-xl '/>
                <Link to="/" className="btn bg-buttonColor text-white hover:bg-hoverButton">Back Home</Link>
            </div>
        </div>
    )
}
