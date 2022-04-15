// Adapted from Lecture 11 code samples (src/components/Players/index.js)
import {useContext, useEffect, useState} from 'react'
import {searchContext} from '../../Contexts/searchContext';
import SearchBar from '../SearchBar';
import Button from '../Button';
import '../../App.css'
import './style.css'

const Cards = () => {
    const { restaurants } = useContext(searchContext)
    if (restaurants){
        return <div className="row row-cols-3">
            {restaurants.map(restaurant => (
                <div className="card g-col-6" key={restaurant.id}>
                    <div id={restaurant.id}>
                        <a href="/my-restaurant.html"><img className="img-fluid" src="/restify-backend/media/logos/${restaurant.logo}"></img></a>
                        <div className="rest-name">{restaurant.name}</div>
                        <div className="rest-addr">{restaurant.address} ({restaurant.postal_code})</div>
                        <div className="rest-followers">{restaurant.followers} Follower(s)</div>
                    </div>
                </div>
            ))}
        </div>
    }
    else {
        return ''
    }
}

const Results = () => {
    const {setRestaurants} = useContext(searchContext)
    const [query, setQuery] = useState({search:'', page:1})
    const [nextExists, setNextExists] = useState(1)

    useEffect(() => {
        var fetch_url = `http://localhost:8000/restaurants/search/${query.search}/?page=${query.page}`
        if (query.search === ""){
            // If the query is empty, we don't want double slashes in the URL, so we change the fetch URL here.
            fetch_url = `http://localhost:8000/restaurants/search/?page=${query.page}`
        }
        fetch(fetch_url)
            .then(response => response.json())
            .then(json => {
                setRestaurants(json.results)
                setNextExists(json.next)
            })
    }, [setRestaurants, query])

    return (<>
        <div className="container">
        <SearchBar title="Search for Restaurants"
               value={query.search}
               update={(value) => setQuery({search: value, page: 1})}
               placeholder="Name, address, or menu item"/>
        <Cards />
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {nextExists != null ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
        </div>
    </>)
}

export default Results;