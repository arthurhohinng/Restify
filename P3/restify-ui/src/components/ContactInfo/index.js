import './style.css'
import {useEffect, useState} from "react";
import API from "../API";

const ContactInfo = () => {
    const [info, setInfo] = useState({info: [], page: 1})
    const [authorized, setAuthorized] = useState(0)
    useEffect(() => {
        var url = window.location.href;
        var restaurant_id = url.split("/")[4];
        const token = JSON.parse(localStorage.getItem("token"))
        // use get_contact_info.py, so <int:pk>/contact/ for url
        fetch(API + "/restaurants/" + restaurant_id + "/contact/", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        }).then(response => response.json())
            .then(json => {
                setInfo(json.results)
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [])

    // return contact info in div
    if (info.length > 0) {
        return (<>
            <div id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div className="container contact-container" id="comments-tab">
                    <br/>
                    <h4>Our Location</h4>
                    <br/>
                    <div id="rest-addr">
                        <span className="addr-part">Address:</span>{info[0].address}<br/>
                        <span className="addr-part">Postal Code:</span> {info[0].postal_code}<br/>
                        <span className="addr-part">Phone Number:</span> {info[0].phone_number}<br/>
                    </div><br/>
                    Feel free to leave a comment on the main page and we will get back to you!
                </div>
            </div>
        </>)
    }
    else {
        return <>
            <div id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div className="container contact-container" id="comments-tab">
                    <br/>
                    <h4>Our Location</h4>
                    <br/>
                    <div id="rest-addr">
                        <span class="addr-part">Address:</span> N/A<br></br>
                        <span class="addr-part">Postal Code:</span> N/A<br></br>
                        <span class="addr-part">Phone Number:</span> N/A<br></br>
                    </div><br></br>
                </div>
            </div>
        </>
    }
}
/*
function ContactInfo(props) {
    return <>
    <div id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div class="container contact-container" id="comments-tab">
            <br></br>
            <h4>Our Location</h4>
            <br></br>
            <div id="rest-addr">
                <span class="addr-part">Address:</span> {props.address}<br></br>
                <span class="addr-part">Postal Code:</span> {props.postalcode}<br></br>
                <span class="addr-part">Phone Number:</span> {props.phonenum}<br></br>
            </div><br></br>
            Feel free to leave a comment on the main page and we will get back to you!
        </div>
    </div>
    </>
}
 */
export default ContactInfo