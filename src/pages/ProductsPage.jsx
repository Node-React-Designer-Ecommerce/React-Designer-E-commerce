import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios.get("https://fakestoreapi.com/products")
            .then(res => {
                setProducts(res.data)
                console.log(res);
            })
            .catch(error => console.error("Error fetching data", error))
    }, [])

    const handleSearch = (event) => {
        console.log(event);
        setSearch(event.target.value.toLowerCase());
    }
    
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search)
    );

    return (
        <div className="w-full pt-5 ">
            <input type="text" placeholder="Search here .." className="input input-bordered input-md w-full max-w-xs" onChange={handleSearch} />
            <div className="flex justify-center pt-10">
                <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-3 w-10/12">
                    {filteredProducts.map(product =>
                        <div key={product.id} className="hover:border border-gray-300">
                            <div>
                                <img src={product.image} alt="product" className="h-96 w-full object-cover" />
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
        </div>
    )
}
