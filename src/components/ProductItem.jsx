import men from "../images/men.jpg";

function ProductItem() {
  return (
    
      <div className="border font-serif flex flex-col gap-5">
        <div className="w-full ">
          <img className="w-full" src={men} alt="" />
        </div>
        <div className="text-center">
          <h2>T-shirt</h2>
          <p className="text-sm ">English Department</p>
          <p className=" text-slate-600">
            500$
            <span className="text-red-950 pl-3 line-through font-bold">
              650$
            </span>
          </p>
        </div>
      </div>
    
  );
}

export default ProductItem;
