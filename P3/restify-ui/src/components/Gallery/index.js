import API from '../API';
import {useState, useEffect} from "react";

const Gallery = (props) => {
    const [images, setImages] = useState({images:[], page:1})
    const [nextExists, setNextExists] = useState(0)
    var url = window.location.href;
    var id = (window.location.href).split("/")[4];

    useEffect(() => {
        fetch(`${API}/restaurants/${id}/gallery/`, {
            method: "GET",
        }).then(response => response.json())
            .then(json => {
                setImages({...images, images: json.results})
                setNextExists(json.next)
            })
            .catch(err => {
                console.log("error: " + err)
            })
    }, [images.page])

    if ((images.images).length > 0) {
        return <>
            <h3 className="title">Photos</h3>
            <div className="row row-cols-3">
                {(images.images).map(image => 
                    <div className="galleryimg" key={image.id}>
                        <img src={image.image}></img>
                    </div>
                )}
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
