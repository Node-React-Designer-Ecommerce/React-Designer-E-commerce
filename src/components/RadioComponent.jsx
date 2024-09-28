/* eslint-disable react/prop-types */
export default function RadioComponent({ setSize, stock }) {
  const handleSizeChange = (e) => {
    setSize(e.target.value); // Update the size in the parent component
  };


  return (
    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
      <div>
        <label className="font-bold">Size</label>
      </div>
      <div className="flex flex-wrap gap-2 text-[12px] font-medium">
        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
          <label className="flex items-center gap-1" key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              className="radio"
              onChange={handleSizeChange}
              disabled={!stock.has(size)} // Disable if size is not available
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
}
