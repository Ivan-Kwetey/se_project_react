import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/MainContent.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";

import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import * as auth from "../../utils/auth.js";
import { getItems, addItem, deleteItem, addCardLike, removeCardLike } from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  // --- State ---
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // --- Temperature toggle ---
  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  // --- Modal management ---
  const openAddGarmentModal = () => setActiveModal("add-garment");
  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");
  const openEditProfile = () => setActiveModal("edit-profile");
  const closeAllPopups = useCallback(() => setActiveModal(""), []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // --- Keyboard Escape listener ---
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeAllPopups();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeAllPopups]);

  // --- Fetch weather ---
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // --- Fetch clothing items ---
  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  // --- Check JWT token ---
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    auth
      .checkToken(jwt)
      .then((res) => {
        setLoggedIn(true);
        setToken(jwt);
        setCurrentUser(res.data || res);
      })
      .catch(() => localStorage.removeItem("jwt"));
  }, []);

  // --- Handlers ---
  const handleAddItem = async (item, resetForm) => {
    try {
      const payload = token ? { ...item, token } : item;
      const newItem = await addItem(payload);
      setClothingItems((prev) => [newItem, ...prev]);
      resetForm();
      closeAllPopups();
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleCardDelete = async (cardToDelete) => {
    try {
      const id = cardToDelete._id || cardToDelete.id;
      await deleteItem(token ? { id, token } : id);

      setClothingItems((prev) =>
        prev.filter(
          (item) => (item._id || item.id) !== id
        )
      );
      closeAllPopups();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    await auth.register({ name, avatar, email, password });
    await handleLogin({ email, password });
    setActiveModal("");
  };

  const handleLogin = async ({ email, password }) => {
    const res = await auth.login({ email, password });
    const jwt = res.token || res.jwt || res.data?.token;

    if (!jwt) throw new Error("No token returned");

    localStorage.setItem("jwt", jwt);
    setToken(jwt);
    setLoggedIn(true);

    const userRes = await auth.checkToken(jwt);
    setCurrentUser(userRes.data || userRes);
    setActiveModal("");
  };

  const handleUpdateProfile = async ({ name, avatar }) => {
    try {
      const updated = await auth.updateProfile({ name, avatar }, token);
      setCurrentUser(updated.data || updated);
      closeAllPopups();
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const handleCardLike = async (card) => {
    if (!currentUser) return;
    const token = localStorage.getItem("jwt");

    const isLiked = card.likes.some((id) => id === currentUser._id);

    try {
      const updatedCard = isLiked
        ? await removeCardLike(card._id || card.id, token)
        : await addCardLike(card._id || card.id, token);

      setClothingItems((prevItems) =>
        prevItems.map((item) =>
          (item._id || item.id) ===
          (updatedCard.data?._id || updatedCard._id || updatedCard.id)
            ? updatedCard.data || updatedCard
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  // --- Render ---
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                      onRegisterClick={openRegisterModal}
                      onLoginClick={openLoginModal}
                      weatherData={weatherData}
                    />
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <>
                      <Header
                        onGarmentClick={openAddGarmentModal}
                        onRegisterClick={openRegisterModal}
                        onLoginClick={openLoginModal}
                        onEditProfile={openEditProfile}
                        onSignOut={() => {
                          localStorage.removeItem("jwt");
                          setLoggedIn(false);
                          setCurrentUser(null);
                        }}
                        weatherData={weatherData}
                      />
                      <Profile
                        clothingItems={clothingItems}
                        onAddItemClick={openAddGarmentModal}
                        handleCardClick={handleCardClick}
                        onEditProfile={openEditProfile}
                        onSignOut={() => {
                          localStorage.removeItem("jwt");
                          setLoggedIn(false);
                          setCurrentUser(null);
                        }}
                        onCardLike={handleCardLike}
                      />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>

            {/* --- Modals --- */}
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItem}
              onCloseModal={closeAllPopups}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              onCloseModal={closeAllPopups}
              onSwitchToLogin={() => {
                closeAllPopups();
                openLoginModal();
              }}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onCloseModal={closeAllPopups}
              onSwitchToRegister={() => {
                closeAllPopups();
                openRegisterModal();
              }}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              closeModalClick={closeAllPopups}
              onCardDelete={handleCardDelete}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onCloseModal={closeAllPopups}
              onUpdateProfile={handleUpdateProfile}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
