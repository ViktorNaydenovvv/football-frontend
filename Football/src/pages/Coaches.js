import Card from "../components/Card";
import Header from "../components/Header";
import "./Coaches.css";

import { useContext } from "react";
import GlobalContext from "../store/GlobalContext";

export default function Coaches() {

    const { coaches, searchQuery } = useContext(GlobalContext);

    const filtered = searchQuery != "" ? 
        coaches.filter(p => p.user.username.toLowerCase().includes(searchQuery.toLowerCase())) : 
        coaches;

    return (
        <>
            <Header selection={2}/>
            <section className="coaches page flex">
                <div className="inner">
                    <ul className="flex coaches-ul">
                        { filtered.map(coach => <Card coach={coach}/>) }
                    </ul>
                </div>
            </section>
        </>
    );
}