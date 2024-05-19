import "./Signup.css";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import GlobalContext from "../store/GlobalContext";

export default function Signup() {

    const { setSignup } = useContext(GlobalContext);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const typeRef = useRef(null);
    const usernameRef = useRef(null);

    const navigate = useNavigate();
    const submit = (e, args) => {

        e.preventDefault();

        console.log(usernameRef.current.value);

        if (usernameRef.current.value.trim() == "" ||
            emailRef.current.value.trim() == "" ||
            passwordRef.current.value.trim() == "") {
            alert("Enter all inputs");
            return;
        };

        setSignup({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            type: typeRef.current.textContent,
        });

        if (args.toLowerCase() == "player") {
            navigate("/player");
        } else {
            navigate("/coach");
        }

    };

    const title = "Registration";
    const button = "Continue";
    const link = {
        label: "Already Registered? Sign in now!",
        href: "/"
    };
    const inputs = [
        {
            label: "Your name",
            type: "text",
            name: "username",
            ref: usernameRef
        }, {
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

    const toggle = {
        label: "Choose",
        values: ["Player", "Coach"],
        ref: typeRef
    };

    return (
        <section className="page flex">
            <Form title={title} inputs={inputs} button={button} link={link} toggle={toggle} submit={submit} />
        </section>
    );
}