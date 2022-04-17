import API from '../API';
import Button from "../Button";
import {useState, useEffect} from "react";
import LikeButton from "../LikeButton";


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

const BlogPost = () => {
    const [posts, setPosts] = useState({posts:[], page:1})
    // TODO: get restaurant as author of blogpost
    const [nextExists, setNextExists] = useState(0)
    const [authorized, setAuthorized] = useState(0)
    useEffect(() => {
        // Get restaurant id
        var url = window.location.href;
        var restaurant_id = url.split("/")[4];
        fetch(API + "/restaurants/" + restaurant_id + "blogposts/", {
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
            <div className="tab-pane fade show active" id="blogposts" role="tabpanel" aria-labelledby="blog-tab">
                <br/>
                    <h2>Blog Posts</h2>
                {posts.map(post =>
                    <div className="card" id={post.id}>
                        <h2 className="blog-title">{post.title}</h2>
                        <h3 className="blog-info">Posted: {getDate(post.date)} by {post.author}</h3>
                        <img className="img-fluid" src={post.image} alt=""></img>
                            <div className="blog-content">
                                {post.body}
                            </div>
                            <LikeButton className="btn btn-outline-light" postId={post.id} />
                    </div>
                )}

                {(posts.page > 1) ? <Button value="prev" update={() => setPosts({...posts, page: posts.page - 1})} /> : <></>}
                {nextExists != null ? <Button value="next" update={() => setPosts({...posts, page: posts.page + 1})} /> : <></>}
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