// Adapted from Lecture 11 code samples (src/components/Players/index.js)
import {useContext, useEffect, useState} from 'react'
import {searchContext} from '../../Contexts/searchContext';
import Input from '../Input';
import Button from '../Button';

const Cards = () => {
    const { restaurants } = useContext(searchContext)
    // TODO: copy bootstrap card html to here
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Followers</th>
            </tr>
        </thead>
        <tbody>
        {restaurants.map(restaurant => (
            <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.postal_code}</td>
                <td>{restaurant.followers}</td>
            </tr>
        ))}
        </tbody>
    </table>
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
                setRestaurants(json.data)
                setNextExists(json.next)
            })
    }, [setRestaurants, query])

    return (<>
        <Input title="Search by name, address, or food"
               value={query.search}
               update={(value) => setQuery({search: value, page: 1})}/>
        <Cards />
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {nextExists != null ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    </>)
}

export default Results;