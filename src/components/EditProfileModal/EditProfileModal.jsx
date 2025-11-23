import React, { useEffect, useMemo } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";


function EditProfileModal({ isOpen, onCloseModal, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  // Pre-fill form with current user data
  const initialValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    }),
    [currentUser]
  );

  const { values, handleChange, resetForm, isValid } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateProfile(values);
      resetForm();
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Edit Profile"
      submitText="Save changes"
      isOpen={isOpen}
      closeModalClick={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="modal__contents modal__text-2">
        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            className="modal__input"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
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

export default EditProfileModal;
