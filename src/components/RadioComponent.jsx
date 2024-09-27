export default function RadioComponent({ setSize }) {
  const handleSizeChange = (e) => {
    setSize(e.target.value); // Update the size in the parent component
  };
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-cente">
      <div>
        <label className="font-bold">Size</label>
      </div>
      <div className="flex flex-wrap gap-2 text-[12px] font-medium">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="size"
            value="XS"
            className="radio"
            onChange={handleSizeChange}
          />
          XS
        </label>
        <label className="flex items-center gap-1  ">
          <input
            type="radio"
            name="size"
            value="S"
            className="radio"
            onChange={handleSizeChange}
          />
          S
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="size"
            value="M"
            className="radio "
            onChange={handleSizeChange}
          />
          M
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="size"
            value="L"
            className="radio "
            onChange={handleSizeChange}
          />
          L
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="size"
            value="XL"
            className="radio"
            onChange={handleSizeChange}
          />
          XL
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="size"
            value="XXL"
            className="radio"
            onChange={handleSizeChange}
          />
          XXL
        </label>
      </div>
    </div>
  );
}
