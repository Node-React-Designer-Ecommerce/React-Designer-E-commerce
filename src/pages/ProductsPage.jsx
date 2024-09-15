import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import ArrowRight from "../icons/ArrowRight";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

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
        setCurrentPage(1);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search)
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const firstIndex = (currentPage - 1) * productsPerPage;
    const lastIndex = firstIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="w-full">
            <div className="relative w-full  bg-blue-500">
                <img src="/cover.jpg" alt="New Collection" className="w-full h-full object-cover" />
                <div className="absolute top-1/4 left-10 text-white">
                    <p className="text-lg uppercase">Summer 2020</p>
                    <h1 className="text-6xl font-bold">New Collection</h1>
                    <p className="mt-4 max-w-xs">
                        We know how large objects will act, but things on a small scale.
                    </p>
                    <input type="text" placeholder="Search here .." className="input input-bordered rounded-3xl my-5 input-md w-full max-w-xs" onChange={handleSearch} />
                    <button className="bg-green-600 text-white px-4 py-2 rounded-3xl ms-7">
                        Shop Now
                    </button>
                </div>
            </div>
                <div className="py-36 flex flex-col items-center ">
                    <p className="font-bold text-sm text-gray-500">Featured Products</p>
                    <p className="font-bold uppercase">BestSeller Prouducts</p>
                    <p className="text-sm text-gray-500">Simpilicty is the keynote of all true elegance</p>
                </div>
            <div className="flex justify-center ">
                <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-3 w-10/12">
                    {currentProducts.map(product =>
                        <div key={product.id} className="hover:border border-gray-300">
                            <div className="p-1">
                                <img src={product.image} alt="product" className="h-96 w-full object-cover" />
                            </div>
                            <div className="flex flex-col items-center p-4 font-bold">
                                <p className="text-center">{product.title}</p>
                                <p className="text-gray-400">{product.category}</p>
                                <p className="text-green-800">${product.price}</p>
                                <Link to={`/product-details/${product.id}`} className="hover:underline flex">See More <ArrowRight/></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-sm btn-outline mr-2">
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-sm btn-outline">
                    Next
                </button>
            </div>
        </div>
    )
}
