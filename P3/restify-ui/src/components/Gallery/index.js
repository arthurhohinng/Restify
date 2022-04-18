import API from '../API';
import Button from "../Button";
import {useState, useEffect} from "react";
import LikeButton from "../LikeButton";

const Gallery = (props) => {
    const [images, setImages] = useState([])
    const [nextExists, setNextExists] = useState(0)
    const [authorized, setAuthorized] = useState(0)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        var url = window.location.href;
        var restaurant_id = url.split("/")[4];
        fetch(`${API}/restaurant/${restaurant_id}/gallery/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(response => response.json())
            .then(json => {
                setImages(json.results)
                setNextExists(json.next)
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [])
// when using map to display the images, use index in map, and if index is
    // a multiple of 3, (so index % 3 == 0), then add a new row
    // use what was done in search to do 3 per row
    if (images.length > 0) {
        return
            <div><h3>Photos</h3></div>
        <div className="row row-cols-3">
            {images.map(i => (
                <div className="card g-col-6" key={i.restaurant}>
                    <img className="img-fluid search-logo" src={i.image} alt=""></img>
                </div>
            ))}
        </div>
    }
    else {
        return (<>
            <div><h3>Photos</h3></div>
            <h4><div style={{ textAlign: 'center'}}>No new photos yet.</div></h4>
            </>)
    }
}
/*
<h3>Photos</h3>
                    <div class="row">
                        <div class="card2">
                            <div class="column">
                                <img class="img-fluid"src="https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/w_1280,c_limit/the-ultimate-hamburger.jpg"><br>
                            </div>
                        </div>
                        <div class="card2">
                            <div class="column">
                                <img class="img-fluid" src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/8/10/1/WU1407H_mexican-chocolate-sundae_s4x3.jpg.rend.hgtvcom.826.620.suffix/1473869103912.jpeg">
                            </div>
                        </div>
                        <div class="card2">
                            <div class="column">
                                <img class="img-fluid"src="https://www.thespruceeats.com/thmb/yjIQQytfjzaCRZ7tA6oBcXAapJc=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-make-homemade-french-fries-2215971-hero-01-02f62a016f3e4aa4b41d0c27539885c3.jpg">
                            </div>
                        </div>
                    </div><br>
                    */