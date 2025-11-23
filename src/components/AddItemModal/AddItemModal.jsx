import React, { useEffect, useMemo } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const initialValues = useMemo(
    () => ({ name: "", imageUrl: "", weather: "" }),
    []
  );

  const { values, handleChange, resetForm, isValid } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddItem(values, resetForm);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  // Reset form
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="New garment"
      submitText="Add garment"
      isOpen={isOpen}
      closeModalClick={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          <legend className="modal__legend-text">
            Select the weather type:
          </legend>
          <div className="modal__radio-buttons">
            {["hot", "warm", "cold"].map((type, index) => (
              <label key={type} className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value={type}
                  checked={values.weather === type}
                  onChange={handleChange}
                  required={index === 0} 
                  className="modal__radio-input"
                />
                <span>{type[0].toUpperCase() + type.slice(1)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
