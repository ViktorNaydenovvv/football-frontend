import Card from "../components/Card";
import Header from "../components/Header";
import "./Players.css";

import { useContext } from "react";
import GlobalContext from "../store/GlobalContext";

export default function Players({ favorites }) {

    const { profile, players, searchQuery } = useContext(GlobalContext);

    let filtered = searchQuery != "" ? 
        players.filter(p => p.user.username.toLowerCase().includes(searchQuery.toLowerCase())) : 
        players;

    favorites && (filtered = filtered.filter(p => profile?.likes.includes(p.user.username)));

    return (
        <>
            <Header selection={favorites ? 3 : 1}/>
            <section className="players page flex">
                <div className="inner">
                    <ul className="flex players-ul">
                        { filtered.map(player => <Card player={player}/>) }
                    </ul>
                </div>
            </section>
        </>
    );
}