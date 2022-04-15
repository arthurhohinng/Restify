import React from 'react';

const Input = ({ title, type, name, placeholder }) => {
    return (
        <>
            <label>{title}</label>
            <input className="form-control" type={type} name={name} placeholder={placeholder}/>
        </>
    )
}

export default Input;