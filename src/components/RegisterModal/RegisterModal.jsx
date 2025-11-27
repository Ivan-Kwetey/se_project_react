import React, { useEffect, useMemo } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onRegister, onCloseModal, onSwitchToLogin }) {
  const initialValues = useMemo(
    () => ({ name: "", avatar: "", email: "", password: "" }),
    []
  );

  const { values, handleChange, resetForm, isValid } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegister(values);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign up"
      submitText="Sign up"
      isOpen={isOpen}
      closeModalClick={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
      bottomAction={
        <button
          type="button"
          className="modal__alt-button "
          onClick={onSwitchToLogin}
        >
          or Log in
        </button>
      }
    >
      <div className="modal__contents modal__text-2">
        <label className="modal__label">
          Email
          <input
            type="email"
            name="email"
            className="modal__input"
            value={values.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </label>

        <label className="modal__label">
          Password
          <input
            type="password"
            name="password"
            className="modal__input"
            value={values.password}
            onChange={handleChange}
            required
            placeholder="Password"
          />
        </label>

        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            className="modal__input"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="Name"
          />
        </label>

        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            name="avatar"
            className="modal__input"
            value={values.avatar}
            onChange={handleChange}
            required
            placeholder="Avatar URL"
          />
        </label>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
