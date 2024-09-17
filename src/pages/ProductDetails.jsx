import { useEffect } from "react";
import { useProducts } from "../hooks/Products";
import { useParams } from "react-router";
import HeartIcon from "../icons/HeartIcon";
import SizeCharts from "../components/SizeCharts";
import Delivery from "../components/Delivery";
import Rating from "../components/Rating";
import ArrowLeft from './../icons/ArrowLeft';

export default function ProductDetails() {
    const { getProductById, product } = useProducts();
    const { id } = useParams();

    useEffect(() => {
        getProductById(id);
    }, [id, getProductById]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="w-full py-10 flex justify-center font-serif">
            <div className="w-4/5 card bg-base-100 shadow-xl lg:flex md:gap-11 md:flex lg:flex-row flex flex-col">
                <div className=" md:w-11/12 h-full lg:w-2/3 relative">
                <button onClick={() => window.history.back()} className="bg-white p-2 top-3 start-3 absolute rounded-3xl">
                   <ArrowLeft/>
                </button>
                    <img src="/men.jpg" alt={product.name} className=" w-full h-full rounded-xl object-fit" />
                </div>
                <div className="w-full p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold ">{product.name}</h1>
                        <div className="bg-gray-100 rounded-3xl w-11 h-11 flex justify-center items-center"><HeartIcon /></div>
                    </div>
                    <Rating />
                    <div className="py-3 flex justify-between">
                        <p className="text-black "><span className="font-bold">Only In Stock:</span> {product.quantity}</p>
                        <div className="dropdown">
                            <div className="flex gap-5">
                                <label className="font-bold">Size</label>
                                <div tabIndex={0} role="button" className="border border-gray-300 py-1 px-11 rounded-xl">Please Select</div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Small</a></li>
                                <li><a>Meduim</a></li>
                                <li><a>Large</a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-green-800 text-xl">${product.price}</p>
                    <p className="py-4">{product.description}</p>
                    <div className="">
                        <button className="font-bold underline" onClick={() => document.getElementById('my_modal_5').showModal()}>Size Charts</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Size Charts</h3>
                                <p className="py-4">Choose your size carfully ..</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <SizeCharts />
                                        <div className="p-1">
                                            <button className="float-right btn btn-sm rounded-full">X</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <Delivery />
                        <div className="flex justify-center lg:flex lg:justify-end p-5">
                            <button className="bg-black rounded-xl text-white py-1 px-14 hover:bg-white hover:text-black hover:border hover:border-black transition duration-150 ease-out hover:ease-in">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

