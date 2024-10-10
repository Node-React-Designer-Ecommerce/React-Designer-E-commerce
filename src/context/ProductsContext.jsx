import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByPage, getCategories } from "../utils/api/productsapi";
import PropTypes from "prop-types";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("search") || "";
  const initialPriceRange = [
    Number(searchParams.get("price[gte]")) || 0,
    Number(searchParams.get("price[lte]")) || 1000,
  ];
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [category, setCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (page, search = "", priceRange = [0, 1000], category = "") => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await getProductsByPage(page, search, priceRange, category);
      setProducts(response.products);
      setTotalPages(response.pagination.totalPages); // Use the totalPages from the response
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, search, priceRange, category);
    fetchCategories();
  }, [currentPage, search, priceRange, category]);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    const searchParam = searchParams.get("search") || "";
    const priceRangeParam = [
      Number(searchParams.get("price[gte]")) || 0,
      Number(searchParams.get("price[lte]")) || 1000,
    ];
    const categoryParam = searchParams.get("category") || "";

    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }

    if (searchParam !== search) {
      setSearch(searchParam);
    }

    if (priceRangeParam[0] !== priceRange[0] || priceRangeParam[1] !== priceRange[1]) {
      setPriceRange(priceRangeParam);
    }

    if (categoryParam !== category) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const handleSearch = (word) => {
    setSearch(word);
    setCurrentPage(1); // Reset to first page when searching
    setSearchParams({ search: word, page: 1, price: priceRange, category });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ search, page, price: priceRange, category });
  };

  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1); // Reset to first page when changing price range
    setSearchParams({ search, page: 1, price: newPriceRange, category });
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to first page when changing category
    setSearchParams({ search, page: 1, price: priceRange, category: newCategory });
  };

  return (
    <ProductsContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};