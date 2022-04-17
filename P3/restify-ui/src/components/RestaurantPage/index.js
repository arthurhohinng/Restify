import ContactInfo from '../ContactInfo';
import {useState, useEffect} from 'react';
import API from '../API';

const RestaurantPage = () => { 
    var url = window.location.href
    var id = url.split("/")[4]

    const [authorized, setAuthorized] = useState(0)
    const [ownedId, setId] = useState("")
    const [restaurant, setRestaurant] = useState(0)
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/restaurant/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => {
                if(!response.ok) setAuthorized({authorized:false})
                else return setAuthorized({authorized:true}); response.json()
            })
            .then(json => {
                if(authorized){
                    setId(json.results)
                }
            })
            .catch(err => {
                console.log("error: " + err)
            })

        fetch(`${API}/restaurants/${id}/`, {method: 'GET',})
            .then(response => response.json())
            .then(json => {
                setRestaurant(json.results)
            })
            .catch(err => {
                console.log("error: " + err)
            })
        
    }, [])

    return <>
    <h2 id="title">Hello</h2>
    <ContactInfo /> </>
}

export default RestaurantPage;