import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Skelton from "../../layouts/Skelton";

export default function ProfileOrders() {
    const { userOrders } = useContext(UserContext);

    useEffect(() => {
        // This effect will trigger a re-render whenever userOrders change
    }, [userOrders]);

    if (!userOrders) {
        return <Skelton />;
    }

    return (
        <div className="col-span-3">
            <div className="card h-full bg-white shadow-md rounded-lg p-4">
                <div className="card-body">
                    <h6 className="flex items-center mb-3 text-xl font-bold">
                        My Orders
                    </h6>
                    {userOrders && userOrders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {userOrders.map((order) => (
                                <div key={order._id} className="card bg-slate-50  text-black shadow-xl rounded-lg p-4">
                                    <div className="card-body">
                                        <div className="flex justify-between flex-col sm:flex-row">
                                            <div className="">
                                                <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center mb-2">
                                                    <span className="font-bold">ID:</span>
                                                    <span className="text-xs sm:text-lg">{order._id}</span>
                                                </div>

                                                <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center">
                                                    <span className="font-bold">Date:</span>
                                                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center mb-2">
                                                    <span className="font-bold">Status:</span>
                                                    <span>{order.orderStatus}</span>
                                                </div>
                                                <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center mb-2">
                                                    <span className="font-bold">Total Price:</span>
                                                    <span>${order.totalPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="mt-4">
                                            <h6 className="text-lg font-bold mb-2">Order Items:</h6>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {order.items.map((item) => (
                                                    <div key={item._id} className="flex items-center space-x-4">
                                                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                                        <div>
                                                            <div className="font-bold">{item.product.name}</div>
                                                            <div>Quantity: {item.quantity}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <img src="/noorder3.png" className="w-1/4" alt="No Orders" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}