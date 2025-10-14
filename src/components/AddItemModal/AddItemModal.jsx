// AddItemModal.jsx
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Pass resetForm as callback
    onAddItem(values, resetForm);

    // ✅ Close modal (form will reset only after successful add)
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeModalClick={onCloseModal}
      onSubmit={handleSubmit}
    >
      <div className="modal__contents modal__text-2">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            name="name"
            className="modal__input"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="modal__input"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset className="modal__legend_and_radio-buttons">
          <legend className="legend__text">Select the weather type:</legend>
          <div className="modal__radio-buttons">
            {["hot", "warm", "cold"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="weather"
                  value={type}
                  checked={values.weather === type}
                  onChange={handleChange}
                  required
                  className="modal__radio-input"
                />
                {type[0].toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
