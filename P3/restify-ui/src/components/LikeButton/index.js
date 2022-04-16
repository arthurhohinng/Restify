import {useState, useEffect} from 'react';
import API from '../API';

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(0)
    const [authorized, setAuthorized] = useState(0)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/accounts/${postId}/isliked/`, {
            method: 'GET',
            mode : 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => response.json())
            .then(json => {
                setLiked(json.results)
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [])
    // TODO: like button should change if the post is liked or not
    if (liked){
        return <></>
    }
    else {
        return <></>
    }
}

export default LikeButton;