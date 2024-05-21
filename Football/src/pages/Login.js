import "./Login.css";

import axios from "axios";
import Form from "../components/Form";

import { useContext, useRef } from "react";
import GlobalContext from "../store/GlobalContext";

import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const { players, setProfile, setToken } = useContext(GlobalContext);
    console.log(players);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const submit = async (e) => {

        e.preventDefault();

        if (emailRef.current.value.trim() == "" ||
            passwordRef.current.value.trim() == "") {
            alert("Enter all inputs.");
            return;
        };

        const formData = new FormData();
        formData.append('email', emailRef.current.value);
        formData.append('password', passwordRef.current.value);

        try {
            const headers = { 'Content-Type': 'application/json' };
            const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            
            }, headers);
            setToken(response.data.token);
            console.log('USER');
            console.log(response.data.user);
            setProfile(response.data.user);
            navigate('/profile');
        } catch (error) {
            console.error(error);
            console.warn("Could not fetch data from the server.");
            console.log(emailRef.current.value);
            const profile = players.find(p => p.user.email == emailRef.current.value);
            if (profile) {
                profile.likes = profile.likes || [];
                setProfile(profile);
                navigate('/players');
            } else {
                console.warn("User with this email doesn't exist.");
                alert("Invalid credentials");
            }
        }
    }

    const title = "Welcome Back";
    const button = "Sign in";
    const link = {
        label: "Not registered? Sign up now!",
        href: "/signup"
    };
    const inputs = [{
        label: "Your email",
        type: "text",
        name: "email",
        ref: emailRef
    }, {
        label: "Your password",
        type: "password",
        name: "password",
        ref: passwordRef
    }];

    return (
        <section className="page flex">
            <Form title={title} inputs={inputs} button={button} link={link} submit={submit} />
        </section>
    );
}