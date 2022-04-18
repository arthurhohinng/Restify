import Button from '../Button';
import LikeButton from '../LikeButton'
import {useState, useEffect} from 'react';
import API from '../API';
import './style.css';
import Login from '../FormPages/Login'

/**
 * Function to parse the datetime object returned by our API into a better format.
 */
function getDate(dateString){
    var date = new Date(dateString)
    var currDate = new Date()
    if (date.getDate() === currDate.getDate() && date.getMonth() === currDate.getMonth() && date.getFullYear() === currDate.getFullYear()){
        // If post was today, only output the time
        return date.getHours()+":"+date.getMinutes()
    }
    // Otherwise, output the date (no time)
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
}

/**
 * Function to call our API and retrieve the URL of the restaurant logo 
 * with the specified restaurant ID.
 */
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

const Feed = () => {
    const [posts, setPosts] = useState({posts:[], page:1})
    // TODO: get restaurant as author of blogpost
    const [nextExists, setNextExists] = useState(0)
    const [authorized, setAuthorized] = useState(0)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/feed/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => {
                if (!response.ok){throw new Error(response.status)} 
                else {return response.json()}})
            .then(json => {
                setPosts(json.results)
                setNextExists(json.next)
                setAuthorized(true)
            })
            .catch(err => {
                setAuthorized(false)
            })
    }, [])

    if (authorized && posts.length > 0){
        return (<>
            <div><h1 id="title">Restaurant Feed</h1></div>
            <div className="container feed-container">
                {posts.map(post => 
                    <div className="media d-flex" key={post.id}>
                        <div className="me-3 rounded-circle">
                            <a href={API+"/restaurants/"+post.restaurant+"/"}>
                                <img className={"media-object "+post.restaurant+"-logo"} height="64" width="64" alt="Logo" loading="lazy"></img>
                                {getLogo(post.restaurant)}
                            </a>
                        </div>
                        <div>
                            <h4><span className="name">{post.author}</span> Uploaded a Blogpost
                            <span className="float-end">{getDate(post.date)}</span>
                            </h4>
                                <img className="img-fluid" src={post.image} alt=""></img>
                                <h5 className="posttitle">{post.title}</h5>
                                <div>{post.body}</div>
                                <br></br>
                                <Button className="btn btn-outline-light" value="View Full Post" update={() => ({})} />
                                <div id={post.id+"-like-btn"}></div>
                                <LikeButton className="btn btn-outline-light" postId={post.id} />
                        </div>
                    </div>
                )}

                {(posts.page > 1) ? <Button value="prev" update={() => setPosts({...posts, page: posts.page - 1})} /> : <></>}
                {nextExists != null ? <Button value="next" update={() => setPosts({...posts, page: posts.page + 1})} /> : <></>}
            </div>
        </>)
    }
    else {
        return <Login />
    }
}

export default Feed;