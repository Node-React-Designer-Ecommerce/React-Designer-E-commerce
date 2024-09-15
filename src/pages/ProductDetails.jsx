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
        <div className="w-full pt-5">
            <div className="w-4/5 m-auto border md:flex xs:flex xs:flex-col">
                <div className="p-5 md:w-11/12 lg:w-3/4">
                    <img src={product.image} alt={product.title} className="h-96 w-full object-cover" />
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
                        {/* <p className="text-xl ">{product.rating.rate}</p> */}
                    </div>
                    <p className="text-gray-400 py-3">{product.category}</p>
                    <p className="text-green-800 text-xl">${product.price}</p>
                    <p className="py-4">{product.description}</p>
                </div>
            </div>
        </div>
    );
}

