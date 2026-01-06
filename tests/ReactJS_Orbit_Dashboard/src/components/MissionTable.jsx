// Jaan John
// Taking a static HTML/CSS mockup,  rebuilding it as a component-based React app with Vite
// Added real-time search filtering using React state and hooks, 
// Structured everything into reusable components to set up a foundation for expansion, 
// Converted design prototype into working software

import React from 'react';

function MissionTable({ missions }) {
  const getStatusIcon = (status) => {
    let className = 'fas fa-circle status-circle ';
    if (status === 'gray') className += 'status-gray';
    if (status === 'green') return <i className="fas fa-play-circle status-circle status-green"></i>;
    if (status === 'red') className += 'status-red';
    return <i className={className}></i>;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Can Run</th>
          <th>Robot Name</th>
          <th>Mission Name</th>
          <th>Schedule</th>
          <th>Next Start</th>
          <th>Current Lockouts</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {missions.map((mission, index) => (
          <tr key={index}>
            <td>{getStatusIcon(mission.canRun)}</td>
            <td><strong>{mission.robotName}</strong></td>
            <td>{mission.missionName}</td>
            <td>{mission.schedule}</td>
            <td>{mission.nextStart}</td>
            <td>
              {mission.lockouts && <span className="lockout-badge">{mission.lockouts}</span>}
            </td>
            <td className="actions">
              {mission.nextStart === 'Currently running' ? (
                <>
                  <i className="fas fa-file-alt"></i>
                  <i className="fas fa-edit"></i>
                  <i className="fas fa-trash"></i>
                </>
              ) : mission.nextStart === 'Disabled' ? (
                <>
                  <i className="fas fa-sync-alt"></i>
                  <i className="fas fa-file-alt"></i>
                  <i className="fas fa-edit"></i>
                  <i className="fas fa-trash"></i>
                </>
              ) : (
                <>
                  <i className="fas fa-file-alt"></i>
                  <i className="fas fa-edit"></i>
                  <i className="fas fa-trash"></i>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MissionTable;