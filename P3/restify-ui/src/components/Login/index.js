import Input from '../Input';
import React, { useState } from "react";
import "./style.css";
import API from '../API';
import BASEURL from '../BASEURL';

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
            if (results.status === 200)
                return results.json()
        })
        .then(data => {
            //Set auth token to local storage
            localStorage.setItem('token', JSON.stringify(data.access))
            window.location.href = BASEURL
        })
        .catch(err => {
            setErrorMessage(`Invalid login`)
            console.log("error: " + err)
        })
    }

    return (
        <form>
            <div className="container">
                <h2>Login</h2>
                <div className="form-group">
                    <Input title="Username" type="text" name="userName" placeholder="Enter username" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Password" type="password" name="password" placeholder="Enter password" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <>{errorMessage}</>
                <br/>
                <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Login" onClick={submitHandler}/>
            </div>
        </form>
        
    )
}

export default Login;