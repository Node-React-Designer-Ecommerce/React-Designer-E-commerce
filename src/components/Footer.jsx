
function Footer() {
    return (
      <footer className="bg-gray-100  font-serif text-gray-700 p-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">صـــــــمم</h2>
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
        <h3 className="font-bold text-gray-900">Company Info</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Carrier</a></li>
          <li><a href="#" className="hover:underline">We are hiring</a></li>
          <li><a href="#" className="hover:underline">Blog</a></li>
        </ul>
      </div>
  
      <div>
        <h3 className="font-bold text-gray-900">Legal</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Carrier</a></li>
          <li><a href="#" className="hover:underline">We are hiring</a></li>
          <li><a href="#" className="hover:underline">Blog</a></li>
        </ul>
      </div>
  
      <div>
        <h3 className="font-bold text-gray-900">Features</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="hover:underline">Business Marketing</a></li>
          <li><a href="#" className="hover:underline">User Analytic</a></li>
          <li><a href="#" className="hover:underline">Live Chat</a></li>
          <li><a href="#" className="hover:underline">Unlimited Support</a></li>
        </ul>
      </div>
  
      <div>
        <h3 className="font-bold text-gray-900">Get In Touch</h3>
        <form className="mt-4">
          <input type="email" placeholder="Your Email" className="input rounded-none input-bordered w-full mb-4" />
          <button className="btn rounded-none bg-SecondaryColor hover:bg-green-800 w-full">Subscribe</button>
          <p className="text-xs text-gray-500 mt-2">Lorem ipsum dolor sit amet</p>
        </form>
      </div>
    </div>
  
    <div className="text-center py-6 border-t mt-6">
      <p className="text-sm">Made With Love By WAK WAAK WAAAAK Team <span className="text-3xl">🦆</span></p>
    </div>
  </footer>
  
    )
  }
  
  export default Footer