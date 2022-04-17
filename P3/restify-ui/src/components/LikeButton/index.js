import {useState, useEffect} from 'react';
import API from '../API';

const LikeButton = (postId) => {
    const [liked, setLiked] = useState("false") // Set default button state to a like-button
    const [authorized, setAuthorized] = useState(0)

    // Effect for the initial loading of the buttons
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/blogpost/${postId.postId}/isliked/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setLiked(json[0])
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
        })
    }, [])

    const likePost = () => {
        // Send POST request to unlike the post
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/like/blogpost/${postId.postId}/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(x => {
                setLiked("true")
                setAuthorized({authorized: true})
                x = true    // to bypass no-unused-vars error
            })
            .catch(err => {
                console.log("error: " + err)
        })
    }

    const unlikePost = () => {
        // Send POST request to unlike the post
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/like/blogpost/${postId.postId}/`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(res => {
                if (res.status === 204){
                    setLiked("false")
                }
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
        })
    }

    if (liked === "true"){
        return <><button onClick={unlikePost}>Unlike</button></>
    }
    else {
        return <><button onClick={likePost}>Like ❤</button></>
    }
}

export default LikeButton;