function Footer({ children, className = "" }) {
  return (
    <footer className={`bg-white border-t border-gray-200 mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            © 2024 Smart Complaint Management System. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            {children}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;