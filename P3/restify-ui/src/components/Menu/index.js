import {useState, useEffect} from 'react';
import API from '../API';
import BASEURL from '../BASEURL';
import './style.css';
import Button from '../Button';

// make function to get all menu data and return it in a nested json object,
// where the key is the category, something along those lines
const Menu = () => {
    const [items, setItems] = useState({list:[], page:1})
    const [nextExists, setNextExists] = useState(0)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const url = window.location.href
        const restaurantId = url.split("/")[4]
        const token = JSON.parse(localStorage.getItem("token"))
        fetch(`${API}/restaurants/${restaurantId}/menu/?page=${items.page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            })
            .then(results => {
                if (results.status === 200)
                    return results.json()
                // else 
                //     window.location.href = `${BASEURL}/restaurant/${restaurantId}/`
            })
            .then(data => {
                setItems({...items, list: data.results})
                setNextExists(data.next)
                const categoryList = data.results.map(item => item.category)
                setCategories([... new Set(categoryList)])
                console.log(data)
            })
            .catch(err => {
                console.log("error:" + err)
            })
        }, [items.page])


    if (items.list.length > 0){
        return ( <>
                <h1>Menu</h1>
                {categories.map(category => 
                    <div key={category}> 

                        <h2 className="menu-category">{category}</h2> 
                        <table className="menu-items">
                            <tbody>
                            {items.list.filter(item => item.category == category ).map(item => 
                                <tr key={item.id}>
                                    <td>
                                        {item.name}
                                        <span className="price">{item.price}</span>
                                        <br/>
                                        <i>{item.description}</i>
                                    </td>
                                </tr>
                            )} 
                            </tbody>
                        </table>
                    </div> 
                )} 
                {(items.page > 1) ? <Button value="prev" update={() => setItems({...items, page: items.page - 1})} /> : <></>}
                    {nextExists !== null ? <Button value="next" update={() => setItems({...items, page: items.page + 1})} /> : <></>}
            </>
        )
    }
}
export default Menu
