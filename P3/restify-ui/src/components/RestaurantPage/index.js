import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useState, useEffect} from 'react';
import API from '../API';
import './style.css';
import PageNotFound from '../PageNotFound';
import Menu from '../Menu';
import EditRestaurant from '../FormPages/EditRestaurant';
import ContactInfo from "../ContactInfo";
import BlogPosts from "../BlogPosts";
import AddBlog from '../FormPages/AddBlog';
import AddEditMenu from '../FormPages/AddEditMenu';
import About from '../About';

/* If the user is logged in and stuff, do they own a restaurant? If so, which? */
const GetOwnedId = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [checkId, setCheckId] = useState(0)

    useEffect(() => {
        fetch(`${API}/accounts/restaurant/`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => { return response.json()})
            .then(response => setCheckId(response))
            .catch(err => {
                console.log("error: " + err)
        })
    }, [token])
    return checkId[0]
}

const RestaurantPage = () => {
    var id = parseInt((window.location.href).split("/")[4])
    var ownedId = GetOwnedId()
    const [showAddBlog, setShowAddBlog] = useState(false)

    const [restaurant, setRestaurant] = useState({})
    useEffect(() => {
        fetch(`${API}/restaurants/${id}/`)
            .then(response => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();})
            .then(response => {
                setRestaurant(response)
            })
            .catch(err => {
                setRestaurant(undefined)
            })

    }, [id])

    /* if ownedId === Id, render the restaurant as the owner. otherwise, render as normal */
    if ((restaurant !== undefined) && (ownedId !== undefined) && (ownedId === id)){
        return <>
        <h2 id="rest-page-title">{restaurant.name}</h2>
        <div className="container resto-container">
            <Tabs
                defaultActiveKey="about"
                transition={true}
                className="mb-3 tabholder"
            >
                <Tab tabClassName="infotab" eventKey="about" title="About">
                    <About />    
                </Tab>
                <Tab tabClassName="infotab" eventKey="menu" title="Menu">
                    <Menu owned={true} />
                </Tab>
                <Tab tabClassName="infotab" eventKey="blogposts" title="Blog Posts">
                    <button className="btn btn-success my-2 my-sm-0 btn-block form-control addbutton" onClick={() => setShowAddBlog(!showAddBlog)}>
                        Add a blog
                    </button>
                    <br/>
                    <br/>
                    {showAddBlog ?
                        <>
                            <AddBlog showAddBlog={showAddBlog} setShowAddBlog={setShowAddBlog}/>
                            <BlogPosts />
                        </>
                        :
                        <BlogPosts />}
                </Tab>
                <Tab tabClassName="infotab" eventKey="contact" title="Contact">
                    <ContactInfo />
                </Tab>
                <Tab tabClassName="infotab" eventKey="edit" title="Edit Restaurant">
                    <EditRestaurant />
                </Tab>
            </Tabs>
        </div>
        </>
    }
    else if (restaurant !== undefined){
        return <>
        <h2 id="rest-page-title">{restaurant.name}</h2>
        <div className="container resto-container">
            <Tabs
                defaultActiveKey="about"
                transition={true}
                className="mb-3 tabholder"
            >
                <Tab tabClassName="infotab" eventKey="about" title="About">
                    <About />   
                </Tab>
                <Tab tabClassName="infotab" eventKey="menu" title="Menu">
                    <Menu />
                </Tab>
                <Tab tabClassName="infotab" eventKey="blogposts" title="Blog Posts">
                    <BlogPosts />
                </Tab>
                <Tab tabClassName="infotab" eventKey="contact" title="Contact">
                    <ContactInfo />
                </Tab>
            </Tabs>
        </div>
        </>
    }
    return <PageNotFound />
}

export default RestaurantPage;