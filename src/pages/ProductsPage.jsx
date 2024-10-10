import { useState, useRef, useEffect, useMemo, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Skelton from "../layouts/Skelton";
import Paginationn from "../components/Paginationn";
import HeartIcon from "../icons/HeartIcon";
import HeardFilledIcon from "../icons/HeardFilledIcon";
import NoData from "./../components/NoData";
import { useProducts } from "./../context/ProductsContext";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import AuthContext from "../context/AuthContext";

export default function ProductsPage() {
  const { isLoggedIn } = useContext(AuthContext);
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
    handlePriceRangeChange,
    handleCategoryChange,
    categories,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(initialSearch);
  const searchTimeout = useRef(null);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [category, setCategory] = useState("");

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

  const memoizedProductsSection = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
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
      <div className="flex justify-center p-3 mx-5">
        <div className="w-11/12 gap-5 relative flex justify-center">
          <div className=" md:pt-16 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-20">
              {/* No Data Found Message */}
              {products.length === 0 ? (
                <div className="w-full flex justify-center items-center col-span-3">
                  <NoData />
                </div>
              ) : (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="rounded-lg bg-base-100 w-80 shadow-xl"
                  >
                    <figure className=" relative pt-5">
                      {isLoggedIn && (
                        <div
                          className="bg-white rounded-3xl w-11 absolute top-9 start-4 h-11 flex justify-center items-center cursor-pointer"
                          onClick={() => toggleFavorite(product._id)}
                        >
                          {favoriteProducts && favoriteProducts[product._id] ? (
                            <HeardFilledIcon />
                          ) : (
                            <HeartIcon />
                          )}
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt="Shoes"
                        className="rounded-2xl p-2.5 h-[349px] w-full object-fit"
                      />
                    </figure>
                    <div className="p-4 items-center gap-1 text-center">
                      <div className="flex justify-between">
                        <h2 className="text-[17px] font-bold uppercase">
                          {product.name}
                        </h2>
                        <p className="text-xl font-bold text-buttonColor ">
                          ${product.price}
                        </p>
                      </div>
                      <p className="text-gray-500 py-2 text-start capitalize text-nowrap truncate">
                        {product.description}
                      </p>
                      <div className="flex justify-center pt-1 w-full">
                        <Link
                          to={`/product-details/${product._id}`}
                          className="btn w-full rounded text-white bg-buttonColor transition duration-700 hover:bg-hoverButton text-lg flex items-center"
                        >
                          See Details
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
    );
  }, [products, isLoading, isError, error, favoriteProducts]);

  return (
    <div className="w-full font-sans relative ">
      <div className=" flex flex-col lg:text-2xl items-center tracking-wide ">
        <div className="w-full grid grid-cols-4  ">
          <img
            src="productscover.png"
            alt="product page header image"
            className="h-60 sm:h-auto col-span-2"
          />
          <div className="py-10  col-span-2 flex flex-col justify-end">
            <p className="font-bold text-textColor md:text-4xl py-3">
              New Collection
            </p>
            <p className=" text-textColor text-xs md:text-base opacity-90 pb-3 md:pb-7 md:px-10 uppercase">
              Choose Your own style
            </p>
            <p className="lg:text-lg text-xs md:px-16 sm:text-gray-700">
              Simplicity is the keynote of all true elegance
            </p>
          </div>
        </div>
      </div>
      <div className="sticky top-20 z-20 p-3">
        <div className="">
          {/* Search */}
          <input
            type="text"
            placeholder="  Search products here .."
            value={localSearch}
            onChange={handleLocalSearch}
            className="input input-bordered rounded-3xl mt-4  input-sm md:input-md w-full max-w-xs text-black"
          />
        </div>
        <div className="">
          <input
            type="range"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => {
              const newPriceRange = [priceRange[0], parseInt(e.target.value)];
              setPriceRange(newPriceRange);
              handlePriceRangeChange(newPriceRange);
            }}
            className="range"
            step="25"
          />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>200</span>
            <span>400</span>
            <span>600</span>
            <span>800</span>
            <span>1000</span>
          </div>
        </div>
        <div className="">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleCategoryChange(e.target.value);
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {memoizedProductsSection}
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