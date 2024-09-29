import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";
import Skelton from "../layouts/Skelton";
import Paginationn from "../components/Paginationn";

//icons
import ArrowRight from "../icons/ArrowRight";
import HeartIcon from "../icons/HeartIcon";
import HeardFilledIcon from "../icons/HeardFilledIcon";
import SearchIcon from "./../icons/SearchIcon";
import NoData from "./../components/NoData";
import { useProducts } from "./../context/ProductsContext";
import { useToggleFavorite } from "../utils/helpers/help";

export default function ProductsPage() {
  const { favoriteProducts, toggleFavorite } = useToggleFavorite();
  const {
    products,
    currentPage,
    totalPages,
    search,
    isLoading,
    isError,
    error,
    handleSearch,
    handlePageChange,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(initialSearch);
  const searchTimeout = useRef(null);

  const handleLocalSearch = (e) => {
    const newSearch = e.target.value.toLowerCase();
    setLocalSearch(newSearch);

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      handleSearch(newSearch);
      setSearchParams({ search: newSearch, page: currentPage });
    }, 500);
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam && searchParam !== search) {
      setLocalSearch(searchParam);
      handleSearch(searchParam);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-8">
          {Array.from({ length: 7 }).map((_, index) => (
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
    );
  }

  return (
    <div className="w-full font-serif relative ">
      <div className="relative flex flex-col lg:text-2xl items-center tracking-wide">
        <img
          src="products-page.jpg"
          alt=""
          className="h-96 w-full object-cover"
        />
        <div className="absolute top-40 lg:top-16 lg:right-40">
          <p className="font-bold  text-gray-500">Featured Products</p>
          <p className="font-bold uppercase">BestSeller Products</p>
          <p className="lg:text-lg text-gray-500">
            Simplicity is the keynote of all true elegance
          </p>
          {/* Search */}
          <input
            type="text"
            placeholder="Search here .."
            value={localSearch}
            onChange={handleLocalSearch}
            className="input input-bordered rounded-3xl my-20 input-sm md:input-md w-full max-w-xs text-black"
          />
        </div>
      </div>
      <div className="sticky  top-28 z-50 mt-3 hidden">
        <div className="drawer flex justify-start px-5">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex justify-center">
            <div className="group">
              <label
                htmlFor="my-drawer"
                className="text-2xl cursor-pointer font-bold bg-SecondaryColor
                                                                  text-white flex items-center gap-3 py-2 px-5 rounded-lg "
              >
                Filters here <SearchIcon />
              </label>
            </div>
          </div>
          <div className="drawer-side z-10 pt-20">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <Filter className="pt-10" />
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-3 mx-5">
        <div className="w-11/12 gap-5 relative flex justify-center">
          <div className=" md:pt-16 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-8">
              {/* No Data Found Message */}
              {products.length === 0 ? (
                <div className="flex items-center justify-center text-5xl text-gray-500 ">
                  <p className="">No Data Found .. </p>
                </div>
              ) : (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="card bg-base-100 w-80 shadow-xl"
                  >
                    <figure className=" relative pt-5">
                      <div
                        className="bg-white rounded-3xl w-11 absolute top-7 start-7 h-11 flex justify-center items-center cursor-pointer"
                        onClick={() => toggleFavorite(product._id)}
                      >
                        {favoriteProducts[product._id] ? (
                          <HeardFilledIcon />
                        ) : (
                          <HeartIcon />
                        )}
                      </div>
                      <img
                        src={product.image}
                        alt="Shoes"
                        className="rounded-xl h-[330px] w-full object-fit"
                      />
                    </figure>
                    <div className="card-body py-3 items-center text-center">
                      <h2 className="card-title uppercase">{product.name}</h2>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-green-800">${product.price}</p>
                      <div className="flex justify-between pt-1 w-full">
                        <Link
                          to={`/product-details/${product._id}`}
                          className="flex items-center"
                        >
                          See More <ArrowRight />
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
      {/* Pagination Controls */}
      <div className="flex justify-center  m-10 text-lg">
        <Paginationn
          getPage={handlePageChange}
          pageCount={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
