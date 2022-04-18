import Input from '../../Input';
import React, { useState, useEffect } from "react";
import "../style.css";
import API from '../../API';
import BASEURL from '../../BASEURL';

const EditRestaurant = () => {
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

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/restaurants/edit/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(results => {
            if (results.status === 200)
                return results.json()
            else
                window.location.href = BASEURL
        })
        .then(data => {
            setInputField({
                name: data.name,
                description: data.description,
                address: data.address,
                postalCode: data.postal_code,
                phone: data.phone_num,
                logo: data.logo,
            })
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }, [])

    const submitHandler = () =>{
        const token = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        formData.append('name', inputFields.name)
        formData.append('description', inputFields.description)
        formData.append('address', inputFields.address)
        formData.append('postal_code', inputFields.postalCode)
        formData.append('phone_num', inputFields.phone)
        if (inputFields.logo instanceof File){
            formData.append('logo', inputFields.logo)
        }
        fetch(`${API}/restaurants/edit/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        })
        .then(results => {
            if (results.status === 200){
                // TODO: change to link of restaurant page
                // Adds a menu object to the restaurant
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
        <div className="form-container">
            <h2>Edit Restaurant</h2>
            <div className="form-group">
                <Input title="Restaurant Name" type="text" name="name" placeholder="Enter restaurant name" inputsHandler={inputsHandler} value={inputFields.name}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Restaurant Description" type="text" name="description" placeholder="Enter restaurant description" inputsHandler={inputsHandler} value={inputFields.description}/>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <Input title="Address" type="text" name="address" placeholder="Enter restaurant address" inputsHandler={inputsHandler} value={inputFields.address}/>
                </div>
                <div className="col">
                    <Input title="Postal Code" type="text" name="postalCode" placeholder="Enter restaurant postal code" inputsHandler={inputsHandler} value={inputFields.postalCode}/>
                </div>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Phone Number" type="text" name="phone" placeholder="123-456-7890" inputsHandler={inputsHandler} value={inputFields.phone}/>
            </div>
            <br/>
            <div className="form-group">
                <label>Logo</label>    
                <br/>     
                <img className="restaurantavatar" alt="logo" src={inputFields.logo}/>       
                <Input title="" type="file" name="logo" inputsHandler={imageHandler}/>
            </div>
            <br/>
            {errorMessage}
            <br/>
            <input className="btn btn-success my-2 my-sm-0 btn-block form-control" type="button" value="Submit" onClick={submitHandler}/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
export default EditRestaurant;