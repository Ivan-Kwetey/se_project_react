# React + Vite

# WTWR (What to Wear)

## Overview

🎥 **[Watch the Project Pitch Video](https://www.loom.com/share/fad742d038414abebd5d47d16ce9ec86)**

WTWR (_What to Wear_) is a responsive web application that recommends suitable clothing items based on real-time weather data.  
This sprint focused on **building the frontend** of the application using React, with functionality to:

- Fetch weather data from an external Weather API.
- Display the current weather and location.
- Recommend clothing items filtered by weather type.
- Show item details via modals.
- Provide a form for adding new garments (UI only at this stage).

The backend integration will follow in a later sprint.

---

## Technologies Used

- **React** (functional components, hooks: `useState`, `useEffect`)
- **Vite** (development/build tool)
- **CSS3** (BEM methodology, responsive design)
- **JavaScript (ES6+)**
- **Weather API** integration (OpenWeather)
- **Semantic HTML5** for accessibility

---

## Project Structure

- `App.jsx` – root component, manages global state (weather, modals, clothing items)
- `Header`, `Main`, `Footer` – layout components
- `WeatherCard`, `ItemCard`, `ItemModal` – UI components
- `ModalWithForm` – reusable modal component
- `index.css` – global styles including fonts and UI text utilities

---

## Live site:
The live site www.seasonwear.mine.bz.  

---

## Backend  repo link

(https://github.com/Ivan-Kwetey/se_project_express)

