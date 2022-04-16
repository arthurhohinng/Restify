import Input from '../Input';
import React, { useEffect, useState } from "react";
// import "./style.css";
import API from '../API';
import BASEURL from '../BASEURL';

const Profile = () => {
    const [authorized, setAuthorized] = useState(0)
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avatar: null,
        ownedRestaurant: null,
        phoneNum: null
    })

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/profile/`, {
        method: 'GET',
        mode : 'no-cors',
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
                phoneNum: data.phone_num
            })
            setAuthorized({authorized: true})
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }, [])

    return (
        <div className="container">
            <h1>My Profile</h1>
            <div>
                <h2>Avatar</h2>
                <img src={userInfo.avatar} alt="Avatar"/>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <Input title="First Name" type="text" name="userName" value={userInfo.firstName}/>
                </div>
                <div className="col">
                    <Input title="Last Name" type="text" name="lastName" value={userInfo.lastName}/>
                </div>
            </div>
            <br/>
            <h2>Contact Info</h2>
            <div className="form-group">
                <Input title="Phone Number" type="tel" name="phone" value={userInfo.phoneNum}/>
            </div>
            <div className="form-group">
                <Input title="Email" type="email" name="email" value={userInfo.email}/>
            </div>
        </div>
    )
}

export default Profile;