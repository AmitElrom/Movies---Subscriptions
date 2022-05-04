import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStickyState from "../hooks/use-sticky-state";

let logoutTimer;
const defultExpirationTime = 3600000;

const AppContext = React.createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export const AppContextProvider = (props) => {
  const [user, setUser] = useStickyState(null, "user");
  const [token, setToken] = useStickyState(null, "token");
  const navigate = useNavigate();

  const logout = () => {
    // navigate("/", { replace: true });
    console.log("logout");
    setUser(null);
    localStorage.removeItem("user");
    setToken(null);
    localStorage.removeItem("token");
  };

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    navigate('/main', { replace: true });
  };

  return (
      <AppContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          login,
          logout,
        }}
      >
        {props.children}
      </AppContext.Provider>
  );
};

export default AppContext;