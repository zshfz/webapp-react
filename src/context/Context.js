import { createContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
