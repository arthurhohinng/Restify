import Input from '../Input';
import React, { useState } from "react";
import "./style.css";
import API from '../API';
import BASEURL from '../BASEURL';

const Register = () => {
    const [inputFields, setInputField] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        avatar: null,
        phone: null,
        email:  '',
        password1: '',
        password2: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const inputsHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.value} )
    }

    const imageHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.files[0]} )
    }

    const submitHandler = () =>{
        let formData = new FormData()
        formData.append('username', inputFields.userName)
        formData.append('password1', inputFields.password1)
        formData.append('password2', inputFields.password2)
        formData.append('first_name', inputFields.firstName)
        formData.append('last_name', inputFields.lastName)
        formData.append('email', inputFields.email)
        formData.append('avatar', inputFields.avatar)
        formData.append('phone_num', inputFields.phone)
        fetch(`${API}/accounts/register/`, {
        method: 'POST',
        body: formData
        })
        .then(results => {
            if (results.status === 201){
                window.location.href=`${BASEURL}/login/`
            }
            else{
                setErrorMessage(`Request failed with status ${results.status}`)
                console.log(results.json())
            }
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }

    return (
        <form method='POST' id='registerForm'>
            <div className="container">
                <h2>Sign up</h2>
                <div className="form-group">
                    <Input title="Username" type="text" name="userName" placeholder="Enter username" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <div className="row">
                    <div className="col">
                        <Input title="First Name" type="text" name="firstName" placeholder="Enter first name" inputsHandler={inputsHandler} read={false}/>
                    </div>
                    <div className="col">
                        <Input title="Last Name" type="text" name="lastName" 
                        placeholder="Enter last name" inputsHandler={inputsHandler} read={false}/>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Avatar" type="file" name="avatar" inputsHandler={imageHandler} read={false}/>
                </div>
                <br/>
                <h2>Contact Info</h2>
                <div className="form-group">
                    <Input title="Phone number" type="tel" name="phone" placeholder="123-456-7890" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Email" type="email" name="email" placeholder="Enter email" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <h2>Password</h2>
                <div className="form-group">
                    <Input title="Password" type="password" name="password1" placeholder="Enter password" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Confirm password" type="password" name="password2" placeholder="Confirm password" inputsHandler={inputsHandler} read={false}/>
                </div>
                <br/>
                <>{errorMessage}</>
                <br/>
                <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Sign up" onClick={submitHandler}/>
            </div>
        </form>
    )
}

export default Register;