import { Link } from "react-router-dom";

export default function NoData() {
    return (
        <div className='flex justify-center items-start py-12 '>
            <div className="flex flex-col gap-3">
                <img src="/no-data-found.avif" alt="" className='rounded-xl' />
                <Link to="/" className="btn bg-SecondaryColor text-white hover:bg-SecondaryColor">Back Home</Link>
            </div>
        </div>
    )
}
