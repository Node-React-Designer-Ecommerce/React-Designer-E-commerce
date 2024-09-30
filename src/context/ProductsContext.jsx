import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByPage } from "../utils/api/productsapi";
import PropTypes from "prop-types";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (page, search = "") => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await getProductsByPage(page, search);
      setProducts(response.products);
      setTotalPages(response.pagination.totalPages); // Use the totalPages from the response
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, search);
  }, [currentPage, search]);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    const searchParam = searchParams.get("search") || "";

    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }

    if (searchParam !== search) {
      setSearch(searchParam);
    }
  }, [searchParams]);

  const handleSearch = (word) => {
    setSearch(word);
    setCurrentPage(1); // Reset to first page when searching
    setSearchParams({ search: word, page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ search, page });
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};