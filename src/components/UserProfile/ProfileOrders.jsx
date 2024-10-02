import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Skelton from "../../layouts/Skelton";

export default function ProfileOrders() {
    const { userOrders } = useContext(UserContext);

    if (!userOrders) {
        return <Skelton />;
    }


    return (
        <div className="col-span-3">
            <div className="card h-full bg-SecondaryColor text-white shadow-md rounded-lg p-4">
                <div className="card-body">
                    <h6 className="flex items-center mb-3 text-xl font-bold">
                        My Orders
                    </h6>
                    {userOrders && userOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="text-white font-bold">
                                        <th>Order ID</th>
                                        <th>Order Status</th>
                                        <th>Total Price</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <img src="/noorder3.png" className="w-1/4" alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}