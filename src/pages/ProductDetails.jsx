import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                console.log(res.data);
            })
            .catch(err => console.error("Error Fetching Data", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="w-full pt-5 font-serif">
            <div className="w-4/5 m-auto border md:flex xs:flex xs:flex-col">
                <div className="p-5 md:w-11/12 lg:w-3/4 ">
                    <img src={product.image} alt={product.title} className=" w-full object-contain" />
                </div>
                <div className="p-10 ">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold ">{product.title}</h1>
                        <div className="rating">
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
                    <p className="text-gray-400 py-3">{product.category}</p>
                    <p className="text-green-800 text-xl">${product.price}</p>
                    <p className="py-4">{product.description}</p>

                    <div className="dropdown">
                        <div className="flex gap-5">
                        <label className="font-bold">Size</label>
                        <div tabIndex={0} role="button" className="border border-gray-300 py-1 px-11 rounded">Please Select</div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Large</a></li>
                            <li><a>Meduim</a></li>
                            <li><a>Small</a></li>
                        </ul>
                    </div>
                    <div className="float-right">
                    <button className="bg-black  text-white py-1 px-14 hover:bg-white hover:text-black hover:border hover:border-black transition duration-150 ease-out hover:ease-in">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

