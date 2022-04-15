import Input from '../Input';
import React, { useState } from "react";
import "./style.css"


const Register = () => {
    const [inputFields, setInputField] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        avatar: null,
        phone: '',
        email:  '',
        password1: '',
        password2: ''
    })

    const inputsHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.value} )
    }

    const submitHandler = () =>{
        fetch('https://mywebsite.com/endpoint/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue',
        })
        })
    }

    return (
        <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="container">
                <h2>Sign up</h2>
                <div className="form-group">
                    <Input title="Username" type="text" name="userName" placeholder="Enter username" inputsHandler={inputsHandler}/>
                </div>
                <br/>
                <div className="row">
                    <div className="col">
                        <Input title="First Name" type="text" name="firstName" placeholder="Enter first name" inputsHandler={inputsHandler}/>
                    </div>
                    <div className="col">
                        <Input title="Last Name" type="text" name="lastName" 
                        placeholder="Enter last name" inputsHandler={inputsHandler}/>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Avatar" type="file" name="avatar" inputsHandler={inputsHandler}/>
                </div>
                <br/>
                <h2>Contact Info</h2>
                <div className="form-group">
                    <Input title="Phone number" type="tel" name="phone" placeholder="123-456-7890" inputsHandler={inputsHandler}/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Email" type="email" name="email" placeholder="Enter email" inputsHandler={inputsHandler}/>
                </div>
                <br/>
                <h2>Password</h2>
                <div className="form-group">
                    <Input title="Password" type="password" name="password1" placeholder="Enter password" inputsHandler={inputsHandler}/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Confirm password" type="password" name="password2" placeholder="Confirm password" inputsHandler={inputsHandler}/>
                </div>
                <br/>
                <input type="submit" className="btn btn-outline-success my-2 my-sm-0 btn-block" value="Sign up"></input>
            </div>
        </form>
    )
}

export default Register;