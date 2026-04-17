import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Upload from "./pages/Contact.jsx";
import Preview from "./pages/Preview.jsx";
import CropRecommendation from "./pages/CropRecommendation.jsx";
import YieldPrediction from "./pages/YieldPrediction.jsx";
import WeatherForecast from "./pages/WeatherForecast.jsx";
import WeatherReport from "./pages/WeatherReport.jsx";
import Contact from "./pages/Contact.jsx";  
// Components
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Route */}
        <Route element={<Layout />}>

          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Farmer Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['farmer']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute roles={['farmer']}>
                <Upload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/preview"
            element={
              <ProtectedRoute roles={['farmer']}>
                <Preview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cropRecommendation"
            element={
              <ProtectedRoute roles={['farmer']}>
                <CropRecommendation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/yieldPrediction"
            element={
              <ProtectedRoute roles={['farmer']}>
                <YieldPrediction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weatherforecast"
            element={
              <ProtectedRoute roles={['farmer']}>
                <WeatherForecast />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute roles={['farmer']}>
                <Contact />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weatherReport"
            element={
              <ProtectedRoute roles={['farmer']}>
                <WeatherReport />
              </ProtectedRoute>
            }
          />
          {/* Admin */}
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}