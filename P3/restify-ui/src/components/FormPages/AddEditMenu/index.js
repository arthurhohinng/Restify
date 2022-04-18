import Input from '../../Input';
import React, { useEffect, useState } from "react";
import "../style.css";
import API from '../../API';
import BASEURL from '../../BASEURL';

const AddEditMenu = ( {title="Add item", showAddItem, setShowAddItem, id=0, setItems, items, setEdit} ) => {
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

    useEffect(() => {
        if (id !== 0){
            const token = JSON.parse(localStorage.getItem("token"))
            let formData = new FormData()
            formData.append('id', id)
            fetch(`${API}/restaurants/edit-menu/?id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(results => {
                return results.json()
            })
            .then(data => {
                setInputField({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category
                })
            })
            .catch(err => {
                console.log("error:" + err)
            })
        }
    }, [])

    const submitHandler = () =>{
        const token = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        formData.append('name', inputFields.name)
        formData.append('description', inputFields.description)
        formData.append('price', inputFields.price)
        formData.append('category', inputFields.category)
        if (id === 0 ){
            fetch(`${API}/restaurants/menu/add-item/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
            })
            .then(results => {
                if (results.status === 201){
                    setShowAddItem(!showAddItem)
                    return results.json()
                }
            })
            .then(data => {
                setItems({... items, list: [... items.list, data]})
            })
            .catch(err => {
                console.log("error: " + err)
            })
        }
        else {
            formData.append('id', id)
            fetch(`${API}/restaurants/edit-menu/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
                })
                .then(results => {
                    if (results.status === 200){
                        return results.json()
                    }
                })
                .then(data => {
                    const newList = items.list.filter(item => item.id !== id)
                    newList.push(data)
                    setItems({...items, list: newList})
                    setEdit(false)
                })
                .catch(err => {
                    console.log("error: " + err)
            })
        }
    }
    
    return (
        <div className="form-container">
            <h2>{title}</h2>
            <div className="form-group">
                <Input title="Item Name" type="text" name="name" placeholder="Enter title" inputsHandler={inputsHandler} value={inputFields.name}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Item Description" type="text" name="description"  inputsHandler={inputsHandler} value={inputFields.description}/>
            </div>
            <br/>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" type="number" step="0.01" min="0" name="price" onChange={inputsHandler} value={inputFields.price}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Category" type="text" name="category" inputsHandler={inputsHandler} value={inputFields.category}/>
            </div>
            <br/>
            {errorMessage}
            <br/>
            <input className="btn btn-success my-2 my-sm-0 btn-block form-control" type="button" value={title} onClick={submitHandler}/>
        </div>
    )
}
export default AddEditMenu;