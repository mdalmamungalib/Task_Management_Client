import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <p>Email: support@taskify.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Taskify Lane, Productivity City, PC 12345</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-500" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-700" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li>
                <a href="/terms" className="hover:underline">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-gray-700 pt-4">
          <p>&copy; {currentYear} Taskify. All rights reserved.</p>
          <p>Designed by A M G Company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
