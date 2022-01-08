// this file handles the form validity
import { useReducer } from "react";
import { inputFormInterface, actionFormInterface } from "../interfaces";

function validityReducer(
  state: inputFormInterface,
  action: actionFormInterface
) {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isValid: action.formValidLogic(action.value),
    };
  } else if (action.type === "BLUR") {
    return { value: state.value, isValid: action.formValidLogic(state.value) };
  }
  return { value: "", isValid: false };
}

function FormValidity(initialState: inputFormInterface) {
  const [state, dispatchAction] = useReducer(validityReducer, initialState);

  return { state, dispatchAction };
}

export default FormValidity;
