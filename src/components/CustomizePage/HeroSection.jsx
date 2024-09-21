
export default function HeroSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
            <div className="bg-SecondaryColor flex justify-center items-center">
                <img
                    className="w-60 h-80 mt-20 mx-auto"
                    src="/girl.png"
                    alt="men t-shirt"
                />
            </div>
            <div className="bg-white flex justify-start items-center text-gray-600 md:col-span-2 p-4">
                <div className="text-lg w-full md:w-[600px]">
                    <div className="mb-5 font-bold text-3xl text-black">
                        Create Your Perfect T-Shirt!
                    </div>
                    Design custom T-shirts with ease using our intuitive tools. Express
                    your style, commemorate events, or make unique gifts. Choose colors,
                    fonts, and images, or upload your own artwork. Start designing today
                    and wear your creativity with pride!
                </div>

                <div className="hidden md:flex w-44 h-44 rounded-full bg-SecondaryColor mt-44 ms-48"></div>
            </div>
        </div>
    )
}
