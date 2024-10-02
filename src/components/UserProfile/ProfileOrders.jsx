import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function ProfileOrders() {
    const { userOrders } = useContext(UserContext);

    return (
        <div className="col-span-3">
            <div className="card h-full bg-SecondaryColor text-white shadow-md rounded-lg p-4">
                <div className="card-body">
                    <h6 className="flex items-center mb-3">
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
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}