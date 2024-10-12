import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 text-center sm:text-start  text-gray-700 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <div className="flex justify-center sm:justify-start">
            <Link to="/" className="">
              <img src="/public/sammlyLogo.png" width={90} alt="logo" />
            </Link>
          </div>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-purpleColor">Company Info</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Carrier
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                We are hiring
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-purpleColor">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Carrier
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                We are hiring
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-purpleColor">Features</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Business Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                User Analytic
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Live Chat
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Unlimited Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-purpleColor text-center">Get In Touch</h3>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="input rounded input-bordered w-full mb-4"
            />
            <button className="btn rounded bg-buttonColor text-white hover:bg-hoverButton w-full">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-6 border-t mt-6">
        <p className="text-sm">
          Made With Love By{" "}
          <Link
            to={"/AboutUs"}
            className="text-purpleColor hover:cursor-pointer"
          >
            WAK WAAK WAAAAK
          </Link>
          Team <span className="text-3xl">🦆</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
