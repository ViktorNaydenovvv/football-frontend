import Card from "../components/Card";
import Header from "../components/Header";
import "./Players.css";

import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import GlobalContext from "../store/GlobalContext";

const fetcher = async([url, token]) => {
    console.log("URL", url);
    console.log("Token", token);
    
    if (!token) {
        throw new Error("Token not found");
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("Response", res.status);
    if (res.status === 401) {
        return;
    }

    if(res.ok) {
        const data = await res.json();
        console.log("Data", data);
        return data;
    }
}


export default function Players({ favorites }) {
  const { profile, searchQuery, token } = useContext(GlobalContext);

  const {
    data,
    error,
    isLoading,
  } = useSWR(["http://localhost:8080/api/v1/footballers", token], fetcher);

  const players = data?.content;
  
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (!players) return;

    console.log("Players", players);

    let filtered =
      searchQuery != ""
        ? players.filter((p) =>
            p.user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : players;

    console.log("Filtered", filtered);

    favorites &&
      (filtered = filtered.filter((p) =>
        profile?.likes.includes(p.user.username)
      ));

    console.log("Filtered2", filtered);

    setFiltered(filtered);
  }, [searchQuery, players, favorites, profile]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Header selection={favorites ? 3 : 1} />
      <section className="players page flex">
        <div className="inner">
          <ul className="flex players-ul">
            {filtered?.map((player) => (
              <Card player={player} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
