import React, { useState, useEffect } from "react";

export default function WeatherForecast() {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const WEATHER_API_BASE = "http://localhost:3000/api/weather";

  // Auto-detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `${WEATHER_API_BASE}/current?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data.sys?.country === "KE") {
            setLocation(data.name);
            fetchForecast(data.name);
          }
        } catch (error) {
          console.error("Geolocation weather fetch failed:", error);
        }
      });
    }
  }, []);

  const fetchForecast = async (city) => {
    setLoading(true);
    setForecast(null);

    try {
      const res = await fetch(`${WEATHER_API_BASE}/forecast?city=${city.trim()}`);
      const data = await res.json();

      if (data.cod !== "200") {
        alert(`Forecast error: ${data.message || data.error}`);
        setLoading(false);
        return;
      }

      const daily = data.list.filter((_, idx) => idx % 8 === 0).map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-KE", { weekday: "long" }),
        date: new Date(item.dt_txt).toLocaleDateString("en-KE", { month: "short", day: "numeric" }),
        condition: item.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        tempHigh: Math.round(item.main.temp_max),
        tempLow: Math.round(item.main.temp_min),
        humidity: item.main.humidity,
        rainfall: item.rain ? item.rain["3h"] || 0 : 0,
      }));

      setForecast(daily);
    } catch (error) {
      console.error("Forecast fetch failed:", error);
      alert("Failed to fetch forecast");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Forecast</h1>
          <p className="text-gray-600 mb-6">Get 5-day weather forecast for Kenyan cities</p>

          <form onSubmit={(e) => { e.preventDefault(); fetchForecast(location); }} className="mb-8 flex gap-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Kenyan city (e.g. Nairobi)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-md">
              {loading ? "Fetching..." : "Get Forecast"}
            </button>
          </form>

          {forecast && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Forecast for {location}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {forecast.map((day, idx) => (
                  <div key={idx} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">{day.day}</div>
                      <img src={day.icon} alt={day.condition} className="w-12 h-12" />
                    </div>
                    <div className="text-sm text-gray-500">{day.date}</div>
                    <div className="mt-2">{day.condition}</div>
                    <div className="flex justify-between mt-2">
                      <span>H: {day.tempHigh}°C</span>
                      <span>L: {day.tempLow}°C</span>
                    </div>
                    <div className="text-sm mt-1">Rain: {day.rainfall} mm</div>
                    <div className="text-sm">Humidity: {day.humidity}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}