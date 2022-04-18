import API from '../API';
import {useState, useEffect} from "react";

const Gallery = (props) => {
    const [images, setImages] = useState([])
    const [nextExists, setNextExists] = useState(0)

    useEffect(() => {

        var url = window.location.href;
        var restaurant_id = url.split("/")[4];
        fetch(`${API}/restaurant/${restaurant_id}/gallery/`, {
            method: "GET",
        }).then(response => response.json())
            .then(json => {
                console.log(json)
                setImages(json.results)
                setNextExists(json.next)
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [])

    if (images.length > 0) {
        return <>
            <div><h3 h3 className="title">Photos</h3></div>
            <div className="row row-cols-3">
            </div>
        </>
    }
    else {
        return (<>
            <div><h3 className="title">Photos</h3></div>
            <h4><div style={{ textAlign: 'center'}}>No Photos yet.</div></h4>
            </>)
    }
}

export default Gallery;
