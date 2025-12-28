// Jaan John
// Taking a static HTML/CSS mockup,  rebuilding it as a component-based React app with Vite
// Added real-time search filtering using React state and hooks, 
// Structured everything into reusable components to set up a foundation for expansion, 
// Converted design prototype into working software
// Demonstration of React application structure and data flow

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'          
import './style.css'                 

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// --------------------------------------------------------------
// Converting the Static HTML/CSS Mockup to a Dynamic React Application
// --------------------------------------------------------------
// This React application is built using Vite as the build tool.
// The main structure consists of reusable components: Sidebar, MainContent, and MissionTable.
// The application features real-time search filtering for missions using React state and hooks.

// Application Flow:
// 1. The entry point is main.jsx, which renders the App component into the root div in index.html.
// 2. App.jsx serves as the main container, incorporating Sidebar and MainContent components.
// 3. MainContent.jsx holds the mission data and manages the search functionality.
// 4. MissionTable.jsx is responsible for displaying the mission data in a table format.
// 5. The Sidebar.jsx provides navigation links for different sections of the application.

// Data Handling:
// - Initial mission data is defined in MainContent.jsx as a JavaScript array of objects.
// - The search box updates the searchTerm state, which filters the displayed missions in real-time.
// - MissionTable.jsx dynamically generates table rows based on the filtered mission data passed as props.

// Summary of Key Features:
// - Component-based architecture for modularity and reusability.
// - Real-time search filtering using React state and hooks.
// - Dynamic rendering of mission data in a structured table format.

// How It Works:
// 1. User types in the search box in MainContent.jsx.
// 2. The searchTerm state updates, triggering a re-render.
// 3. Missions are filtered based on the search term.
// 4. MissionTable.jsx receives the filtered missions as props and renders the corresponding table rows.

// Overall, this React application effectively transforms a static HTML/CSS design into a dynamic, interactive user interface with a solid foundation for future enhancements.

// Application Execution Flow:
// --------------------------------------------------------------
// Browser loads index.html   
// The script loads main.jsx and starts React.
// React runs App.jsx , containing loads MainContent.jsx.
// MainContent.jsx defines the initialMissions data in JavaScript.
// React loops over that array using .map() in MissionTable.jsx and dynamically generates the table rows.
//
// See React_Documentation.pdf for additional information on test strategy and application structure. 