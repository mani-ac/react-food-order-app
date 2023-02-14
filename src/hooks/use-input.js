import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && valueIsTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setValueIsTouched(true);
  };

  return {
    enteredValue,
    valueIsTouched,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
