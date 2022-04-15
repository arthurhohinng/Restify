import React from 'react';
import "./style.css"

const Input = ({ title, type, name, placeholder, inputsHandler }) => {
    return (
        <>
            <label>{title}</label>
            <input className="form-control" type={type} name={name} placeholder={placeholder} onChange={inputsHandler}/>
        </>
    )
}

export default Input;