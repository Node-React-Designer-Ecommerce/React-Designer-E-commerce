export default function ProfileDesigns() {
  return (
    <div className="col-span-2">
      <div className="card h-full bg-SecondaryColor text-white shadow-md rounded-lg p-4">
        <div className="card-body">
          <h6 className="flex items-center mb-3 text-xl font-bold">
            My Designs
          </h6>

          <div className="flex justify-center">
            <img src="/noFav.png" className="w-1/4" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
