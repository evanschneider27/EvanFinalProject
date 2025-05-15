# Evan  Schneider Final Project INST377
Weather App with Clothing Suggestions

# Description:
This web app helps users decide what to wear based on weather conditions. The user asks for the weather in a certain city, and the app returns the temperature, weather descriptions, and a clothing recommendation. Results are saved in a Supabase database and visualized using a chart. The app features three pages: a home page for searching, an about page, and a forecast page showing recent temperature trends.

# Target Browsers:
Desktop: Chrome, Edge, Safari
Mobile: Safari on iOS, Chrome on Android

# Developer Manual:
You can find the full Developer Manual below.

# Audience:
This manual is intended for future developers maintaining or expanding this app. You should be familiar with JavaScript, Node.js, HTML/CSS, and REST APIs. This document will walk you through setup, running the project, and understanding the backend API.

# Installation Instructions:

Step 1: Download and Set up prerequisites

Node.js v18+ installed

Supabase account and project created

Step 2: Clone the Project

Step 3: Install Dependencies

npm install

Step 4: Create a .env file in the root directory

SUPABASE_KEY=your_supabase_anon_key_here

Step 5: To Run the Application Locally

node index.js

open browser: http://localhost:3000/home.html


# Server API Documentation:

GET /api/weather?city={cityName}

-Description: Fetches weather data from Weatherstack

-Returns: JSON with location, temperature, condition, and suggestion

POST /api/save

-Description: Saves a search record to Supabase

-Body (JSON):

  "city": "New York",
  "temperature": 66,
  "suggestion": "Bring a light jacket."
  
-Returns: { success: true }

GET /api/history

-Returns the last 10 saved searches

-Returns: JSON array of recent search objects

# Known Bugs:

-Weather data may be delayed due to Weatherstack's free-tier caching

-Weather suggestions are based only on temperature

-Forecast chart may appear empty until user performs at least one search

# Road Map for the Future:

-Add geolocation-based weather fetching

-Support weather icons and more detailed conditions

-Add user login via Supabase Auth

-Enable deletion and filtering of saved searches
