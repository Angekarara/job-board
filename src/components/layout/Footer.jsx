import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JobBoard</h3>
            <p>Find your dream job with us</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-primary">
              <li>Email: contact@jobboard.com</li>
              <li>Phone: (250) 789 567 890</li>
              <li>Address: 123 Job Street, Kigali City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-primary">© 2024 JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
