import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen  bg-green-50 flex flex-col ">
  
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full ">
        {/* Hero */}
        <div className="min-h-7 bg-gradient-to-r from-green-500 via-red-500 to-blue-900 flex flex-col w-full items-center justify-center text-center p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to AgriTech System
          </h2>
          <p className="text-xl text-white mb-8">
            Empowering Kenyan farmers with smart agricultural solutions
          </p>

          <Link to="/login">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition">
              Get Started – Login Now
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 w-full max-w-6xl">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-10">
            Our Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Upload */}
            <Link to="/login" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">📤</div>

                <h4 className="text-xl font-semibold text-gray-800 mb-2">Upload</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Upload crop and field images for analysis
                </p>
                <p className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md inline-block">Login to Access</p>
              </div>
            </Link>

            {/* Preview */}
            <Link to="/login" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">👁️</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Preview</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Preview and manage your uploaded images
                </p>
                <p className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md inline-block">Login to Access</p>
              </div>
            </Link>

            {/* Yield */}
            <Link to="/login" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Yield Prediction</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Predict crop yield based on parameters
                </p>
                <p className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md inline-block">Login to Access</p>
              </div>
            </Link>

            {/* Crop Recommendation */}
            <Link to="/login" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">🌾</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Crop Recommendation</h4>
                <p className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md inline-block">Login to Access</p>
              </div>
            </Link>

            {/* Weather Forecast */}
            <Link to="/login" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">⛅</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Weather Forecast</h4>
                <p className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md inline-block">Login to Access</p>
              </div>
            </Link>

            {/* Weather Report */}
            <Link to="/login" className="block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">🌡️</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Weather Report</h4>
                <p className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md inline-block">Login to Access</p>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}
