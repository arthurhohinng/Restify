import Input from '../../Input';
import React, { useState } from "react";
import "../style.css";
import API from '../../API';
import BASEURL from '../../BASEURL';

const AddEditMenu = () => {
    const [inputFields, setInputField] = useState({
        name: '',
        description: '',
        price: 0,
        category: ''
    })

    const [errorMessage, setErrorMessage] = useState('')

    const inputsHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.value} )
    }

    const submitHandler = () =>{
        const token = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        formData.append('name', inputFields.name)
        formData.append('description', inputFields.description)
        formData.append('price', inputFields.price)
        formData.append('category', inputFields.category)
        fetch(`${API}/restaurants/menu/add-item/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        })
        .then(results => {
            if (results.status === 201){
                // TODO: change to link of restaurant page
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
            <h2>Add Menu Item</h2>
            <div className="form-group">
                <Input title="Item Name" type="text" name="name" placeholder="Enter title" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Item Description" type="text" name="description"  inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" type="number" step="0.01" min="0" name="price" onChange={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Category" type="text" name="category" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            {errorMessage}
            <br/>
            <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Add item" onClick={submitHandler}/>
        </div>
    )
}
export default AddEditMenu;