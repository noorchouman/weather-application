# Weatherly

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-fast-purple?logo=vite)
![API](https://img.shields.io/badge/API-Open--Meteo-green)
![Status](https://img.shields.io/badge/Status-Complete-success)

A modern, responsive weather web application built with **React + Vite** that provides real-time weather data, hourly forecasts, and weekly insights.

---

## Features

-  Smart search with autocomplete (type `"bar"` → Barcelona)
-  Works for **any city worldwide**
-  Current weather display
-  Hourly forecast (today)
-  Weekly forecast (7 days)
-  Weather stats:
  - Humidity
  - Wind speed
  - Pressure
  - Visibility
-  Extra details:
  - Sunrise & sunset
  - UV index
  - Wind gusts
  - Cloud cover
-  Clean, modern UI inspired by real dashboards


---

##  How It Works

- Uses **Open-Meteo API** for weather data
- Uses **Geocoding API** for city search & autocomplete
- Custom hooks manage:
  - API calls
  - search logic
  - state management
- Components split for clean structure and scalability
