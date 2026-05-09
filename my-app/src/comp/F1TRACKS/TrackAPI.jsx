import React, { useState, useEffect, memo } from "react";
import "../../F1theme.css";

const TRACK_IMAGES = {
  bahrain:
    "https://cdn.racingnews365.com/Circuits/Bahrain/_639xAUTO_crop_center-center_none/f1_2024_bhr_outline.png?v=1708703170",
  jeddah:
    "https://cdn.racingnews365.com/Circuits/Saudi-Arabia/_639xAUTO_crop_center-center_none/f1_2024_sau_outline.png?v=1708703459",
  albert_park:
    "https://cdn.racingnews365.com/Circuits/Australia/_639xAUTO_crop_center-center_none/f1_2024_aus_outline.png?v=1708703502",
  suzuka:
    "https://cdn.racingnews365.com/Circuits/Japan/_639xAUTO_crop_center-center_none/f1_2024_jap_outline.png?v=1708703707",
  miami:
    "https://cdn.racingnews365.com/Circuits/Miami/_639xAUTO_crop_center-center_none/f1_2024_mia_outline.png?v=1708703742",
  monaco:
    "https://cdn.racingnews365.com/Circuits/Monaco/_639xAUTO_crop_center-center_none/f1_2024_mco_outline.png?v=1708704049",
  villeneuve:
    "https://cdn.racingnews365.com/Circuits/Canada/_639xAUTO_crop_center-center_none/f1_2024_can_outline.png?v=1708703928",
  catalunya:
    "https://cdn.racingnews365.com/Circuits/Spain/_639xAUTO_crop_center-center_none/f1_2024_spn_outline.png?v=1708704110",
  red_bull_ring:
    "https://cdn.racingnews365.com/Circuits/Austria/_639xAUTO_crop_center-center_none/f1_2024_aut_outline.png?v=1708704072",
  silverstone:
    "https://cdn.racingnews365.com/Circuits/Great-Britain/_639xAUTO_crop_center-center_none/f1_2024_gbr_outline.png?v=1708704186",
  hungaroring: "TEU_LINK_AQUI",
  spa: "https://cdn.racingnews365.com/Circuits/Belgium/_639xAUTO_crop_center-center_none/f1_2024_bel_outline.png?v=1708704343",
  monza:
    "https://cdn.racingnews365.com/Circuits/Italy/_639xAUTO_crop_center-center_none/f1_2024_ita_outline.png?v=1708704328",
  zandvoort:
    "https://cdn.racingnews365.com/Circuits/The-Netherlands/_639xAUTO_crop_center-center_none/f1_2024_nld_outline.png?v=1708704310",
  marina_bay:
    "https://cdn.racingnews365.com/Circuits/Singapore/_639xAUTO_crop_center-center_none/f1_2024_sgp_outline.png?v=1708704464",
  yas_marina:
    "https://cdn.racingnews365.com/Circuits/Abu-Dhabi/_639xAUTO_crop_center-center_none/f1_2024_abu_outline.png?v=1708704960",
  interlagos:
    "https://cdn.racingnews365.com/Circuits/Brazil/_639xAUTO_crop_center-center_none/f1_2024_bra_outline.png?v=1708704752",
  americas:
    "https://cdn.racingnews365.com/Circuits/United-States/_639xAUTO_crop_center-center_none/f1_2024_usa_outline.png?v=1708704589",
};

const TrackMap = memo(({ circuitId, circuitName }) => {
  const fallbackSrc =
    "https://placehold.co/400x300/15151e/ffffff?text=F1+Track";

  const getImageUrl = () => {
    if (!circuitId) return fallbackSrc;
    const id = circuitId.toLowerCase();
    const key = Object.keys(TRACK_IMAGES).find(
      (k) => id.includes(k) || k.includes(id)
    );
    return key ? TRACK_IMAGES[key] : fallbackSrc;
  };

  const [imgSrc, setImgSrc] = useState(getImageUrl());

  useEffect(() => {
    setImgSrc(getImageUrl());
  }, [circuitId]);

  return (
    <div
      className="track-img-container mb-3"
      style={{
        backgroundColor: "#fff",
        height: "140px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
      }}
    >
      <img
        src={imgSrc}
        className="img-fluid h-100"
        style={{ objectFit: "contain" }}
        alt={circuitName}
        onError={() => setImgSrc(fallbackSrc)}
      />
    </div>
  );
});

export default function TrackAPI() {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://f1api.dev/api/circuits")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.circuits || [];
        setCircuits(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center p-5 text-white italic">SYNCHRONIZING...</div>
    );

  return (
    <div className="container-fluid py-4">
      <div className="f1-dashboard-grid">
        {circuits.map((circuit, index) => (
          <div key={circuit.circuitId || index} className="f1-card">
            <div className="p-3 d-flex flex-column h-100">
              <TrackMap
                circuitId={circuit.circuitId}
                circuitName={circuit.circuitName}
              />
              <h5 className="fw-black text-uppercase italic mb-1 text-white">
                {circuit.circuitName}
              </h5>
              <p className="small text-danger fw-bold mb-3 italic">
                {circuit.city}, {circuit.country}
              </p>
              <div className="mt-auto border-top border-secondary border-opacity-25 pt-3">
                <div className="bg-black p-2 border-start border-danger border-3">
                  <span
                    className="d-block small opacity-50"
                    style={{ fontSize: "0.6rem" }}
                  >
                    LAP RECORD
                  </span>
                  <span
                    className="fw-black text-danger italic"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {circuit.lapRecord}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
