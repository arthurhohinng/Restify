import React from 'react';
import "./style.css"

const Input = ({ title, type, name, placeholder, value, inputsHandler, read = false }) => {
    return (
        <>
            <label>{title}</label>
            {read === false ? 
            <input className="form-control" type={type} name={name} placeholder={placeholder} value={value} onChange={inputsHandler}/>:
            <input className="form-control" type={type} name={name} placeholder={placeholder} value={value} onChange={inputsHandler} readOnly/> }
        </>
    )
}

export default Input;