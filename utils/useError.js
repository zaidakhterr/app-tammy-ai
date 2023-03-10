import React from "react";

const ErrorContext = React.createContext();

export const ErrorProvider = ({ children }) => {
  const [show, setShow] = React.useState(true);

  const showModal = state => {
    setShow(state);
  };

  return (
    <ErrorContext.Provider value={{ show, showModal }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useError = () => {
  return React.useContext(ErrorContext);
};

export default useError;
