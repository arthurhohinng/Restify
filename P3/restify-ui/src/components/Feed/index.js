import Button from '../Button';
import {useState, useEffect} from 'react';
import API from '../API';

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
            .then(response => response.json())
            .then(json => {
                setPosts(json.results)
                setNextExists(json.next)
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [])

    if (posts.length > 0){
        return (<>
            <div className="container">
            {posts.map(post => <div>{post.title}</div>)}

            {(posts.page > 1) ? <Button value="prev" update={() => setPosts({...posts, page: posts.page - 1})} /> : <></>}
            {nextExists != null ? <Button value="next" update={() => setPosts({...posts, page: posts.page + 1})} /> : <></>}
            </div>
        </>)
    }
    else {
        return (<>No new posts yet.</>)
    }
}

export default Feed;