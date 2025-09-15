// components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-5 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-blue-600">ShipIt</h1>
          <p className="text-sm">AI Powered Customer Engagement Suite</p>
          <div className="flex space-x-3">
            <Link href="#">LinkedIn</Link>
            <Link href="#">YouTube</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Facebook</Link>
            <Link href="#">X</Link>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-semibold mb-3">Solutions</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="#">Next Gen CRM</Link></li>
            <li><Link href="#">Next Gen Loyalty</Link></li>
            <li><Link href="#">Next Gen Offers</Link></li>
          </ul>
        </div>

        {/* Customer Success Stories & Industries */}
        <div>
          <h3 className="font-semibold mb-3">Customer Success Stories</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="#">ShipIt Success Stories</Link></li>
            <li><Link href="#">ShipIt ROI Calculator</Link></li>
          </ul>

          <h3 className="font-semibold mt-5 mb-3">Industries</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="#">Fashion and Apparels</Link></li>
            <li><Link href="#">Beauty and Cosmetics</Link></li>
            <li><Link href="#">Restaurants</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="#">Retail Marketing Calendar</Link></li>
            <li><Link href="#">ShipIt Pulse</Link></li>
            <li><Link href="#">Blogs</Link></li>
            <li><Link href="#">Guides</Link></li>
            <li><Link href="#">Podcast</Link></li>
          </ul>
        </div>

        {/* Company and Subscribe */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="#">
                Careers <span className="bg-blue-600 text-white text-xs px-1 rounded ml-1">We are Hiring</span>
              </Link>
            </li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Get A Demo</Link></li>
          </ul>

          <div className="mt-5">
            <h4 className="font-semibold mb-2">ShipIt Pulse</h4>
            <form className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="border rounded px-2 py-1 flex-grow"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 rounded">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-1">*A weekly newsletter right in your inbox</p>
          </div>
        </div>
      </div>

      {/* Certifications and Offices */}
      <div className="mt-10 border-t pt-5 text-center text-sm text-gray-500">
        <div className="flex justify-center space-x-5 mb-3">
          <span>Users Love Us</span>
          <span>Momentum Leader Summer 2023</span>
          <span>High Performer Fall 2023</span>
          <span>AICPA SOC</span>
          <span>ISO 27001</span>
        </div>
        <p>
          Our Offices: <Link href="#">Dubai</Link> | <Link href="#">Delhi</Link> | <Link href="#">Mumbai</Link> | <Link href="#">Bengaluru</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
