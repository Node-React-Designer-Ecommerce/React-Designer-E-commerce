import { useState } from 'react';

const Filter = () => {
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [categories, setCategories] = useState({
    Men: false,
    Female: false,
    Kids: false,
  });

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: checked,
    }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceRange([100, value]);
  };

  return (
    <div className="p-6 bg-white rounded-lg h-full shadow-lg max-w-sm">
      {/* Header */}
      <h2 className="text-xl font-bold mb-6">
        <span className="text-SecondaryColor">Filter</span> Products
      </h2>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Filter by Price</h3>
        <input
          type="range"
          min="100"
          max="1000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-green-100 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Filter by Category</h3>
        <div className="space-y-2">
          {Object.keys(categories).map((category, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                name={category}
                checked={categories[category]}
                onChange={handleCategoryChange}
                className="h-4 w-4 text-SecondaryColor border-gray-300 rounded"
              />
              <span className="ml-2">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
