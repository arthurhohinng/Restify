import Input from '../../Input';
import React, { useEffect, useState } from "react";
import "../style.css";
import API from '../../API';
import BASEURL from '../../BASEURL';

const Profile = () => {
    const [readOnly, setReadOnly] = useState(true)
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        password1: '',
        password2: '',
        email: '',
        avatar: null,
        ownedRestaurant: null,
        phone: ''
    })

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/profile/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        })
        .then(results => {
            if (results.status === 200)
                return results.json()
            else
                window.location.href = BASEURL
        })
        .then(data => {
            console.log(data)
            setUserInfo({
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                avatar: data.avatar,
                ownedRestaurant: data.owned_restaurant,
                phone: data.phone_num
            })
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }, [])

    const toggleEdit = () => {
        setReadOnly(!readOnly)
    }

    const inputsHandler = e =>{
        setUserInfo( {...userInfo, [e.target.name]: e.target.value} )
    }

    const imageHandler = e =>{
        setUserInfo( {...userInfo, [e.target.name]: e.target.files[0]} )
    }

    const editProfile = () => {
        const token = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        formData.append('password1', userInfo.password1)
        formData.append('password2', userInfo.password2)
        formData.append('first_name', userInfo.firstName)
        formData.append('last_name', userInfo.lastName)
        formData.append('email', userInfo.email)
        formData.append('phone_num', userInfo.phone)
        if ((typeof userInfo.avatar) === "object"){
            formData.append('avatar', userInfo.avatar)
        }
        console.log(formData.get('avatar'))
        fetch(`${API}/accounts/profile/edit/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        })
        .then(results => {
            if (results.status === 200){
                toggleEdit()
                return results.json()
            }
        })
        .then(data => {
            setUserInfo({
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                avatar: data.avatar,
                ownedRestaurant: data.owned_restaurant,
                phone: data.phone_num
            })
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }

    return (
        <div className="form-container">
            <h1>My Profile</h1>
            <button className='btn btn-outline-success my-2 my-sm-0 btn-block' onClick={toggleEdit}>Edit</button>
            <div>
                <h2>Avatar</h2>
                <img src={userInfo.avatar} alt="Avatar"/>
                {readOnly ?
                    <></> :
                    <div className="form-group">
                        <Input title="Avatar" type="file" name="avatar" inputsHandler={imageHandler} read={readOnly}/>
                    </div>
                }
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <Input title="First Name" type="text" name="firstName" value={userInfo.firstName} inputsHandler={inputsHandler} read={readOnly}/>
                </div>
                <div className="col">
                    <Input title="Last Name" type="text" name="lastName" value={userInfo.lastName} inputsHandler={inputsHandler} read={readOnly}/>
                </div>
            </div>
            <br/>
            <h2>Contact Info</h2>
            <div className="form-group">
                <Input title="Phone Number" type="tel" name="phone" value={userInfo.phone} inputsHandler={inputsHandler} read={readOnly}/>
            </div>
            <div className="form-group">
                <Input title="Email" type="email" name="email" value={userInfo.email} inputsHandler={inputsHandler} read={readOnly}/>
            </div>
            <br/>
            <>{readOnly ? 
                <></> :
                <>
                    <h2>Password</h2>
                    <div className="form-group">
                        <Input title="Password" type="password" name="password1" placeholder="Enter password" inputsHandler={inputsHandler} read={false}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <Input title="Confirm password" type="password" name="password2" placeholder="Confirm password" inputsHandler={inputsHandler} read={false}/>
                    </div>
                    <br/>
                    <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Submit" onClick={editProfile}/>
                </>}
            </>
        </div>
    )
}

export default Profile;