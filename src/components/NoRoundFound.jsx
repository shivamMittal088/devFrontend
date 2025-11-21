import { useNavigate } from "react-router-dom";

const NoRouteFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      
      <div className="text-8xl font-extrabold mb-6 text-red-400 drop-shadow-lg">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-3">
        Page Not Found
      </h1>

      <p className="text-gray-300 text-center mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all shadow-lg"
      >
        Go Back Home
      </button>

      <div className="mt-10 opacity-70 text-sm">
        <span className="text-gray-400">DEVTINDER | Lost in the Code?</span>
      </div>
    </div>
  );
};

export default NoRouteFound;
