import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useState, useEffect} from 'react';
import API from '../API';
import './style.css'

/* If the user is logged in and stuff, do they own a restaurant? If so, which? */
const GetOwnedId = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [checkId, setCheckId] = useState(0)

    useEffect(() => {
        fetch(`${API}/accounts/restaurant/`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => { return response.json()})
            .then(response => setCheckId(response))
            .catch(err => {
                console.log("error: " + err)
        })
    }, [])
    return checkId[0]
}

const RestaurantPage = () => { 
    var id = parseInt((window.location.href).split("/")[4])
    var ownedId = GetOwnedId()

    const [restaurant, setRestaurant] = useState({})
    useEffect(() => {
        fetch(`${API}/restaurants/${id}/`)
            .then(response => { return response.json()})
            .then(response => setRestaurant(response))
            .catch(err => {
                console.log("error: " + err)
            })
        
    }, [])

    /* if ownedId === Id, render the restaurant as the owner. otherwise, render as normal */
    if ((restaurant != undefined) && (ownedId != undefined) && (ownedId === id)){
        return <>
        <h2 id="rest-page-title">{restaurant.name}</h2>
        <div className="container resto-container">
            <ul className="nav nav-pills" id="restaurant-tabs" role="tablist">
                <li className="nav-item">
                <a className="nav-link rest-link active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link rest-link" id="menu-tab" data-toggle="tab" href="#menu" role="tab" aria-controls="menu" aria-selected="false">Menu</a>
                </li>
                <li className="nav-item">
                <a className="nav-link rest-link" id="blog-tab" data-toggle="tab" href="#blogposts" role="tab" aria-controls="blogposts" aria-selected="false">Blog Posts</a>
                </li>
                <li className="nav-item">
                <a className="nav-link rest-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link rest-link" id="edit-tab" data-toggle="tab" href="#edit" role="tab" aria-controls="edit" aria-selected="false">Edit Restaurant</a>
                </li>
            </ul>
            <div className="tab-content" id="restaurant-tabs-content">
                <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                    about
                </div>
                <div className="tab-pane fade" id="menu" role="tabpanel" aria-labelledby="menu-tab">
                    menu
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    contact
                </div>
                <div className="tab-pane fade" id="edit" role="tabpanel" aria-labelledby="edit-tab">
                    edit
                </div>
            </div>
        </div>
        </>
    }
    else if (restaurant != undefined){
        return <>
        <h2 id="title">{restaurant.name}</h2>
        <div className="container resto-container">
            <ul className="nav nav-tabs" id="restaurant-tabs" role="tablist">
                <li className="nav-item">
                <a className="nav-link rest-link active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link rest-link" id="menu-tab" data-toggle="tab" href="#menu" role="tab" aria-controls="menu" aria-selected="false">Menu</a>
                </li>
                <li className="nav-item">
                <a className="nav-link rest-link" id="blog-tab" data-toggle="tab" href="#blogposts" role="tab" aria-controls="blogposts" aria-selected="false">Blog Posts</a>
                </li>
                <li className="nav-item">
                <a className="nav-link rest-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                </li>
            </ul>
            <div className="tab-content" id="restaurant-tabs-content">
                <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                    
                </div>
                <div className="tab-pane fade" id="menu" role="tabpanel" aria-labelledby="menu-tab">
                
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                </div>
            </div>
        </div>
        </>
    }
    return <>
    <h2 id="title">Loading...</h2>
    </>
}

export default RestaurantPage;