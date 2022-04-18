import API from '../API';
import Button from "../Button";
import {useState, useEffect} from "react";
import LikeButton from "../LikeButton";
import './style.css'

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

const BlogPost = () => {
    const [posts, setPosts] = useState({posts:[], page:1})
    const [nextExists, setNextExists] = useState(0)
    const [authorized, setAuthorized] = useState(0)
    // Get restaurant id
    var url = window.location.href;
    var restaurant_id = url.split("/")[4];

    useEffect(() => {
        fetch(`${API}/restaurants/${restaurant_id}/blogposts/?page=${posts.page}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                setPosts({...posts, posts: json.results})
                setNextExists(json.next)
                setAuthorized({authorized: true})
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [posts.page])

    if ((posts.posts).length > 0){
        return (<>
            <div className="feed-container">
                <br/>
                    <h2 id="title">Blogposts</h2>
                {(posts.posts).map(post =>
                    <div className="card blogpostcontent" id={post.id} key={post.id}>
                        <h2 className="posttitle">{post.title}</h2>
                        <h5 className="postinfo">Posted: {getDate(post.date)} by {post.author}</h5>
                        <img className="img-fluid blogpostimg" src={post.image} alt=""></img>
                            <div className="blog-content">
                                {post.body}
                            </div>
                            <LikeButton className="btn btn-outline-light restbloglikebtn" postId={post.id} />
                    </div>
                )}

                {(posts.page > 1) ? <Button value="prev" update={() => setPosts({...posts, page: posts.page - 1})} /> : <></>}
                {nextExists !== null ? <Button value="next" update={() => setPosts({...posts, page: posts.page + 1})} /> : <></>}
            </div>
        </>)
    }
    else {
        return (<>
            <h2>Blog Posts</h2>
            <h4><div style={{ textAlign: 'center'}}>No new blogposts yet.</div></h4>
            </>)
    }
}
export default BlogPost;