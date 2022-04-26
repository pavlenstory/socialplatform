import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    callback();
  }

  const history = useNavigate();

  return {
    onChange,
    onSubmit,
    values,
    history,
  };
};
