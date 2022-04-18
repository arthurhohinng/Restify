import Gallery from "../Gallery";
import CommentForm from "../Comment";
import {useState, useEffect} from 'react';
import API from '../API';
import BASEURL from '../BASEURL';
import LikeRestaurantButton from '../LikeButton/LikeRestaurantButton'
import FollowRestaurantButton from '../LikeButton/FollowRestaurantButton'

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
    }, [token])
    return checkId[0]
}

function getLogo(restaurantId) {
    const req = new XMLHttpRequest()
    let images = []
    images = document.getElementsByClassName(restaurantId+"-logo")
    if (images.length === 0){
        return
    }
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            let res = JSON.parse(this.responseText)
            for (var image of images){
                if (image.src === ''){
                    image.src = API+res.logo
                }
            }
        }
    }
    req.open("GET", API+"/restaurants/"+restaurantId+"/logo/")
    req.send()
}

const About = () => {
    var id = parseInt((window.location.href).split("/")[4])
    var ownedId = GetOwnedId()

    const [restaurant, setRestaurant] = useState({})
    useEffect(() => {
        fetch(`${API}/restaurants/${id}/`)
            .then(response => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();})
            .then(response => {
                console.log(response)
                setRestaurant(response)
            })
            .catch(err => {
                setRestaurant(undefined)
            })
    }, [id])

    // Case 1: user viewing the About owns the restaurant
    if (restaurant !== undefined && ownedId !== undefined && ownedId === id) {
        console.log(restaurant)
        return (<>
            <div id="rest-img">
                <img className={"img-fluid center "+restaurant.id+"-logo"} alt="Logo" loading="lazy"></img>
                {getLogo(restaurant.id)}
            </div>
            <div className="card">
                <p className="text">{restaurant.description}</p>
            </div>
            <div id="rest-pop">
                Followers: {restaurant.followers} <br/>
                Likes: {restaurant.likes} <br/>
                You Own This Page 👑
            </div>
            <Gallery />
            <CommentForm />
        </>)
    }
    // Case 2: they are logged in, but do not own it
    else if (restaurant !== undefined && ownedId !== undefined) {
        return (<>
            <div id="rest-img">
                <img className={"img-fluid center "+restaurant.id+"-logo"} alt="Logo" loading="lazy"></img>
                {getLogo(restaurant.id)}
            </div>
            <div className="card">
                <p className="text">{restaurant.description}</p>
            </div>
            <div id="rest-pop">
                Followers: {restaurant.followers} <br/>
                Likes: {restaurant.likes} <br/>
                <LikeRestaurantButton className="btn btn-outline-light" restId={restaurant.id} />
                <FollowRestaurantButton className="btn btn-outline-light" restId={restaurant.id} />
            </div>
            <Gallery />
            <CommentForm />
        </>)
    }
    // Case 3: Not logged in (Like/follow buttons will redirect to Login? Or just not view them at all)
    else {
        return <>
            <Gallery />
            <div><a href={BASEURL+"/login"}>Log in</a> to Post a Comment!</div>
        </>
    }
}
export default About
/*
<div id="rest-img"><img className="img-fluid center" src="https://illustoon.com/photo/dl/4728.png"></img></div>
                <div id="rest-pop">
                Followers: {r.followers} <br/>
                Likes: {r.likes} <br/>
                You Own This Page 👑
                </div>
                <div className="card">
                <h2>About the Owner</h2>
                <img className="center" src={r.owner} width="260"></img>
                <p className="text">{r.description}</p>
                </div>
                <br/>
 */
/*
    <div class="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <div id="rest-img"><img class="img-fluid center" src="https://illustoon.com/photo/dl/4728.png"></div>
                    <div id="rest-pop">
                        Followers: 3000 <br>
                        Likes: 1000 <br>
                        You Own This Page 👑
                        <!--In i tag above, will use JS to handle liking so that likes count increases-->
                        <!--The i tag contains the actual like button-->
                    </div>
                    <div class="card">
                        <h2>About the Owner</h2>
                        <img class="center" src="https://www.aprio.com/wp-content/uploads/Restaurant-owners-options-for-growth-capital.jpg" width="260">
                        <p class="text">35 Year Old Restaurant Owner. Been a chef for 15 years!</p>
                    </div><br>
     */