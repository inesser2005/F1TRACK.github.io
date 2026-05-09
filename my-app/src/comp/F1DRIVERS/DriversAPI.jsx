import React, { useEffect, useState, memo } from "react";
import "../../F1theme.css";

const GRID_2025 = [
  { full_name: "Lando Norris", team_name: "McLaren", driver_number: 4, team_colour: "FF8000", name_acronym: "NOR", country_code: "GB", champion: true, photo_url: "https://cdn.racingnews365.com/Riders/Norris/_570x570_crop_center-center_none/f1_2024_ln_mcl_lg.png?v=1708704280" },
  { full_name: "Oscar Piastri", team_name: "McLaren", driver_number: 81, team_colour: "FF8000", name_acronym: "PIA", country_code: "AU", photo_url: "https://cdn.racingnews365.com/Riders/Piastri/_570x570_crop_center-center_none/f1_2024_op_mcl_lg.png?v=1708704280" },
  { full_name: "Max Verstappen", team_name: "Red Bull", driver_number: 1, team_colour: "3671C6", name_acronym: "VER", country_code: "NL", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/maxver01.png?v=1741598967" },
  { full_name: "Liam Lawson", team_name: "Racing Bulls", driver_number: 30, team_colour: "3671C6", name_acronym: "LAW", country_code: "NZ", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/lawson-cutout-2025-vcarb.png?v=1743592719" },
  { full_name: "George Russell", team_name: "Mercedes", driver_number: 63, team_colour: "27F4D2", name_acronym: "RUS", country_code: "GB", photo_url: "https://cdn.racingnews365.com/Riders/Russell/_570x570_crop_center-center_none/f1_2024_gr_mer_lg.png?v=1708704486" },
  { full_name: "Kimi Antonelli", team_name: "Mercedes", driver_number: 12, team_colour: "27F4D2", name_acronym: "ANT", country_code: "IT", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/andant01.png?v=1741599652" },
  { full_name: "Lewis Hamilton", team_name: "Ferrari", driver_number: 44, team_colour: "E80020", name_acronym: "HAM", country_code: "GB", photo_url: "https://cdn.racingnews365.com/_458x458_crop_center-center_none/lewham01.png?v=1741603184" },
  { full_name: "Charles Leclerc", team_name: "Ferrari", driver_number: 16, team_colour: "E80020", name_acronym: "LEC", country_code: "MC", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/chalec01.png?v=1741600314" },
  { full_name: "Fernando Alonso", team_name: "Aston Martin", driver_number: 14, team_colour: "229971", name_acronym: "ALO", country_code: "ES", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/feralo01.png?v=1741601656" },
  { full_name: "Lance Stroll", team_name: "Aston Martin", driver_number: 18, team_colour: "229971", name_acronym: "STR", country_code: "CA", photo_url: "https://cdn.racingnews365.com/Riders/Stroll/_570x570_crop_center-center_none/f1_2024_ls_ast_lg.png?v=1708704434" },
  { full_name: "Pierre Gasly", team_name: "Alpine", driver_number: 10, team_colour: "0093CC", name_acronym: "GAS", country_code: "FR", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/piegas01.png?v=1741600763" },
  { full_name: "Franco Colapinto", team_name: "Alpine", driver_number: 43, team_colour: "0093CC", name_acronym: "COL", country_code: "AR", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/colapinto-cutout.png?v=1746604247" },
  { full_name: "Alex Albon", team_name: "Williams", driver_number: 23, team_colour: "64C4FF", name_acronym: "ALB", country_code: "TH", photo_url: "https://cdn.racingnews365.com/Riders/Albon/_570x570_crop_center-center_none/f1_2024_aa_wil.png?v=1708704612" },
  { full_name: "Carlos Sainz", team_name: "Williams", driver_number: 55, team_colour: "64C4FF", name_acronym: "SAI", country_code: "ES", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/carsai01.png?v=1741599360" },
  { full_name: "Yuki Tsunoda", team_name: "Red Bull", driver_number: 22, team_colour: "6692FF", name_acronym: "TSU", country_code: "JP", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/Tsunoda-red-bull-cutout-2.png?v=1743593139" },
  { full_name: "Isack Hadjar", team_name: "Racing Bulls", driver_number: 6, team_colour: "6692FF", name_acronym: "HAD", country_code: "FR", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/isahad01.png?v=1741599768" },
  { full_name: "Nico Hülkenberg", team_name: "Kick Sauber", driver_number: 27, team_colour: "52E252", name_acronym: "HUL", country_code: "DE", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/nichul01.png?v=1741601062" },
  { full_name: "Gabriel Bortoleto", team_name: "Kick Sauber", driver_number: 5, team_colour: "52E252", name_acronym: "BOR", country_code: "BR", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/gabbor01.png?v=1741601062" },
  { full_name: "Esteban Ocon", team_name: "Haas", driver_number: 31, team_colour: "B6BABD", name_acronym: "OCO", country_code: "FR", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/estoco01.png?v=1741600138" },
  { full_name: "Oliver Bearman", team_name: "Haas", driver_number: 87, team_colour: "B6BABD", name_acronym: "BEA", country_code: "GB", photo_url: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/olibea01.png?v=1741599990g" },
];

const FALLBACK_2026 = GRID_2025; 

const DriverPhoto = memo(({ acronym, fullName, customUrl }) => {
  const [imgSrc, setImgSrc] = useState(
    customUrl || (acronym 
      ? `https://media.formula1.com/content/dam/fom-website/drivers/2024Drivers/${acronym.toUpperCase()}01.png`
      : "https://www.formula1.com/content/dam/fom-website/drivers/S/SILHOUETTE01.png")
  );

  return (
    <div className="flex-shrink-0 bg-dark rounded-circle border border-secondary shadow-sm overflow-hidden" style={{ width: "60px", height: "60px" }}>
      <img
        src={imgSrc}
        alt={fullName}
        className="img-fluid w-100 h-100"
        style={{ objectFit: "cover" }}
        onError={() => setImgSrc("https://www.formula1.com/content/dam/fom-website/drivers/S/SILHOUETTE01.png")}
      />
    </div>
  );
});

export default function DriversAPI() {
  const [drivers, setDrivers] = useState([]);
  const [season, setSeason] = useState(2025);
  const [loading, setLoading] = useState(true);

  const TEAMS_TO_DISPLAY = ["McLaren", "Ferrari", "Red Bull", "Mercedes", "Aston Martin", "Alpine", "Williams", "Racing Bulls", "Haas", "Kick Sauber", "Audi", "Cadillac"];

  useEffect(() => {
    let isMounted = true;
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch(season === 2025 ? `https://api.openf1.org/v1/drivers?session_key=9682` : `https://api.openf1.org/v1/drivers?year=2026`);
        const data = await response.json();
        if (isMounted) setDrivers(data.length > 15 ? data : season === 2025 ? GRID_2025 : FALLBACK_2026);
      } catch (error) {
        if (isMounted) setDrivers(season === 2025 ? GRID_2025 : FALLBACK_2026);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchDrivers();
    return () => { isMounted = false; };
  }, [season]);

  if (loading) return <div className="text-center p-5 text-white italic">SYNCHRONIZING TELEMETRY...</div>;

  return (
    <div className="container-fluid px-4 min-vh-100 py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="f1-telemetry-tip">
          <span className="f1-badge-tip">Drivers information</span>
        </div>
        <select className="form-select w-25 bg-black text-white border-secondary" value={season} onChange={(e) => setSeason(Number(e.target.value))}>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <div className="f1-dashboard-grid">
        {TEAMS_TO_DISPLAY.map((teamName) => {
          const teamDrivers = drivers.filter((d) => (d.team_name || "").toLowerCase().includes(teamName.toLowerCase()));
          if (teamDrivers.length === 0) return null;
          return (
            <div key={teamName} className="f1-card">
              <div className="p-3 d-flex flex-column h-100">
                <h3 className="mb-4" style={{ fontSize: "1.1rem" }}>{teamName}</h3>
                <div className="mt-auto d-flex flex-column gap-3">
                  {teamDrivers.map((driver, idx) => (
                    <div key={idx} className="p-2 border border-white border-opacity-10">
                      <div className="d-flex align-items-center">
                        <DriverPhoto acronym={driver.name_acronym} fullName={driver.full_name} customUrl={driver.photo_url} />
                        <div className="ms-3 flex-grow-1 overflow-hidden">
                          <h6 className="fw-bold m-0 text-white text-truncate" style={{ fontSize: "0.85rem" }}>{driver.full_name}</h6>
                          <span className="fw-bold text-danger">#{driver.driver_number}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="f1-btn w-100 mt-2">Driver Profile</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}