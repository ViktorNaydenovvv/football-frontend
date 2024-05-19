import { createContext, useState } from 'react';

const GlobalContext = createContext();

import Players from '../data/footballers.json';
import Coaches from '../data/coaches.json';


export function GlobalContextProvider(props) {

  const [searchQuery, setSearchQuery] = useState("");
  const [coaches, setCoaches]         = useState(Coaches);
  const [players, setPlayers]         = useState(Players);
  const [profile, setProfile]         = useState(null);
  const [token, setToken]             = useState(null);
  
  const [signup, setSignup]           = useState({
    email: undefined,
    password: undefined,
    type: undefined
  });

  const context = {
    signup: signup,
    token: token,
    profile: profile,
    players: players,
    coaches: coaches,
    searchQuery: searchQuery,
    setSignup: setSignup,
    setToken: setToken,
    setProfile: setProfile,
    setPlayers: setPlayers,
    setCoaches: setCoaches,
    setSearchQuery: setSearchQuery
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );

}

export default GlobalContext;