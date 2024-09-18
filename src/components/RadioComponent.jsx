export default function RadioComponent() {
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-cente">
    <div>
        <label className="font-bold">Size</label>
    </div>
    <div className="flex flex-wrap gap-2 text-[12px] font-medium">
        <label className="flex items-center gap-1">
            <input type="radio" name="size" value="XS" className="radio" />
            XS
        </label>
        <label className="flex items-center gap-1  ">
            <input type="radio" name="size" value="S" className="radio" />
            S
        </label>
        <label className="flex items-center gap-1">
            <input type="radio" name="size" value="M" className="radio " />
            M
        </label>
        <label className="flex items-center gap-1">
            <input type="radio" name="size" value="L" className="radio " />
            L
        </label>
        <label className="flex items-center gap-1">
            <input type="radio" name="size" value="XL" className="radio" />
            XL
        </label>
        <label className="flex items-center gap-1">
            <input type="radio" name="size" value="XXL" className="radio" />
            XXL
        </label>
    </div>
</div>

  )
}
