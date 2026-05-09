import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./F1theme.css";

import Home from "./comp/Home.jsx";
import Menu from "./comp/Menu.jsx";
import StandingsAside from "./comp/F1DRIVERS/StandingsAside.jsx"; // Verifica se o ficheiro tem o "s"
import DriversAPI from "./comp/F1DRIVERS/DriversAPI.jsx";
import TeamsAPI from "./comp/F1TEAMS/TeamsAPI.jsx";
import TrackAPI from "./comp/F1TRACKS/TrackAPI.jsx";
import NewsAPI from "./comp/F1NEWS/NewsAPI.jsx";
import WeatherAPI from "./comp/F1WEATHER/WeatherAPI.jsx";
import Login from "./comp/Login.jsx";
import Register from "./comp/Register.jsx";
import ProtectedRoute from "./comp/ProtectedRoute.jsx";
import Profile from "./comp/Profile.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./comp/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div
            className="d-flex min-vh-100 overflow-hidden"
            style={{ backgroundColor: "#0b0b0e" }}
          >
            {/* Barra lateral agora à esquerda */}
            <aside className="standings-sidebar d-none d-xl-block" > 
              <StandingsAside />
            </aside>

            <main
              className="dashboard-main-content flex-grow-1 overflow-auto"
              style={{ minWidth: 0 }}
            >
              <Menu />
              <div className="p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  <Route path="/drivers" element={
                    <ProtectedRoute>
                      <DriversAPI />
                    </ProtectedRoute>
                  } />

                  <Route path="/teams" element={
                    <ProtectedRoute>
                      <TeamsAPI />
                    </ProtectedRoute>
                  } />

                  <Route path="/tracks" element={<TrackAPI />} />
                  <Route path="/news" element={<NewsAPI />} />
                  <Route path="/weather" element={<WeatherAPI />} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}