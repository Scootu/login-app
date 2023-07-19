import React, { useEffect, useState } from "react";

const Authenticated = React.createContext({
  isLoggedIn: true,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoged", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoged");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loggedInData = localStorage.getItem("isLoged");
    if (loggedInData === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Authenticated.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </Authenticated.Provider>
  );
};

export default Authenticated;
