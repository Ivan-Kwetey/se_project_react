// src/App.jsx
import { useState, useEffect } from "react";
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const onGarmentClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCardDelete = async (cardToDelete) => {
    try {
      await deleteItem(cardToDelete._id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== cardToDelete._id)
      );
      closeActiveModal(); // Close modal after deletion
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleAddItem = async (item, resetFormCallback) => {
    try {
      // item is expected to have { name, imageUrl, weather }
      const newItem = await addItem(item);
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      resetFormCallback();
      closeActiveModal();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

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

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) =>
        console.error("Failed to fetch clothing items:", error)
      );
  }, []);

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
                    onGarmentClick={onGarmentClick}
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
                    onGarmentClick={onGarmentClick}
                    weatherData={weatherData}
                  />
                  <Profile
                    clothingItems={clothingItems}
                    onAddItemClick={onGarmentClick}
                    handleCardClick={handleCardClick}
                  />
                </>
              }
            />
          </Routes>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={closeActiveModal}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeModalClick={closeActiveModal}
            onCardDelete={handleCardDelete}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
