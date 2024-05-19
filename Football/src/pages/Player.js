import { useContext, useRef } from "react";
import GlobalContext from "../store/GlobalContext";

import "./Player.css";
import { useNavigate } from "react-router-dom";

export default function Player() {

    const navigate = useNavigate();

    let { players, signup, profile, setPlayers, setProfile } = useContext(GlobalContext);

    const teamRef = useRef(null);
    const passingRef = useRef(null);
    const positionRef = useRef(null);
    const dribblingRef = useRef(null);
    const paceRef = useRef(null);
    const physiqueRef = useRef(null);
    const shootingRef = useRef(null);
    const defendingRef = useRef(null);

    const mapping = [
        { name: 'teamName', ref: teamRef },
        { name: 'passing', ref: passingRef },
        { name: 'position', ref: positionRef },
        { name: 'dribbling', ref: dribblingRef },
        { name: 'pace', ref: paceRef },
        { name: 'physique', ref: physiqueRef },
        { name: 'shooting', ref: shootingRef },
        { name: 'defending', ref: defendingRef }
    ]

    const submit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        mapping.forEach(obj => formData.append(obj.name, obj.value));

        try {
            const headers = { 'Content-Type': 'application/json', 'Authorization': token };
            const response = await axios.post('http://localhost:4000/signup', formData, headers);
            setToken(response.data.token);
            navigate('/profile');
        } catch (error) {
            console.warn("Could not fetch data to the server.");

            profile = {
                id: players.length,
                user: {
                    id: players.length,
                    email: signup.email,
                    username: signup.username,
                    age: 'x',
                    userType: "FOOTBALLER"
                }
            };

            players = [...players, profile];

            const player = players.find(p => p.user.username == profile.user.username);
            if (player) {

                profile.likes = profile.likes || [];
                mapping.forEach(obj => {
                    player[obj.name] = obj.ref.current.value;
                    profile[obj.name] = obj.ref.current.value;
                })

                console.log("Profile updated locally.");

                setProfile({ ...profile });
                setPlayers([...players]);

                navigate('/players');

            } else {
                console.warn("User was not found.");
            }
        }

    }

    const inputs = [
        {
            label: 'Team Name',
            type: 'text',
            value: profile?.teamName || "None",
            ref: teamRef
        }, {
            label: 'Passing',
            type: 'number',
            value: profile?.passing || 50,
            ref: passingRef
        }, {
            label: 'Position',
            type: 'select',
            value: profile?.position || 50,
            ref: positionRef || 'GK',
            options: ['GK', 'CB', 'RB', 'LB', 'RWB', 'LWB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST']
        }, {
            label: 'Dribbling',
            type: 'number',
            value: profile?.dribbling || 50,
            ref: dribblingRef
        }, {
            label: 'Pace',
            type: 'number',
            value: profile?.pace || 50,
            ref: paceRef
        }, {
            label: 'Physique',
            type: 'number',
            value: profile?.physique || 50,
            ref: physiqueRef
        }, {
            label: 'Shooting',
            type: 'number',
            value: profile?.shooting || 50,
            ref: shootingRef
        }, {
            label: 'Defending',
            type: 'number',
            value: profile?.defending || 50,
            ref: defendingRef
        }
    ];

    return (
        <section className="page player flex-column">
            <div className="inner flex-column">
                <h1>Football player</h1>
                <form className="col-fd-12 flex">
                    <ul className='col-fd-12'>
                        {inputs.map(i => {
                            if (i.type !== 'select') {
                                return (
                                    <li className="col-fd-6 flex-column">
                                        <label className="col-fd-12">{i.label}</label>
                                        <input
                                            ref={i.ref}
                                            type={i.type}
                                            className="col-fd-12"
                                            defaultValue={i.value}
                                            onBlur={(e) => {
                                                if(i.type == "number") {
                                                    const value = e.target.value;
                                                    if (value <= 0) {
                                                        e.target.value = 1;
                                                    } else if (value >= 100) {
                                                        e.target.value = 99;
                                                    }
                                                }
                                            }} />
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="col-fd-6 flex-column">
                                        <label className="col-fd-12">{i.label}</label>
                                        <select className="col-fd-12" ref={i.ref} defaultValue={i.value}>
                                            {i.options.map(o => <option>{o}</option>)}
                                        </select>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <div className='col-fd-12 flex-column'>
                        <div className='col-fd-6 flex-column'>
                            <button className="col-fd-6" onClick={submit}>
                                Create account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}