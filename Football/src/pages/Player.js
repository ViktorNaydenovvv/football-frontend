import { useContext, useRef } from "react";
import GlobalContext from "../store/GlobalContext";

import { useNavigate } from "react-router-dom";
import "./Player.css";

export default function Player() {
  const navigate = useNavigate();

  let { signup, profile, setProfile } = useContext(GlobalContext);

  const teamRef = useRef(null);
  const passingRef = useRef(null);
  const positionRef = useRef(null);
  const dribblingRef = useRef(null);
  const paceRef = useRef(null);
  const physiqueRef = useRef(null);
  const shootingRef = useRef(null);
  const defendingRef = useRef(null);

  const mapping = [
    { name: "teamName", ref: teamRef },
    { name: "passing", ref: passingRef },
    { name: "position", ref: positionRef },
    { name: "dribbling", ref: dribblingRef },
    { name: "pace", ref: paceRef },
    { name: "physique", ref: physiqueRef },
    { name: "shooting", ref: shootingRef },
    { name: "defending", ref: defendingRef },
  ];

  const submit = async (e) => {
    e.preventDefault();

    console.log("submit");
    console.log(signup);

    const data = {
      profileData: {
        email: signup.email,
        username: signup.username,
        age: 18,
        userType: "FOOTBALLER",
        password: signup.password,
      },
    };

    mapping.forEach((m) => {
      data[m.name] = m.ref.current.value;
    });

    console.log(data);

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(
        "http://localhost:8080/api/v1/footballers/register",
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const inputs = [
    {
      label: "Team Name",
      type: "text",
      value: profile?.teamName || "None",
      ref: teamRef,
    },
    {
      label: "Passing",
      type: "number",
      value: profile?.passing || 50,
      ref: passingRef,
    },
    {
      label: "Position",
      type: "select",
      value: profile?.position || 50,
      ref: positionRef || "GK",
      options: [
        "GK",
        "CB",
        "RB",
        "LB",
        "RWB",
        "LWB",
        "CDM",
        "CM",
        "CAM",
        "RW",
        "LW",
        "ST",
      ],
    },
    {
      label: "Dribbling",
      type: "number",
      value: profile?.dribbling || 50,
      ref: dribblingRef,
    },
    {
      label: "Pace",
      type: "number",
      value: profile?.pace || 50,
      ref: paceRef,
    },
    {
      label: "Physique",
      type: "number",
      value: profile?.physique || 50,
      ref: physiqueRef,
    },
    {
      label: "Shooting",
      type: "number",
      value: profile?.shooting || 50,
      ref: shootingRef,
    },
    {
      label: "Defending",
      type: "number",
      value: profile?.defending || 50,
      ref: defendingRef,
    },
  ];

  return (
    <section className="page player flex-column">
      <div className="inner flex-column">
        <h1>Football player</h1>
        <form className="col-fd-12 flex">
          <ul className="col-fd-12">
            {inputs.map((i) => {
              if (i.type !== "select") {
                return (
                  <li className="col-fd-6 flex-column">
                    <label className="col-fd-12">{i.label}</label>
                    <input
                      ref={i.ref}
                      type={i.type}
                      className="col-fd-12"
                      defaultValue={i.value}
                      onBlur={(e) => {
                        if (i.type == "number") {
                          const value = e.target.value;
                          if (value <= 0) {
                            e.target.value = 1;
                          } else if (value >= 100) {
                            e.target.value = 99;
                          }
                        }
                      }}
                    />
                  </li>
                );
              } else {
                return (
                  <li className="col-fd-6 flex-column">
                    <label className="col-fd-12">{i.label}</label>
                    <select
                      className="col-fd-12"
                      ref={i.ref}
                      defaultValue={i.value}
                    >
                      {i.options.map((o) => (
                        <option>{o}</option>
                      ))}
                    </select>
                  </li>
                );
              }
            })}
          </ul>
          <div className="col-fd-12 flex-column">
            <div className="col-fd-6 flex-column">
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
