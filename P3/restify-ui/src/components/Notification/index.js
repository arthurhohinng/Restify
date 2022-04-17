import { useEffect, useState } from "react";
import API from '../API';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
