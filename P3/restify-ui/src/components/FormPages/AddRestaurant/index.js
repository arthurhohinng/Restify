import Input from '../../Input';
import React, { useState } from "react";
import "../style.css";
import API from '../../API';
import BASEURL from '../../BASEURL';

const AddRestaurant = () => {
    const [inputFields, setInputField] = useState({
        name: '',
        description: '',
        address: '',
        postalCode: '',
        phone: '',
        logo: null
    })

    const [errorMessage, setErrorMessage] = useState('')

    const inputsHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.value} )
    }

    const imageHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.files[0]} )
    }

    const submitHandler = () =>{
        const token = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        formData.append('name', inputFields.name)
        formData.append('description', inputFields.description)
        formData.append('address', inputFields.address)
        formData.append('postal_code', inputFields.postalCode)
        formData.append('phone_num', inputFields.phone)
        if ((typeof inputFields.logo) === "object"){
            formData.append('logo', inputFields.logo)
        }
        fetch(`${API}/accounts/add-restaurant/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        })
        .then(results => {
            if (results.status === 201){
                // TODO: change to link of restaurant page
                // Adds a menu object to the restaurant
                fetch(`${API}/restaurants/add-menu/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                window.location.href=`${BASEURL}`
            }
            else{
                return results.json()
            }
        })
        .then(data => {
            setErrorMessage(JSON.stringify(data))
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }
    
    return (
        <div className="container">
            <h2>Add Restaurant</h2>
            <div className="form-group">
                <Input title="Restaurant Name" type="text" name="name" placeholder="Enter restaurant name" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Restaurant Description" type="text" name="description" placeholder="Enter restaurant description" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <Input title="Address" type="text" name="address" placeholder="Enter restaurant address" inputsHandler={inputsHandler}/>
                </div>
                <div className="col">
                    <Input title="Postal Code" type="text" name="postalCode" placeholder="Enter restaurant postal code" inputsHandler={inputsHandler}/>
                </div>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Phone Number" type="text" name="phone" placeholder="123-456-7890" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Logo" type="file" name="logo" inputsHandler={imageHandler}/>
            </div>
            <br/>
            {errorMessage}
            <br/>
            <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Submit" onClick={submitHandler}/>
        </div>
    )
}
export default AddRestaurant;