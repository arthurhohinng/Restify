import { useEffect, useState } from "react";
import API from '../API';
import NavDropdown from 'react-bootstrap/NavDropdown';

/**
 * Function to parse the datetime object returned by our API into a better format.
 */
function getDate(dateString){
    var date = new Date(dateString)
    var currDate = new Date()
    if (date.getDate() === currDate.getDate() && date.getMonth() === currDate.getMonth() && date.getFullYear() === currDate.getFullYear()){
        // If post was today, only output the time
        return date.getHours()+":"+String(date.getMinutes()).padStart(2, '0')
    }
    // Otherwise, output the date (no time)
    return date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear()
}

const Notification = () => {
    const [notifications, setNotifications] = useState({notifications:[]})
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/notifications/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(results => {
            if (results.status === 200){
                return results.json()
            }
        })
        .then(data => {
            setNotifications(data)
        })
        .catch(err => {
            console.log("error:" + err)
        })
    }, [])
    if (notifications.length > 0){
        return <>
            {notifications.map(notification =>
                <div key={notification.id}>
                    <NavDropdown.Item href={notification.link}>
                        {notification.description}
                        <br/>
                        <small>{getDate(notification.datetime)}</small>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                </div>
            )}
        </>
    }
    else {
        return <></>
    }
}

export default Notification;
