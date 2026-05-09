import React, { useEffect, useState, memo } from "react";
import Badge from "react-bootstrap/Badge";
import "../../F1theme.css";

const TeamLogo = memo(({ teamName }) => {
  const logos = {
    "McLaren Formula 1 Team": "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/McLaren_Racing_logo.svg/200px-McLaren_Racing_logo.svg.png",
    "Mercedes Formula 1 Team": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/200px-Mercedes_AMG_Petronas_F1_Logo.svg.png",
    "Red Bull Racing": "https://redbullracing.com/assets/og-image.jpg",
    "Scuderia Ferrari": "https://images.seeklogo.com/logo-png/17/2/scuderia-ferrari-logo-png_seeklogo-176442.png",
    "Williams Racing": "https://mms.businesswire.com/media/20250211077629/en/2378615/5/Atlassian_Williams_Logo.jpg",
    "Haas F1 Team": "https://vectorseek.com/wp-content/uploads/2023/06/Haas-F1-Team-Logo-Vector.jpg",
    "RB F1 Team": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/VCARB_F1_logo.svg/200px-VCARB_F1_logo.svg.png",
    "Aston Martin F1 Team": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/manual/Misc/2021preseason/Aston-Martin-logo.webp",
    "Alpine F1 Team": "https://logowik.com/content/uploads/images/bwt-alpine-f1-team9519.jpg",
    "Sauber F1 Team": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgCmXeahleAZXcdIuuDku9epiJ9xXywPzeQ&s",
  };

  // 1. Set the initial source from your high-res object
  const primarySrc = logos[teamName] || "https://www.formula1.com/content/dam/fom-website/manual/f1_logo.png";
  const [imgSrc, setImgSrc] = useState(primarySrc);

  // 2. Optimized Fallback: If the Wikimedia link breaks, use the F1 global logo
  const handleLogoError = () => {
    if (imgSrc !== "https://www.formula1.com/content/dam/fom-website/manual/f1_logo.png") {
      setImgSrc("https://www.formula1.com/content/dam/fom-website/manual/f1_logo.png");
    }
  };

  return (
    <div
      className="mb-3 p-3 d-flex align-items-center justify-content-center bg-white rounded shadow-sm"
      style={{ height: "140px" }}
    >
      <img
        src={imgSrc}
        alt={teamName}
        className="img-fluid"
        style={{ maxHeight: "110px", objectFit: "contain" }}
        onError={handleLogoError} // This triggers if the Wikimedia link fails
        loading="lazy" // Improves performance by loading images only as you scroll
      />
    </div>
  );
});

export default function TeamsAPI() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Expanded mapping for 2025 teams
  const getCountryCode = (nationality) => {
    const mapping = {
      "Great Britain": "gb",
      "Germany": "de",
      "Austria": "at",
      "Italy": "it",
      "United States": "us",
      "Switzerland": "ch",
      "France": "fr",
    };
    return mapping[nationality] || "un";
  };

  useEffect(() => {
    fetch(`https://f1api.dev/api/current/teams`)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center p-5 text-white italic">WARMING TYRES...</div>
    );

  return (
    <div className="container-fluid px-4 min-vh-100 py-4">
      <div className="f1-telemetry-tip mb-5">
        <span className="f1-badge-tip">Teams Information </span>
        <span className="ms-2">
          Displaying official | <strong className="text-danger"> 2025 Season </strong>
        </span>
      </div>

      <div className="f1-dashboard-grid">
        {teams.map((team, index) => (
          <div key={index} className="f1-card h-100 d-flex flex-column">
            <div className="f1-card-body d-flex flex-column flex-grow-1">
              {/* Using our optimized Logo component with Fallback */}
              <TeamLogo teamName={team.teamName} />

              <div className="d-flex justify-content-between align-items-start mb-3">
                <h3 className="m-0 fw-black italic" style={{ fontSize: "1.2rem" }}>
                  {team.teamName}
                </h3>
                <img
                  src={`https://flagcdn.com/w40/${getCountryCode(team.teamNationality)}.png`}
                  alt="flag"
                  style={{ width: '25px' }}
                />
              </div>

              <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="opacity-50 text-uppercase">Nationality</span>
                  <span className="fw-bold">{team.teamNationality}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="opacity-50 text-uppercase">Constructors Titles</span>
                  <span className="fw-bold text-danger">{team.constructorsChampionships}</span>
                </div>
                <div className="d-flex justify-content-between mb-4 small">
                  <span className="opacity-50 text-uppercase">Drivers Titles</span>
                  <span className="fw-bold text-danger">{team.driversChampionships}</span>
                </div>

                <a href={team.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                  <button className="f1-btn w-100">View Archive</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}