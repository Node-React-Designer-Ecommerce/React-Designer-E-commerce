import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router";
import HeartIcon from "../icons/HeartIcon";
import SizeCharts from "../components/SizeCharts";
import Delivery from "../components/Delivery";
import Rating from "../components/Rating";
import ArrowLeft from './../icons/ArrowLeft';
import XIcon from "../icons/XIcon";
import HeardFilledIcon from "../icons/HeardFilledIcon";
import RadioComponent from "../components/RadioComponent";

export default function ProductDetails() {
    const { getProductById, product, favoriteProducts, toggleFavorite } = useProducts();
    const { id } = useParams();

    useEffect(() => {
        getProductById(id);
    }, [id, getProductById]);

    if (!product) {
        return <div className="h-screen text-SecondaryColor flex justify-center align-middle">
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
        </div>
    }

    return (
        <div className="w-full py-10 flex justify-center">
            <div className="w-4/5 card bg-base-100 shadow-xl lg:flex md:gap-11 md:flex lg:flex-row flex flex-col">
                <div className=" md:w-11/12 h-full lg:w-2/3 relative">
                    <button onClick={() => window.history.back()} className="bg-white p-2 top-3 start-3 absolute rounded-3xl">
                        <ArrowLeft />
                    </button>
                    <img src={product.image} alt={product.name} className=" w-full h-full rounded-xl object-fit" />
                </div>
                <div className="w-full p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold uppercase ">{product.name}</h1>
                        <div className="bg-gray-100 rounded-3xl w-12 h-12 flex justify-center items-center" onClick={() => toggleFavorite(product._id)}>
                            {favoriteProducts[product._id] ? <HeardFilledIcon /> : <HeartIcon />}   </div>
                    </div>
                    <Rating />
                    <div className="py-3 flex justify-between">
                        <p className="text-black "><span className="font-bold">Only In Stock:</span> {product.quantity}</p>
                   
                    </div>
                    <p className="text-green-800 text-xl font-bold">${product.price}</p>
                    <p className="py-4">{product.description}</p>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                            <button className="font-bold underline" onClick={() => document.getElementById('my_modal_5').showModal()}>Size Charts</button>
                            <p className="text-[13px] flex items-center text-gray-500">Check your size from here..</p>
                            </div>
                            <RadioComponent/>
                        </div>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <form method="dialog">
                                    <div className="p-3">
                                        <button className="float-right rounded-full"><XIcon /></button>
                                    </div>
                                </form>
                                <h3 className="font-bold text-lg">Size Charts</h3>
                                <p className="py-4">Choose your size carfully ..</p>
                                <div className="modal-action justify-center">
                                    <form method="dialog">
                                        <SizeCharts />
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <Delivery />
                        <div className="flex justify-center lg:flex lg:justify-end p-5">
                            <button className="bg-SecondaryColor hover:bg-green-900 transition duration-700 ease-in-out rounded-2xl text-white py-2 px-14 ">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

