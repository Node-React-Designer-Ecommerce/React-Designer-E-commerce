import { useEffect } from "react";
import { useProducts } from "../hooks/Products";
import { useParams } from "react-router";

export default function ProductDetails() {
    const { getProductById, product } = useProducts();
    // console.log(product);
    const { id } = useParams();


    useEffect(() => {
        getProductById(id);
    }, [id, getProductById]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="w-full py-10 flex justify-center font-serif">
            <div className="w-4/5 card bg-base-100  shadow-xl lg:flex gap-20 md:flex lg:flex-row flex flex-col">
                <div className="p-5 md:w-11/12 lg:w-2/5 ">
                    <img src="/men.jpg" alt={product.name} className=" w-full rounded-xl object-contain" />
                </div>
                <div className="p-5 w-full">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold ">{product.name}</h1>
                        <div className="rating px-5">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-amber-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-500" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                        </div>
                    </div>
                    <p className="text-gray-400 py-3"><span className="text-black">Only In Stock:</span> {product.quantity}</p>
                    <p className="text-green-800 text-xl">${product.price}</p>
                    <p className="py-4">{product.description}</p>
                <div className="">
                    <div className="dropdown">
                        <div className="flex gap-5">
                            <label className="font-bold">Size</label>
                            <div tabIndex={0} role="button" className="border border-gray-300 py-1 px-11 rounded-x">Please Select</div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Large</a></li>
                            <li><a>Meduim</a></li>
                            <li><a>Small</a></li>
                        </ul>
                    </div>
                    <div className="flex justify-center lg:flex lg:justify-end p-5">
                        <button className="bg-black rounded-xl text-white py-1 px-14 hover:bg-white hover:text-black hover:border hover:border-black transition duration-150 ease-out hover:ease-in">ADD TO CART</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

