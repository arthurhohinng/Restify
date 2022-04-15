import React from 'react';

const Input = ({ title, name }) => {
    return (
        <div class="form-group">
                <label>{title}</label>
                <input class="form-control" type={name} name={name} placeholder={"Enter " + {name}}/>
        </div>
    )
}

export default Input;