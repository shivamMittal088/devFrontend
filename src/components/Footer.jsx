const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 via-rose-500 to-yellow-400 text-white py-5 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
        
        {/* content section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* your content */}
        </div>

        <div className="mt-4 border-t border-white/30 pt-2 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
