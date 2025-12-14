import { useState, useCallback } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const form = e.target.form; 

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Check overall form validity
    if (form) {
      setIsValid(form.checkValidity());
    }
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setIsValid(false);
  }, [initialValues]);

  return { values, handleChange, resetForm, isValid };
}
