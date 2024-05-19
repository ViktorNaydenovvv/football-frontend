import { Link } from "react-router-dom";
import './Form.css';
import { useState } from "react";

export default function Form({ title, inputs, button, link, toggle, submit }) {

    const [toggleSelection, setToggleSelection] = useState(0);

    return (
        <div className="box">
            <h1 className="col-fd-12">{title}</h1>
            <form className="col-fd-12 flex-column">
                {inputs.map(value =>
                    <div className="col-fd-8 flex-column">
                        <label className="col-fd-12">{value.label}</label>
                        <input required ref={value.ref} name={value.name} type={value.type} className="col-fd-12" />
                    </div>
                )}
                {toggle &&
                    <div className="toggle col-fd-8 flex-column">
                        <label className="col-fd-12">{toggle.label}</label>
                        <div className="button-wrapper col-fd-12">
                            <button
                                className={toggleSelection == 0 && "selected"}
                                onClick={(e) => e.preventDefault() || setToggleSelection(0)}>
                                {toggle.values[0]}
                            </button>
                            <button
                                ref={toggle.ref}
                                className={toggleSelection == 1 && "selected"}
                                onClick={(e) => e.preventDefault() || setToggleSelection(1)}>
                                {toggle.values[1]}
                            </button>
                        </div>
                    </div>
                }
                <button
                    className="col-fd-4"
                    onClick={(e) => {
                        if(toggle) {
                            submit(e, toggle.values[toggleSelection])
                        } else {
                            submit(e);
                        }
                    }}>
                    {button}
                </button>
            </form>
            {link &&
                <Link className="col-fd-12 link" to={link.href}>
                    <h2>{link.label}</h2>
                </Link>
            }
        </div>
    );
}