import { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext();


export function GlobalContextProvider(props) {

  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile]         = useState(null);
  const [token, setToken]             = useState(null);
  
  const [signup, setSignup]           = useState({
    email: undefined,
    password: undefined,
    type: undefined
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const context = {
    signup: signup,
    token: token,
    profile: profile,
    searchQuery: searchQuery,
    setSignup: setSignup,
    setToken: setToken,
    setProfile: setProfile,
    setSearchQuery: setSearchQuery
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );

}

export default GlobalContext;