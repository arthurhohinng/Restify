import Input from '../Input';
import React, { useState } from "react";
import "./style.css";
import API from '../API';

const Login = () => {
    const [inputFields, setInputField] = useState({
        userName: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const inputsHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.value} )
    }

    const submitHandler = () =>{
        fetch(`${API}/accounts/login/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: inputFields.userName,
            password: inputFields.password
            })
        })
        .then(results => {
            return results.json()
        })
        .then(data => {
            console.log(data.access)
            localStorage.setItem('currentUser', data.access)
        })
        .catch(err => {
            setErrorMessage(`Request failed`)
            console.log("error: " + err)
        })
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <div className="form-group">
                <Input title="Username" type="text" name="userName" placeholder="Enter username" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Password" type="password" name="password" placeholder="Enter password" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <>{errorMessage}</>
            <br/>
            <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Login" onClick={submitHandler}/>
        </div>
        
    )
}

export default Login;