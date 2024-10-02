import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function ProfileOrders() {

    const { userOrders } = useContext(UserContext);



    return (
        <div className="col-span-2">
            <div className="card h-full  bg-SecondaryColor text-white shadow-md rounded-lg p-4">
                <div className="card-body">
                    <h6 className="flex items-center mb-3">
                        My Orders
                    </h6>
                    <p className=""></p>
                </div>
            </div>
        </div>
    )
}
