// Jaan John
// Taking a static HTML/CSS mockup,  rebuilding it as a component-based React app with Vite
// Added real-time search filtering using React state and hooks, 
// Structured everything into reusable components to set up a foundation for expansion, 
// Converted design prototype into working software

import React, { useState } from 'react';
import MissionTable from './MissionTable';

function MainContent({ searchTerm, setSearchTerm }) {
  // Sample data (mirroring your HTML; in a real app, fetch from API)
  const initialMissions = [
    {
      canRun: 'gray',
      robotName: 'spot-BD-91890003',
      missionName: 'Safety Rounds',
      schedule: 'From 10:30 AM, Repeat as often as possible',
      nextStart: 'Disabled',
      lockouts: 'Individual',
    },
    {
      canRun: 'green',
      robotName: 'spot-BD-00130011',
      missionName: 'Pumps',
      schedule: 'From 2:40 PM, Repeat as often as possible',
      nextStart: 'Currently running',
      lockouts: '',
    },
    {
      canRun: 'red',
      robotName: 'spot-BD-01180011',
      missionName: 'Boilers',
      schedule: 'From 11:14 AM, Repeat every 1 hour',
      nextStart: 'As soon as possible',
      lockouts: '',
    },
  ];

  const [missions, setMissions] = useState(initialMissions);

  // Filter missions based on search term
  const filteredMissions = missions.filter((mission) =>
    mission.robotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.missionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="main">
      <h1 className="page-title">Schedule Missions</h1>
      <div className="top-controls">
        <input
          type="text"
          className="search-box"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <a href="#" className="weather-link">
          <i className="fas fa-cloud-sun"></i> Weather Settings
        </a>
      </div>
      <MissionTable missions={filteredMissions} />
      <div className="footer-links">
        <a href="#">Download calendar (ical format)</a>
      </div>
      <div className="robot-time">
        Robot time: December 25, 2025 at 3:42:18 PM EST
      </div>
    </main>
  );
}

export default MainContent;