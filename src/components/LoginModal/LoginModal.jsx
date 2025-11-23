import React, { useEffect, useMemo } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onLogin, onCloseModal, onSwitchToRegister }) {
  const initialValues = useMemo(() => ({ email: "", password: "" }), []);

  const { values, handleChange, resetForm, isValid } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      closeModalClick={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
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
      </div>
      <div className="modal__action-row">
        <button
          type="button"
          className="modal__alt-button"
          onClick={onSwitchToRegister}
        >
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
