import { useContext, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import './Profile.css';
import GlobalContext from '../store/GlobalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {

    const navigate = useNavigate();

    const { token, players, coaches, profile, setProfile, setPlayers, setCoaches, setToken } = useContext(GlobalContext); 

    const [source, setSource] = useState(profile.user.photo);

    const upload = () => {
        const url = prompt("Enter Image Url");
        if(url && url.trim() !== "") {
            setSource(url);
        }
    }

    // Player
    const teamRef      = useRef(null);
    const passingRef   = useRef(null);
    const positionRef  = useRef(null);
    const dribblingRef = useRef(null);
    const paceRef      = useRef(null);
    const physiqueRef  = useRef(null);
    const shootingRef  = useRef(null);
    const defendingRef = useRef(null);

    // Coach
    const experienceRef = useRef(null);
    const coachTypeRef = useRef(null);

    const playerMapping = [
        { name: 'teamName',  ref: teamRef },
        { name: 'passing',   ref: passingRef },
        { name: 'position',  ref: positionRef },
        { name: 'dribbling', ref: dribblingRef },
        { name: 'pace',      ref: paceRef },
        { name: 'physique',  ref: physiqueRef },
        { name: 'shooting',  ref: shootingRef },
        { name: 'defending', ref: defendingRef }
    ];
    
    const coachMapping = [
        { name: 'teamName',   ref: teamRef },
        { name: 'experience', ref: experienceRef },
        { name: 'coachType',  ref: coachTypeRef },
    ];

    const mapping = profile.user.userType == "FOOTBALLER" ? playerMapping : coachMapping;

    const save = async (e) => {
        
        e.preventDefault();

        const formData = new FormData();
        mapping.forEach(obj => formData.append(obj.name, obj.value));

        try {
            const headers  = { 'Content-Type': 'application/json', 'Authorization' : token};
            const response = await axios.put('http://localhost:4000/user', formData, headers);
            if(response.status == 200) {
                console.log("Changes saved successfully.");
            } else {
                console.warn("Changes were not saved on the server:");
                console.warn("Error:", response.data);
            }
        } catch(error) {
            
            console.warn("Could not fetch data to the server.");
            
            const u = (profile.user.userType === "FOOTBALLER" ? players : coaches )
                .find(p => p.user.username == profile.user.username);
            
            if(u) {

                mapping.forEach(obj => {
                    u[obj.name]  = obj.ref.current.value;
                    profile[obj.name] = obj.ref.current.value;
                })

                console.log("Profile updated locally.");

                setProfile({ ...profile });

                profile.user.userType === "FOOTBALLER" && setPlayers([ ...players ]);
                profile.user.userType !== "FOOTBALLER" && setCoaches([ ...coaches ]);

                profile.user.userType === "FOOTBALLER" && navigate('/players');
                profile.user.userType !== "FOOTBALLER" && navigate('/coaches');

            } else {
                console.warn("User was not found.");
            }
        }

    }

    const deleteProfile = async (e) => {
        
        e.preventDefault();

        const filtered = players.filter(p => p.user.username !== profile.user.username);

        setToken(null);
        setProfile(null);
        setPlayers([...filtered])

        navigate('/');

    }

    const coachInputs = [
        {
            label: 'Team Name',
            type: 'text',
            value: profile?.teamName,
            ref: teamRef
        }, {
            label: 'Experience',
            type: 'number',
            value: profile?.experience,
            ref: experienceRef
        }, {
            label: 'Coach Type',
            type: 'select',
            value: profile?.coachType,
            ref: coachTypeRef,
            options: ['HEAD_COACH', 'ASSISTANT_COACH', 'GOALKEEPER_COACH', 'FITNESS_COACH', 'CONDITIONING_COACH']
        },
    ]

    const playerInputs = [
        {
            label: 'Team Name',
            type: 'text',
            value: profile?.teamName,
            ref: teamRef
        }, {
            label: 'Passing',
            type: 'number',
            value: profile?.passing,
            ref: passingRef
        }, {
            label: 'Position',
            type: 'select',
            value: profile?.position,
            ref: positionRef,
            options: ['GK', 'CB', 'RB', 'LB', 'RWB', 'LWB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST']
        }, {
            label: 'Dribbling',
            type: 'number',
            value: profile?.dribbling,
            ref: dribblingRef
        }, {
            label: 'Pace',
            type: 'number',
            value: profile?.pace,
            ref: paceRef
        }, {
            label: 'Physique',
            type: 'number',
            value: profile?.physique,
            ref: physiqueRef
        }, {
            label: 'Shooting',
            type: 'number',
            value: profile?.shooting,
            ref: shootingRef
        }, {
            label: 'Defending',
            type: 'number',
            value: profile?.defending,
            ref: defendingRef
        }
    ];

    useEffect(() => {
        if(!profile) {
            navigate('/');
        }
    }, [profile]);

    return (
        <>
            <Header selection={0}/>
            <section className="page profile flex-column">
                <div className="inner flex-column">
                    <h1>{ profile.user.userType == "FOOTBALLER" ? "Footballer" : "Coach" }</h1>
                    <img onClick={upload} src={source} />
                    <h2>Hello, {profile?.user.username}</h2>
                    <form className="col-fd-12 flex">
                        { profile.user.userType === "FOOTBALLER" ? 
                            <ul className='col-fd-12'>
                                {playerInputs.map(i => {
                                    if (i.type !== 'select') {
                                        return (
                                            <li className="col-fd-6 flex-column">
                                                <label className="col-fd-12">{i.label}</label>
                                                <input 
                                                    required
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
                                                    }}/>
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
                            :
                            <ul className='col-fd-6'>
                                {coachInputs.map(i => {
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
                                                        const value = e.target.value;
                                                        if (value <= 0) {
                                                            e.target.value = 1;
                                                        } else if (value >= 100) {
                                                            e.target.value = 99;
                                                        }
                                                    }}/>
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
                        }
                        <div className='col-fd-12 flex-column'>
                            <div className='col-fd-6 flex-column'>
                                <label className='col-fd-12'>Notes</label>
                                <textarea className='col-fd-12' disabled/>
                            </div>
                            <div className='col-fd-6 flex-column'>
                                <button className="col-fd-6" onClick={save}>
                                    Update
                                </button>
                                <button className="col-fd-6" onClick={deleteProfile}>
                                    Delete Profile
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}