import React from "react";
import ErrorModal from "@/components/ErrorModal";

const ErrorContext = React.createContext();

export const ErrorProvider = ({ children }) => {
  const [show, setShow] = React.useState(false);

  const showModal = state => {
    setShow(state);
  };

  return (
    <ErrorContext.Provider value={{ show, showModal }}>
      <ErrorModal />
      {children}
    </ErrorContext.Provider>
  );
};

const useError = () => {
  return React.useContext(ErrorContext);
};

export default useError;
