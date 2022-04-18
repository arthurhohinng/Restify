import './style.css'
import {useEffect, useState} from "react";
import API from "../API";

const ContactInfo = () => {
    const [info, setInfo] = useState({})

    useEffect(() => {
        var url = window.location.href;
        var restaurant_id = url.split("/")[4];

        fetch(`${API}/restaurants/${restaurant_id}/contact/`, {
            method: 'GET',
            })
            .then(response => response.json())
            .then(json => {
                setInfo(json)
            })
            .catch(err => {
                    console.log("error: " + err)
            })
    }, [])

    // return contact info in div
    if (Object.keys(info).length !== 0) {
        console.log(info)
        return (<>
            <div id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div className="container contact-container" id="contactpart">
                    <br/>
                    <h4>Our Location</h4>
                    <br/>
                    <div id="rest-addr">
                        <span className="addr-part">Address: </span>{info.address}<br/>
                        <span className="addr-part">Postal Code: </span>{info.postal_code}<br/>
                        <span className="addr-part">Phone Number: </span>{info.phone_number}<br/>
                    </div>
                </div>
                Feel free to leave a comment on the main page and we will get back to you!
            </div>
        </>)
    }
    else {
        return <>
            <div id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div className="container contact-container">
                    No Contact Info Found.
                </div>
            </div>
        </>
    }
}
export default ContactInfo