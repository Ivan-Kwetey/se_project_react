import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/MainContent.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";

import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // Toggle temperature units
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  // Modal management
  const openAddGarmentModal = () => setActiveModal("add-garment");
  const closeAllPopups = useCallback(() => setActiveModal(""), []);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // Add Escape key listener to close modals
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [closeAllPopups]); // include callback dependency for stability

  // Fetch weather data once
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  // Fetch clothing items once
  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((error) =>
        console.error("Failed to fetch clothing items:", error)
      );
  }, []);

  // Handle adding new item
  const handleAddItem = async (item, resetFormCallback) => {
    try {
      const newItem = await addItem(item);
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      resetFormCallback();
      closeAllPopups();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  // Handle deleting an item
  const handleCardDelete = async (cardToDelete) => {
    try {
      await deleteItem(cardToDelete.id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item.id !== cardToDelete.id)
      );
      closeAllPopups();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    onGarmentClick={openAddGarmentModal}
                    weatherData={weatherData}
                  />
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header
                    onGarmentClick={openAddGarmentModal}
                    weatherData={weatherData}
                  />
                  <Profile
                    clothingItems={clothingItems}
                    onAddItemClick={openAddGarmentModal}
                    handleCardClick={handleCardClick}
                  />
                </>
              }
            />
          </Routes>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={closeAllPopups}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeModalClick={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
