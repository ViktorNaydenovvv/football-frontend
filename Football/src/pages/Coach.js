import { useContext, useRef } from "react";
import GlobalContext from "../store/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Coach.css";

export default function Coach() {

    const navigate = useNavigate();

    let { coaches, signup, profile, setToken, setCoaches, setProfile } = useContext(GlobalContext);

    const teamRef = useRef(null);
    const typeRef = useRef(null);
    const expRef = useRef(null);

    const submit = async (e) => {

        e.preventDefault();

        if (teamRef.current.value.trim() == "" ||
            typeRef.current.value.trim() == "" ||
            expRef.current.value.trim() == "") {
            alert("Enter all inputs.");
            return;
        };

        const formData = new FormData();
        formData.append('email', signup.email);
        formData.append('password', signup.password);
        formData.append('type', signup.type);
        formData.append('teamName', teamRef.current.value);
        formData.append('coachType', typeRef.current.value);
        formData.append('experience', expRef.current.value);

        try {
            const headers = { 'Content-Type': 'application/json' };
            const response = await axios.post('http://localhost:4000/signup', formData, headers);
            setToken(response.data.token);
            navigate('/profile');
        } catch (error) {
            console.warn("Could not fetch data to the server.");

            profile = {
                id: coaches.length,
                user: {
                    id: coaches.length,
                    email: signup.email,
                    username: signup.username,
                    age: 'x',
                    userType: "COACH"
                },
                likes: []
            };

            coaches = [...coaches, profile];

            const coach = coaches.find(c => c.user.username == profile.user.username);
            if (coach) {

                coach.teamName = teamRef.current.value;
                coach.coachType = typeRef.current.value;
                coach.experience = expRef.current.value;

                profile.teamName = teamRef.current.value;
                profile.coachType = typeRef.current.value;
                profile.experience = expRef.current.value;

                console.log("Profile updated locally.");

                setProfile({ ...profile });
                setCoaches([...coaches]);

                navigate('/coaches');

            } else {
                console.warn("User was not found.");
            }
        }

    }

    const inputs = [
        {
            label: 'Team Name',
            type: 'text',
            value: profile?.teamName,
            ref: teamRef
        }, {
            label: 'Experience',
            type: 'number',
            value: profile?.experience,
            ref: expRef
        }, {
            label: 'Coach Type',
            type: 'select',
            value: profile?.coachType,
            ref: typeRef,
            options: ['HEAD_COACH', 'ASSISTANT_COACH', 'GOALKEEPER_COACH', 'FITNESS_COACH', 'CONDITIONING_COACH']
        },
    ]

    return (
        <section className="page coach flex">
            <div className="inner flex-column">
                <h1 className="col-fd-6">Coach</h1>
                <form className="col-fd-6 flex-column">
                    <ul className='col-fd-12'>
                        {inputs.map(i => {
                            if (i.type !== 'select') {
                                return (
                                    <li className="col-fd-12 flex-column">
                                        <label className="col-fd-12">{i.label}</label>
                                        <input
                                            ref={i.ref}
                                            type={i.type}
                                            className="col-fd-12"
                                            defaultValue={i.value}
                                            onBlur={(e) => {
                                                if (i.type === "number") {
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
                                    <li className="col-fd-12 flex-column">
                                        <label className="col-fd-12">{i.label}</label>
                                        <select className="col-fd-12" ref={i.ref} defaultValue={i.value}>
                                            {i.options.map(o => <option>{o}</option>)}
                                        </select>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <button
                        className="col-fd-4"
                        onClick={(e) => submit(e)}>
                        Create account
                    </button>
                </form>
            </div>
        </section>
    );
}