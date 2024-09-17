import { useState } from "react";
// import axios from 'axios';
import { Link } from "react-router-dom";
import ArrowRight from "../icons/ArrowRight";
import { useProducts } from "../hooks/Products";
// import men from "../images/men.jpg";

export default function ProductsPage() {
    const { products } = useProducts();
    console.log(products)
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const handleSearch = (event) => {
        // console.log(event);
        setSearch(event.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search)
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
        <div className="w-full font-serif">
            <div className="relative w-full h-screen">
                <img src="/coverproduct.jpg" alt="New Collection" className="w-full h-full object-cover" />
                <div className="absolute top-1/4 left-5 right-5 md:left-10 text-neutral-950 p-4">
                    <p className="text-sm md:text-lg uppercase">Summer 2020</p>
                    <h1 className="text-3xl md:text-6xl font-bold">New Collection</h1>
                    <p className="mt-4 max-w-xs text-sm md:text-base">We know how large objects will act, but things on a small scale.</p>
                    <input type="text" placeholder="Search here .." className="input input-bordered rounded-3xl my-5 input-sm md:input-md w-full max-w-xs text-black" onChange={handleSearch} />
                    <button className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-3xl ms-7">
                        Shop Now
                    </button>
                </div>
            </div>
            <div className="py-36 flex flex-col lg:text-2xl items-center tracking-wide ">
                <p className="font-bold  text-gray-500">Featured Products</p>
                <p className="font-bold uppercase">BestSeller Prouducts</p>
                <p className="lg:text-lg text-gray-500">Simpilicty is the keynote of all true elegance</p>
            </div>
            <div className="flex justify-center ">
                <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-5">
                    {currentProducts.map(product =>
                        <div key={product._id} className="card bg-base-100 w-80 shadow-xl">
                            <figure className="px-5 pt-10">
                                <img
                                    src="/men.jpg"
                                    alt="Shoes"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <p className="text-green-800">${product.price}</p>
                                <div className="card-actions">
                                    <Link to={`/product-details/${product._id}`} className="flex">See More <ArrowRight /></Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center m-10">
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