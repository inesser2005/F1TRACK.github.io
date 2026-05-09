import React, { useEffect, useState, memo } from "react";
import "../../F1theme.css";

// Your Mapping and Helpers stay the same
const TEAM_COLORS = {
  Mercedes: "00D7B6",
  "Red Bull": "4781D7",
  Ferrari: "ED1131",
  McLaren: "F47600",
  "Aston Martin": "229971",
  Alpine: "00A1E8",
  Haas: "9C9FA2",
  Williams: "1868DB",
  "Racing Bulls": "6C98FF",
  Audi: "01C00E",
  Cadillac: "FFD700",
  Sauber: "01C00E",
};

const getTeamColor = (teamName) => {
  const match = Object.keys(TEAM_COLORS).find((key) =>
    teamName?.toLowerCase().includes(key.toLowerCase())
  );
  return TEAM_COLORS[match] || "E10600";
};

const TeamStripe = memo(({ color }) => (
  <div
    style={{
      width: "4px",
      height: "24px",
      backgroundColor: `#${color}`,
      marginRight: "12px",
      boxShadow: `0 0 8px #${color}66`,
    }}
  />
));

export default function StandingsAside() {
  const [results, setResults] = useState([]);
  const [view, setView] = useState("2025");
  const [loading, setLoading] = useState(true);

  // Fallback and useEffect logic remains identical to your previous version...

  const FALLBACK_2026 = [
    {
      full_name: "Lando Norris",
      team_name: "McLaren",
      driver_number: 1,
      team_colour: "FF8000",
      name_acronym: "NOR",
      country_code: "GB",
    },
    {
      full_name: "Oscar Piastri",
      team_name: "McLaren",
      driver_number: 81,
      team_colour: "FF8000",
      name_acronym: "PIA",
      country_code: "AU",
    },
    {
      full_name: "Charles Leclerc",
      team_name: "Ferrari",
      driver_number: 16,
      team_colour: "EF1A2D",
      name_acronym: "LEC",
      country_code: "MC",
    },
    {
      full_name: "Lewis Hamilton",
      team_name: "Ferrari",
      driver_number: 44,
      team_colour: "EF1A2D",
      name_acronym: "HAM",
      country_code: "GB",
    },
    {
      full_name: "Max Verstappen",
      team_name: "Red Bull",
      driver_number: 3,
      team_colour: "0600EF",
      name_acronym: "VER",
      country_code: "NL",
    },
    {
      full_name: "Isack Hadjar",
      team_name: "Red Bull",
      driver_number: 6,
      team_colour: "0600EF",
      name_acronym: "HAD",
      country_code: "FR",
    },
    {
      full_name: "George Russell",
      team_name: "Mercedes",
      driver_number: 63,
      team_colour: "00A19B",
      name_acronym: "RUS",
      country_code: "GB",
    },
    {
      full_name: "Kimi Antonelli",
      team_name: "Mercedes",
      driver_number: 12,
      team_colour: "00A19B",
      name_acronym: "ANT",
      country_code: "IT",
    },
    {
      full_name: "Fernando Alonso",
      team_name: "Aston Martin",
      driver_number: 14,
      team_colour: "229971",
      name_acronym: "ALO",
      country_code: "ES",
    },
    {
      full_name: "Lance Stroll",
      team_name: "Aston Martin",
      driver_number: 18,
      team_colour: "229971",
      name_acronym: "STR",
      country_code: "CA",
    },
    {
      full_name: "Pierre Gasly",
      team_name: "Alpine",
      driver_number: 10,
      team_colour: "0093CC",
      name_acronym: "GAS",
      country_code: "FR",
    },
    {
      full_name: "Franco Colapinto",
      team_name: "Alpine",
      driver_number: 43,
      team_colour: "0093CC",
      name_acronym: "COL",
      country_code: "AR",
    },
    {
      full_name: "Alex Albon",
      team_name: "Williams",
      driver_number: 23,
      team_colour: "041E42",
      name_acronym: "ALB",
      country_code: "TH",
    },
    {
      full_name: "Carlos Sainz",
      team_name: "Williams",
      driver_number: 55,
      team_colour: "041E42",
      name_acronym: "SAI",
      country_code: "ES",
    },
    {
      full_name: "Liam Lawson",
      team_name: "Racing Bulls",
      driver_number: 30,
      team_colour: "6692FF",
      name_acronym: "LAW",
      country_code: "NZ",
    },
    {
      full_name: "Arvid Lindblad",
      team_name: "Racing Bulls",
      driver_number: 41,
      team_colour: "6692FF",
      name_acronym: "LIN",
      country_code: "GB",
    },
    {
      full_name: "Esteban Ocon",
      team_name: "Haas",
      driver_number: 31,
      team_colour: "B6BABD",
      name_acronym: "OCO",
      country_code: "FR",
    },
    {
      full_name: "Oliver Bearman",
      team_name: "Haas",
      driver_number: 87,
      team_colour: "B6BABD",
      name_acronym: "BEA",
      country_code: "GB",
    },
    {
      full_name: "Nico Hülkenberg",
      team_name: "Audi",
      driver_number: 27,
      team_colour: "000000",
      name_acronym: "HUL",
      country_code: "DE",
    },
    {
      full_name: "Gabriel Bortoleto",
      team_name: "Audi",
      driver_number: 5,
      team_colour: "000000",
      name_acronym: "BOR",
      country_code: "BR",
    },
    {
      full_name: "Sergio Pérez",
      team_name: "Cadillac",
      driver_number: 11,
      team_colour: "FFD700",
      name_acronym: "PER",
      country_code: "MX",
    },
    {
      full_name: "Valtteri Bottas",
      team_name: "Cadillac",
      driver_number: 77,
      team_colour: "FFD700",
      name_acronym: "BOT",
      country_code: "FI",
    },
  ];

  useEffect(() => {
    const fetch2025Standings = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.jolpi.ca/ergast/f1/2025/driverstandings.json"
        );
        const data = await response.json();
        const standingsList =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const mapped = standingsList.slice(0, 10).map((item) => ({
          full_name: `${item.Driver.givenName} ${item.Driver.familyName}`,
          team_name: item.Constructors[0].name,
          acronym:
            item.Driver.code || item.Driver.driverId.slice(0, 3).toUpperCase(),
          points: item.points,
        }));
        setResults(mapped);
      } catch (error) {
        setResults(FALLBACK_2026);
      } finally {
        setLoading(false);
      }
    };

    if (view === "2025") fetch2025Standings();
    else {
      setResults(FALLBACK_2026);
      setLoading(false);
    }
  }, [view]);

  return (
    <div className="p-3 standings-sidebar">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h5
          className="fw-black italic text-uppercase m-0"
          style={{ fontSize: "0.9rem" }}
        >
          {view === "2025" ? "2025 STANDINGS" : "2026 PREVIEW"}
        </h5>
        <button
          className="f1-btn py-1 px-2 fw-black italic"
          onClick={() => setView(view === "2025" ? "2026" : "2025")}
          style={{ fontSize: "0.6rem" }}
        >
          SWITCH VIEW
        </button>
      </div>

      {loading ? (
        <div className="text-center p-5 opacity-50 italic">
          SYNCING TELEMETRY...
        </div>
      ) : (
        <div className="mb-4">
          {results.map((driver, i) => (
            <div
              key={i}
              className="f1-card mb-2 p-2 d-flex justify-content-between align-items-center"
              /* this allows to override the red borders from the main css file */
              style={{ borderLeft: "none", borderBottom: "none" }}
            >
              <div className="d-flex align-items-center">
                <TeamStripe color={getTeamColor(driver.team_name)} />
                <div className="d-flex flex-column">
                  <span
                    className="fw-black text-uppercase italic small"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {driver.full_name}
                  </span>
                  <span className="opacity-50" style={{ fontSize: "0.6rem" }}>
                    {driver.team_name}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-end">
               
                {view === "2025" && (
                  <span
                    className="fw-bold text-danger italic"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {driver.points} PTS
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
