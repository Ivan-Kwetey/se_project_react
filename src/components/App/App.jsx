import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/MainContent.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "components/ModalWithForm/ModalWithForm";
import ItemModal from "components/ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header onGarmentClick={onGarmentClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeModalClick={closeActiveModal}
      >
        <div className="modal__contents ui-text-2">
          <label htmlFor="name" className="modal__label text_url">
            Name{""}
            <input
              type="text"
              id="name"
              className="modal__input ui-text-2"
              placeholder="Name"
              required
              minLength="1"
              maxLength="30"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label text_url">
            Image{""}
            <input
              type="text"
              id="imageURL "
              className="modal__input ui-text-2"
              placeholder="Image Url"
              required
            />
          </label>

          <fieldset className="modal__legend_and_radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <div className=" modal__radio-buttons">
              <label
                htmlFor="hot"
                className="modal__label modal__input_type_radio"
              >
                <input type="radio" className="modal__radio-input" id="hot" />
                Hot{""}
              </label>
              <label
                htmlFor="warm"
                className="modal__label modal__input_type_radio"
              >
                <input type="radio" className="modal__radio-input" id="warm" />
                Warm{""}
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__input_type_radio"
              >
                <input type="radio" className="modal__radio-input" id="cold" />
                Cold{""}
              </label>
            </div>
          </fieldset>
        </div>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeModalClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
