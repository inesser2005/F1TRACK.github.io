import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Profile() {
  const { user } = useAuth();
  const [newName, setNewName] = useState(user?.displayName || "");
  const [photoUrlInput, setPhotoUrlInput] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Pre-set F1 Helmet URLs (Workaround for no storage)
  const helmetGallery = [
    { name: "Red Bull- 3 Verstappen", url: "https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/24031/112879/1-2-Max-Verstappen-Season-2022-Mini-Helmet__52357.1659474553.jpg?c=2" },
    { name: "Mercedes- 63 Russel", url: "https://http2.mlstatic.com/D_NQ_NP_2X_843946-MLB91255508814_092025-F-capacete-george-russell-mercedes-f1-team-2025-escala-12.webp" },
    { name: "Ferrari- 16 Leclerc", url: "https://www.allracinghelmets.com/cdn/shop/files/Leclerc2024002.png?v=1710183416" },
    { name: "McLaren- 4 Norris", url: "https://cdn.renderhub.com/cactus3d/f1-lando-norris-helmet-2024/f1-lando-norris-helmet-2024-01.jpg" },
    { name: "Aston Martin- 14 Alonso", url: "https://www.f1authentics.com/cdn/shop/files/FernandoAlonso2025MiniHelmet_3.jpg?v=1752064532&width=2000" }
  ];

  useEffect(() => {
    if (user) {
      setNewName(user.displayName || "");
      setPhotoUrlInput(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: photoUrlInput
      });
      setMessage("DRIVER PROFILE SYNCHRONIZED");
      setIsEditing(false);
    } catch (error) {
      setMessage("UPDATE_ERROR: " + error.message);
    }
  };

  // Select a helmet from the gallery
  const selectHelmet = (url) => {
    setPhotoUrlInput(url);
    setMessage("HELMET SELECTED - SAVE TO APPLY");
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="f1-card p-5 w-100" style={{ maxWidth: "600px" }}>
        
        {/* Avatar Display */}
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Driver" 
                className="rounded-circle border border-danger p-1 mb-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="bg-secondary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                <span style={{ fontSize: '3rem' }}>🏎️</span>
              </div>
            )}
          </div>
          <h2 className="fw-black italic text-uppercase text-white m-0">Driver License</h2>
          <p className="text-danger small fw-bold mt-1 opacity-75">UID: {user?.uid?.slice(0, 10)}...</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate}>
            {/* Call Sign Input */}
            <div className="mb-4">
              <label className="small text-uppercase opacity-50 fw-bold">Call Sign</label>
              <input 
                type="text" 
                className="form-control bg-black text-white border-secondary shadow-none"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>

            {/* Helmet Gallery Picker */}
            <div className="mb-4">
              <label className="small text-uppercase opacity-50 fw-bold d-block mb-2">Select Team Helmet</label>
              <div className="d-flex justify-content-between bg-dark p-2 rounded border border-secondary">
                {helmetGallery.map((helmet) => (
                  <img 
                    key={helmet.name}
                    src={helmet.url} 
                    alt={helmet.name}
                    title={helmet.name}
                    onClick={() => selectHelmet(helmet.url)}
                    className={`rounded-circle cursor-pointer border ${photoUrlInput === helmet.url ? 'border-danger border-2' : 'border-transparent'}`}
                    style={{ width: '45px', height: '45px', cursor: 'pointer', transition: '0.2s' }}
                  />
                ))}
              </div>
            </div>

            {/* Manual URL Input */}
            <div className="mb-4">
              <label className="small text-uppercase opacity-50 fw-bold">Custom Image URL</label>
              <input 
                type="text" 
                className="form-control bg-black text-white border-secondary shadow-none"
                value={photoUrlInput}
                onChange={(e) => setPhotoUrlInput(e.target.value)}
                placeholder="Or paste an Imgur/Discord link..."
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="f1-btn flex-grow-1">Sync Profile</button>
              <button type="button" className="f1-btn f1-btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <label className="small text-uppercase opacity-50 fw-bold">Official Email</label>
              <p className="border-bottom border-secondary pb-2 mb-0 text-white">{user?.email}</p>
            </div>
            <div className="mb-4">
              <label className="small text-uppercase opacity-50 fw-bold">Registered Name</label>
              <p className="border-bottom border-secondary pb-2 mb-0 fw-bold italic text-white">
                {user?.displayName || "PENDING ASSIGNMENT"}
              </p>
            </div>
            <button className="f1-btn w-100" onClick={() => setIsEditing(true)}>Modify Profile</button>
          </div>
        )}

        {message && (
          <p className={`mt-4 small italic text-center fw-bold ${message.includes('ERROR') ? 'text-danger' : 'text-success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}