import Card from "../components/Card";
import Header from "../components/Header";
import "./Coaches.css";

import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import GlobalContext from "../store/GlobalContext";

const fetcher = async ([url, token]) => {
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

  if (res.ok) {
    const data = await res.json();
    console.log("Data", data);
    return data;
  }
};

export default function Coaches() {
  const {token, searchQuery } = useContext(GlobalContext);

  const { data, error, isLoading } = useSWR(
    ["http://localhost:8080/api/v1/coaches", token],
    fetcher
  );

  const coaches = data?.content;
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (!coaches) return;

    console.log("Coaches", coaches);

    let filtered =
      searchQuery != ""
        ? coaches.filter((p) =>
            p.user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : coaches;

    setFiltered(filtered);
  }, [coaches, searchQuery]);

  return (
    <>
      <Header selection={2} />
      <section className="coaches page flex">
        <div className="inner">
          <ul className="flex coaches-ul">
            {filtered?.map((coach) => (
              <Card coach={coach} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
