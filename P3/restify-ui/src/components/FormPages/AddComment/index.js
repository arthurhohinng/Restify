import Input from '../../Input';
import React, { useState } from "react";
import "../style.css";
import API from '../../API';

const AddComment = ( {comments, setComments} ) => {
    const [inputFields, setInputField] = useState({
        id: '',
        restaurant: '',
        body: '',
        author: ''
    })

    const [errorMessage, setErrorMessage] = useState('')

    const inputsHandler = e =>{
        setInputField( {...inputFields, [e.target.name]: e.target.value} )
    }

    const submitHandler = () =>{
        const token = JSON.parse(localStorage.getItem("token"))
        const url = window.location.href
        const restaurantId = url.split("/")[4]
        let formData = new FormData()
        formData.append('id', restaurantId)
        formData.append('text', inputFields.text)
        fetch(`${API}/restaurants/${restaurantId}/add-comment/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
            body: formData
        })
        .then(results => {
            if (results.status === 201){
                return results.json()
            }
        })
        .then(data => {
            setComments({...comments, comments: [...comments.comments, data]})
        })
        .catch(err => {
            console.log("error: " + err)
        })
    }
    
    return (
        <div className="commentformsubmit">
            <h4>Got a comment?</h4>
            <div className="form-group">
                <textarea id="comment-box" type="textarea" name="text" onChange={inputsHandler} placeholder="Enter comment here..." rows="4" cols="50" />
            </div>
            {errorMessage}
            <br/>
            <input id="add-comment-button" type="button" value="Add comment" onClick={submitHandler}/>
            <br/>
            <br/>
        </div>
    )
}
export default AddComment;