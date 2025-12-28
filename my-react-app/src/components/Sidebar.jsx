// Jaan John
//  Taking a static HTML/CSS mockup,  rebuilding it as a component-based React app with Vite
//  Added real-time search filtering using React state and hooks, 
//  Structured everything into reusable components to set up a foundation for expansion, 
//  Converted design prototype into working software

import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Account</div>
        <ul>
          <li>Orbit Settings</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">Robots</div>
        <ul>
          <li>Site Maps</li>
          <li className="active">Schedule Missions</li>
          <li>Missions and Actions</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">Admin Settings</div>
        <ul>
          <li>Alerts</li>
          <li>Data Management</li>
          <li>Spot</li>
          <li>Users</li>
          <li>User Roles</li>
          <li>Orbit Software</li>
          <li>Robot Software</li>
          <li>Scheduler</li>
          <li>Networks</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;