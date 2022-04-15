import React from 'react';
import Button from '../Button';
import Input from '../Input';

const Register = () => {
    

    return (
        <form method="POST" encType="multipart/form-data">
            <div className="container">
                <h2>Sign up</h2>
                <div className="form-group">
                    <Input title="Username" type="text" name="username" placeholder="Enter username"/>
                </div>
                <br/>
                <div className="row">
                    <div className="col">
                        <Input title="First Name" type="text" name="first-name" placeholder="Enter first name"/>
                    </div>
                    <div className="col">
                        <Input title="Last Name" type="text" name="last-name" 
                        placeholder="Enter last name"/>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Avatar" type="file" name="avatar"/>
                </div>
                <br/>
                <h2>Contact Info</h2>
                <div className="form-group">
                    <Input title="Phone number" type="tel" name="phone" placeholder="123-456-7890"/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Email" type="email" name="email" placeholder="Enter email"/>
                </div>
                <br/>
                <h2>Password</h2>
                <div className="form-group">
                    <Input title="Password" type="password" name="password" placeholder="Enter password"/>
                </div>
                <br/>
                <div className="form-group">
                    <Input title="Confirm password" type="password" name="confirm-password" placeholder="Confirm password"/>
                </div>
                <br/>
                <input type="submit" value="Submit"></input>
            </div>
        </form>
    )
}

export default Register;