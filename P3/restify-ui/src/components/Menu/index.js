import {useState, useEffect} from 'react';
import API from '../API';
import BASEURL from '../BASEURL';
import './style.css';
import Button from '../Button';
import AddEditMenu from '../FormPages/AddEditMenu';

// make function to get all menu data and return it in a nested json object,
// where the key is the category, something along those lines
const Menu = ( {owned=false, setShowAddItem} ) => {
    const [items, setItems] = useState({list:[], page:1})
    const [nextExists, setNextExists] = useState(0)
    const [categories, setCategories] = useState([])
    const [edit, setEdit] = useState({state: false, id: 0})

    useEffect(() => {
        const url = window.location.href
        const restaurantId = url.split("/")[4]
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
                else 
                    window.location.href = `${BASEURL}/restaurant/${restaurantId}/`
            })
            .then(data => {
                setItems({...items, list: data.results})
                setNextExists(data.next)
                const categoryList = data.results.map(item => item.category)
                setCategories([... new Set(categoryList)])
            })
            .catch(err => {
                console.log("error:" + err)
            })
        }, [items.page])

    const deleteItem = (id) => {
        const token = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        formData.append('id', id)
        fetch(`${API}/restaurants/edit-menu/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
        .then(results => {
            if (results.status === 204){
                const newList = items.list.filter(item => item.id !== id)
                setItems({...items, list: newList})
            }
        })
        .catch(err => {
            console.log("error:" + err)
        })
    }


    if (items.list.length > 0){
        return ( <>
                    {edit.state ? <AddEditMenu title="Edit item" id={edit.id} setItems={setItems} items={items} setEdit={setEdit}/>
                    :
                    <></>}
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
                                        <span className="price">
                                            {item.price}
                                            {owned ? 
                                            <>
                                                <button className="btn" onClick={() => setEdit({state: !edit.state, id: item.id})}>Edit</button>
                                                <button className='btn' onClick={() => deleteItem(item.id)}>x</button> 
                                            </>:
                                            <></>}
                                        </span>
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
