import React, { useState, useEffect, memo } from "react";
import Badge from "react-bootstrap/Badge";
// Relative path to find src/F1theme.css
import "../../F1theme.css";

const TRACKS = [
  { name: "Monza, Italy", lat: 45.62, lon: 9.28 },
  { name: "Silverstone, UK", lat: 52.0733, lon: -1.0147 },
  { name: "Spa-Francorchamps, Belgium", lat: 50.4372, lon: 5.9714 },
  { name: "Suzuka, Japan", lat: 34.8431, lon: 136.541 },
  { name: "Interlagos, Brazil", lat: -23.7036, lon: -46.6997 },
  { name: "Circuit of the Americas, USA", lat: 30.1328, lon: -97.6411 },
  { name: "Marina Bay, Singapore", lat: 1.2914, lon: 103.8645 },
  { name: "Yas Marina, Abu Dhabi", lat: 24.4672, lon: 54.6031 },
  { name: "Circuit de Monaco, Monaco", lat: 43.7347, lon: 7.4206 },
  { name: "Red Bull Ring, Austria", lat: 46.7236, lon: 14.8494 },
  { name: "Hungaroring, Hungary", lat: 47.5789, lon: 19.2486 },
  { name: "Circuit Gilles Villeneuve, Canada", lat: 45.5045, lon: -73.5229 },
  { name: "Hockenheimring, Germany", lat: 49.3278, lon: 8.5656 },
  { name: "Barcelona-Catalunya, Spain", lat: 41.57, lon: 2.2611 },
  { name: "Bahrain Circuit, Bahrain", lat: 26.0325, lon: 50.5106 },
];

/**
 * WeatherIcon Component: Memoized to stop "NS_BINDING_ABORTED"
 */
const WeatherIcon = memo(({ iconCode, description }) => (
  <div className="text-center mb-2">
    <img
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      loading="eager" // Prevents network aborts
      alt={description}
      className="img-fluid"
      style={{
        width: "80px",
        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
      }}
    />
  </div>
));

export default function WeatherAPI() {
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(TRACKS[0]);

  const apiKey = "8a6845fd76162b4a89739bf6902652e1";

  const fetchWeather = async (track) => {
    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${track.lat}&lon=${track.lon}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("API Limit reached or Network Error");

      const data = await response.json();
      const dailyData = data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setDailyForecast(dailyData);
    } catch (err) {
      console.error("API Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedTrack);
  }, [selectedTrack]);

  return (

    <div className="container-fluid px-4 min-vh-100 py-4">
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <div className="f1-telemetry-tip mb-5">
          <span className="f1-badge-tip">Weather information</span> 
        </div>
      </div>

      <div className="f1-telemetry-tip mb-5">
        <span className="f1-badge-tip">RIGHT NOW</span>
        <span>Monitoring atmospheric conditions for <strong className="text-danger">{selectedTrack.name}</strong></span>
      </div>


      <div className="mb-5 p-3 f1-card f1-border" style={{ borderBottom: 'none' }}>
        <label className="text-white text-uppercase small fw-bold mb-2 d-block opacity-50">
          Circuit Weather
        </label>
        <select
          className="form-select bg-black text-white border-secondary w-100 w-md-50"
          value={selectedTrack.name}
          onChange={(e) => setSelectedTrack(TRACKS.find((t) => t.name === e.target.value))}
        >
          {TRACKS.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center p-5 text-white italic">CALCULATING THERMAL DATA...</div>
      ) : (
        /* 5 collumn layout*/
        <div className="f1-dashboard-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {dailyForecast.map((day, idx) => (
            <div key={idx} className="f1-card f1-border">
              <div className="f1-card-body text-center">
                <Badge bg="danger" className="text-uppercase mb-4 py-2 italic fw-black">
                  {new Date(day.dt * 1000).toLocaleDateString([], { weekday: "long" })}
                </Badge>

                <WeatherIcon
                  iconCode={day.weather[0].icon}
                  description={day.weather[0].description}
                />

                <h2 className="fw-black italic text-white mb-1">{day.main.temp.toFixed(0)}°C</h2>
                <p className="text-danger text-uppercase fw-black small mb-0">
                  {day.weather[0].description}
                </p>

                {/* Pinned Date */}
                <div className="f1-card-footer border-top border-secondary border-opacity-25 mt-4">
                   <span className="opacity-50 small">
                    {new Date(day.dt * 1000).toLocaleDateString([], { month: "short", day: "numeric" })}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}