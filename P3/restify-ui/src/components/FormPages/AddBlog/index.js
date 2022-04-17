import Input from '../../Input';
import React, { useState } from "react";
import "../style.css";
import API from '../../API';
import BASEURL from '../../BASEURL';

const AddBlog = () => {
    const [inputFields, setInputField] = useState({
        title: '',
        image: null,
        body: '',
        author: ''
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
        formData.append('title', inputFields.title)
        formData.append('body', inputFields.body)
        formData.append('author', inputFields.author)
        if ((typeof inputFields.image) === "object"){
            formData.append('image', inputFields.image)
        }
        fetch(`${API}/restaurants/blogpost/add/`, {
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
        <div className="container">
            <h2>Add Blogpost</h2>
            <div className="form-group">
                <Input title="Blog Title" type="text" name="title" placeholder="Enter title" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Image" type="file" name="image"  inputsHandler={imageHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <label>Blog Body</label>
                <textarea className="form-control" type="textarea" name="body" onChange={inputsHandler}/>
            </div>
            <br/>
            <div className="form-group">
                <Input title="Author" type="text" name="author" inputsHandler={inputsHandler}/>
            </div>
            <br/>
            {errorMessage}
            <br/>
            <input className="btn btn-outline-success my-2 my-sm-0 btn-block form-control" type="button" value="Submit" onClick={submitHandler}/>
        </div>
    )
}
export default AddBlog;