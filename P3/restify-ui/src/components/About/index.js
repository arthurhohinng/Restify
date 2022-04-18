import Gallery from "../Gallery";
import CommentForm from "../Comment";
import {useState, useEffect} from 'react';
import API from '../API';

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
    const [restaurant, setRestaurant] = useState({restaurant: []})

    useEffect(() => {
        var url = window.location.href;
        var restaurant_id = url.split("/")[4];
        fetch(`${API}/restaurants/${restaurant_id}/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                setRestaurant(json.results)
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [])
    // can all be retrieved from <int:pk>/ endpoint
    var url = window.location.href;
    var restaurant_id = url.split("/")[4];
    if ((restaurant.restaurant).length > 0) {
        return (<>
            {(restaurant.restaurant).map(r => {
                    <div id="rest-img"><img className="img-fluid center" src={getLogo(restaurant_id)}></img>
                    </div>
                    <div id="rest-pop">
                        Followers: {r.followers} <br/>
                        Likes: {r.likes} <br/>
                        You Own This Page 👑
                    </div>
                    <div className="card">
                        <h2>About the Owner</h2>
                        <h3>{r.owner}</h3>
                        <p className="text">{r.description}</p>
                    </div>
                    <br/>
                }
            )}
            <Gallery />
            <CommentForm />
        </>)
    }
    else { // no info for about
        return (<>
            <Gallery />
            <CommentForm />
        </>)
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