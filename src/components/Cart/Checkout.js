import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(isNotEmpty);

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
  } = useInput(isNotEmpty);

  const {
    enteredValue: enteredPostalCode,
    valueIsValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeInputChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
  } = useInput((value) => isNotEmpty(value) && value.trim().length >= 5);

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    hasError: cityHasError,
    inputChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid
      ? true
      : false;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      nameHasError ||
      streetHasError ||
      postalCodeHasError ||
      cityHasError ||
      !formIsValid
    ) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameInputClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;
  const streetInputClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;
  const postalCodeInputClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;
  const cityInputClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {postalCodeHasError && (
          <p>Please enter a valid postal code (5 digits).</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
