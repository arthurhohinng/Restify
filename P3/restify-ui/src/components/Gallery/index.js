import API from '../API';
import {useState, useEffect} from "react";
import Button from '../Button';
import "./style.css";

const Gallery = (props) => {
    const [images, setImages] = useState({images:[], page:1})
    const [nextExists, setNextExists] = useState(0)
    var url = window.location.href;
    var id = (window.location.href).split("/")[4];

    useEffect(() => {
        fetch(`${API}/restaurants/${id}/gallery/?page=${images.page}`, {
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
                        <img src={image.image} height="64" width="64"></img>
                    </div>
                )}
            </div>


            {(images.page > 1) ? <Button value="prev" update={() => setImages({...images, page: images.page - 1})} /> : <></>}
            {nextExists != null ? <Button value="next" update={() => setImages({...images, page: images.page + 1})} /> : <></>}
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
