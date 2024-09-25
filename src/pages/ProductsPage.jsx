import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

//react query
import { useQuery } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';

//utils
import { searchProducts } from '../utils/api/productsapi'
import { useToggleFavorite } from '../utils/helpers/help';

import Filter from "../components/Filter";
import Skelton from '../layouts/Skelton';

//icons
import ArrowRight from "../icons/ArrowRight";
import ShoppingBag from './../icons/ShoppingBag';
import ArrowLeft from "../icons/ArrowLeft";
import HeartIcon from "../icons/HeartIcon";
import HeardFilledIcon from "../icons/HeardFilledIcon";
import SearchIcon from './../icons/SearchIcon';
import NoData from './../components/NoData';


export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialSearch = searchParams.get("search") || "";
    const [search, setSearch] = useState(initialSearch);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const searchTimeout = useRef(null);

    // Fetch products based on the search query
    const { isLoading, data, isError, error } = useQuery(
        {
            queryKey: ['products', search],
            queryFn: () => searchProducts(search),
            cacheTime: 50000,
            enabled: search.length >= 3,
        }
    );

    const { favoriteProducts, toggleFavorite } = useToggleFavorite();

    const handleSearch = (event) => {
        const newSearch = event.target.value.toLowerCase();
        setSearch(newSearch);

        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            if (newSearch.length >= 3) { 
                setSearchParams({ search: newSearch });
            } else {
                setSearchParams({});
            }
        }, 500);
    };

    useEffect(() => {
        const searchParam = searchParams.get("search");
        if (searchParam && searchParam !== search) {
            setSearch(searchParam); // Sync the search state with the URL query param
        }
    }, [searchParams]);

    // Directly use the fetched products (filtered from API)
    const products = data ? data : [];
    console.log(products)

    // Pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    const firstIndex = (currentPage - 1) * productsPerPage;
    const lastIndex = firstIndex + productsPerPage;
    const currentProducts = products.slice(firstIndex, lastIndex);

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

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-8">
                    {Array.from({ length: productsPerPage }).map((_, index) => (
                        <div key={index} className="card bg-base-100 w-80 shadow-xl">
                            <Skelton />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="">
                <NoData />
                <h2 className="text-center text-red-600">Error: {error.message}</h2>;
            </div>
        )
    }

    return (
        <div className="w-full font-serif relative">
            <div className="pt-12 flex flex-col lg:text-2xl items-center tracking-wide">
                <p className="font-bold  text-gray-500">Featured Products</p>
                <p className="font-bold uppercase">BestSeller Products</p>
                <p className="lg:text-lg text-gray-500">Simplicity is the keynote of all true elegance</p>
            </div>
            <div className="sticky  top-28 z-50 mt-3">
                <div className="drawer flex justify-start px-5">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex justify-center">
                        <div className="group">
                            <label htmlFor="my-drawer" className="text-2xl cursor-pointer font-bold bg-SecondaryColor
                                                                  text-white flex items-center gap-3 py-2 px-5 rounded-lg ">
                                Filters here <SearchIcon />
                            </label>
                            {/* bg-gradient-to-r from-emerald-600 to-emerald-800 
                                                                  hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-800 */}
                            {/* <div className="bg-green-700 w-full h-[3px] rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div> */}
                        </div>
                    </div>
                    <div className="drawer-side z-10 pt-20">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">

                            <input type="text" placeholder="Search here .." value={search} className="input input-bordered rounded-3xl my-5 input-sm md:input-md w-full max-w-xs text-black" onChange={handleSearch} />

                            {/* Sidebar content here */}
                            <Filter className="pt-10" />
                        </ul>
                    </div>
                </div>

            </div>
            <div className="flex justify-center p-3">
                <div className="w-11/12 gap-5 relative flex justify-center">
                    <div className=" md:pt-16 pt-2">
                        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-8">
                            {/* No Data Found Message */}
                            {currentProducts.length === 0 ? (
                                <div className="flex items-center justify-center text-5xl text-gray-500 ">
                                    <p className="">No Data Found .. </p>
                                </div>
                            ) : (
                                currentProducts.map(product => (
                                    <div key={product._id} className="card bg-base-100 w-80 shadow-xl">
                                        <figure className=" relative pt-5">
                                            <div className="bg-white rounded-3xl w-11 absolute top-7 start-7 h-11 flex justify-center items-center cursor-pointer"
                                                onClick={() => toggleFavorite(product._id)}>
                                                {favoriteProducts[product._id] ? <HeardFilledIcon /> : <HeartIcon />}
                                            </div>
                                            <img src={product.image} alt="Shoes" className="rounded-xl h-[350px] w-72" />
                                        </figure>
                                        <div className="card-body py-3 items-center text-center">
                                            <h2 className="card-title uppercase">{product.name}</h2>
                                            <p className="text-gray-600">{product.description}</p>
                                            <p className="text-green-800">${product.price}</p>
                                            <div className="flex justify-between pt-1 w-full">
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
                    <ArrowLeft />    Previous ..
                </button>
                <div className="px-5 text-2xl flex items-center">{currentPage}</div>
                <button onClick={handleNextPage} className={`flex items-center ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-black'} text-gray px-4 py-2 rounded`}>
                    .. Next <ArrowRight />
                </button>
            </div>
        </div>
    );
}
