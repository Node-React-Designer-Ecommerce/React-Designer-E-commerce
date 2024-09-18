import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRight from "../icons/ArrowRight";
import { useProducts } from "../context/ProductsContext";
import HeartIcon from "../icons/HeartIcon";
import Skelton from "../components/Skelton";
import HeardFilledIcon from './../icons/HeardFilledIcon';
import ShoppingBag from './../icons/ShoppingBag';
import Filter from "../components/Filter";
import ArrowLeft from "../icons/ArrowLeft";

export default function ProductsPage() {
    const { products, loading, toggleFavorite, favoriteProducts } = useProducts();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const handleSearch = (event) => {
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

    if (loading) {
        return (
            <div className="flex justify-center">
                <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 py-10 gap-5">
                    {Array.from({ length: productsPerPage }).map((_, index) => (
                        <div key={index} className="card bg-base-100 w-80 shadow-xl">
                            <Skelton />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
<div className="w-full font-serif">
    <div className="py-24 flex flex-col lg:text-2xl items-center tracking-wide">
        <p className="font-bold  text-gray-500">Featured Products</p>
        <p className="font-bold uppercase">BestSeller Products</p>
        <p className="lg:text-lg text-gray-500">Simplicity is the keynote of all true elegance</p>
    </div>
    <div className="flex justify-center p-3">
        <div className="grid grid-col-1  sm:grid-cols-4 gap-5 relative">
            <div className="grid col-span-4  sm:col-span-2 md:col-span-1 h-96">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn text-lg drawer-button">Filters here </label>
                    </div>
                    <div className="drawer-side pt-10">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <input type="text" placeholder="Search here .." className="input input-bordered rounded-3xl my-5 input-sm md:input-md w-full max-w-xs text-black" onChange={handleSearch} />
                            {/* Sidebar content here */}
                            <Filter className="pt-10" />
                        </ul>
                    </div>
                </div>

            </div>
            <div className="grid col-span-4  sm:col-span-2 md:col-span-3 pt-36 sm:pt-0">
                <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-3 md:grid md:grid-cols-2 gap-8">
                    {/* No Data Found Message */}
                    {currentProducts.length === 0 ? (
                        <div className="flex items-center justify-center text-5xl text-gray-500 ">
                            <p className="">No Data Found .. </p>
                        </div>
                    ) : (
                        currentProducts.map(product => (
                            <div key={product._id} className="card bg-base-100 w-80 shadow-xl">
                                <figure className=" relative pt-10">
                                    <div className="bg-white rounded-3xl w-11 absolute top-12 start-7 h-11 flex justify-center items-center cursor-pointer"
                                        onClick={() => toggleFavorite(product._id)}>
                                        {favoriteProducts[product._id] ? <HeardFilledIcon /> : <HeartIcon />}
                                    </div>
                                    <img src={product.image} alt="Shoes" className="rounded-xl h-96 w-72" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title uppercase">{product.name}</h2>
                                    <p className="text-gray-600">{product.description}</p>
                                    <p className="text-green-800">${product.price}</p>
                                    <div className="flex justify-between pt-4 w-full">
                                        <Link to={`/product-details/${product._id}`} className="flex items-center">
                                            See More <ArrowRight />
                                        </Link>
                                        <Link className="bg-SecondaryColor hover:bg-green-900 transition duration-700 ease-in-out rounded-3xl w-11 h-11 flex justify-center items-center cursor-pointer">
                                            <ShoppingBag />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
    <div className="flex justify-center m-10 text-lg">
        <button onClick={handlePreviousPage} className={`flex items-center ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-black'} text-gray px-4 py-2 rounded`}>
        <ArrowLeft/>    Previous ..
        </button>
        <div className="px-5 text-2xl flex items-center">{currentPage}</div>
        <button onClick={handleNextPage} className={`flex items-center ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-black'} text-gray px-4 py-2 rounded`}>
           .. Next <ArrowRight/>
        </button>
    </div>
</div>
    );
}
