import API from '../API';
import {useState, useEffect} from "react";
import Button from '../Button';
import './style.css'
import AddComment from '../FormPages/AddComment';

const Comment = () => {
    const [comments, setComments] = useState({comments:[], page:1})
    const [nextExists, setNextExists] = useState(0)
    var id = (window.location.href).split("/")[4];

    useEffect(() => {
        fetch(`${API}/restaurants/${id}/comments/?page=${comments.page}`, {
            method: "GET",
        }).then(response => response.json())
            .then(json => {
                console.log(json.results)
                setComments({...comments, comments: json.results})
                setNextExists(json.next)
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [comments.page])

    if ((comments.comments).length > 0) {
        return <>
            <h3 className="title">Comments</h3>
            <div className="row row-cols-3 all-comments">
                {(comments.comments).map((c, index) =>
                    <div className="restcommenttext comment" key={index}>
                        {c.text}
                    </div>
                )}
            </div>
            {(comments.page > 1) ? <Button value="prev" update={() => setComments({...comments, page: comments.page - 1})} /> : <></>}
            {nextExists != null ? <Button value="next" update={() => setComments({...comments, page: comments.page + 1})} /> : <></>}
            <br></br>
            <AddComment comments={comments} setComments={setComments}/>
        </>
    }
    else {
        return (<>
            <div><h3 className="title">Comments</h3></div>
            <h4><div style={{ textAlign: 'center'}}>No Comments yet.</div></h4>
            <AddComment comments={comments} setComments={setComments}/>
            </>)
    }
}

export default Comment;
