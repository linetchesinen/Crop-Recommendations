import React, { useState } from "react";

export default function WeatherReport() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const WEATHER_API_BASE = "http://localhost:3000/api/weather";

  const generateReport = async (e) => {
    e.preventDefault();
    if (!location.trim() || !date) return;

    setLoading(true);
    setReport(null);

    try {
      const res = await fetch(`${WEATHER_API_BASE}/forecast?city=${location.trim()}`);
      const data = await res.json();

      if (data.cod !== "200") {
        alert(`Error: ${data.message || data.error}`);
        setLoading(false);
        return;
      }

      const dayForecasts = data.list.filter(item => item.dt_txt.startsWith(date));

      if (!dayForecasts.length) {
        alert("No forecast data available for this date");
        setLoading(false);
        return;
      }

      const temps = dayForecasts.map(i => i.main.temp);
      const humidities = dayForecasts.map(i => i.main.humidity);
      const rains = dayForecasts.map(i => i.rain ? i.rain["3h"] || 0 : 0);
      const conditions = dayForecasts.map(i => i.weather[0].main);

      const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
      const avgHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length);
      const totalRain = rains.reduce((a, b) => a + b, 0).toFixed(1);
      const dominantCondition = conditions.sort(
        (a, b) => conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
      ).pop();

      const dailyDetails = dayForecasts.map(item => ({
        time: new Date(item.dt_txt).toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" }),
        temp: item.main.temp.toFixed(1),
        condition: item.weather[0].main
      }));

      setReport({
        location,
        selectedDate: date,
        avgTemp,
        avgHumidity,
        totalRain,
        dominantCondition,
        dailyDetails
      });

    } catch (error) {
      console.error(error);
      alert("Failed to generate report");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">Daily Weather Report</h1>

          <form onSubmit={generateReport} className="grid gap-4 md:grid-cols-2 mb-6">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city"
              className="border px-4 py-2 rounded"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-4 py-2 rounded"
              required
            />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded md:col-span-2"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </form>

          {report && (
            <div className="mt-6 p-4 border rounded-md bg-gray-50">
              <h3 className="text-lg font-bold">{report.location} ({report.selectedDate})</h3>
              <p>Dominant Condition: {report.dominantCondition}</p>
              <p>Avg Temp: {report.avgTemp}°C</p>
              <p>Avg Humidity: {report.avgHumidity}%</p>
              <p>Total Rain: {report.totalRain} mm</p>

              <h4 className="mt-4 font-semibold">Hourly Details:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {report.dailyDetails.map((item, idx) => (
                  <div key={idx} className="border p-2 rounded">
                    <div>{item.time}</div>
                    <div>{item.temp}°C</div>
                    <div>{item.condition}</div>
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