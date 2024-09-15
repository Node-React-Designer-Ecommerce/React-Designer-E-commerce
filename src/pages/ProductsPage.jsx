import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.get("https://fakestoreapi.com/products")
            .then(res => {
                setProducts(res.data)
                console.log(res);
            })
            .catch(error => console.error("Error fetching data", error))
    }, [])
    return (
        <div className="w-full pt-5 flex justify-center">
            <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-3 w-10/12">
            {products.map(product =>          
            <div key={product.id} className="hover:border border-gray-300">
                <div>
                    <img src={product.image} alt="product" className="h-96 w-full object-cover"/>
                </div>
                <div className="flex flex-col items-center p-4 font-bold">
                <p >{product.title}</p>
                <p className="text-gray-400">{product.category}</p>
                <p className="text-green-800">${product.price}</p>
                <Link to={`/product-details/${product.id}`} className="hover:underline">See More ..</Link>
                </div>
            </div>
            )}
            </div>
        </div>
    )
}
