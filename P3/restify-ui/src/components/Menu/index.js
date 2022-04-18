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
/*
<div class="tab-pane fade" id="menu" role="tabpanel" aria-labelledby="menu-tab">
                    <!-- Menu is made using basic headings for each category and a table for the items and their prices -->
                    <h4 class="menu-category" style="margin-top:3%;"> Starters </h4>
                        <!-- Note: each menu row's price must belong to the "price" class -->
                        <table class="menu-items">
                            <tr>
                                <td>Cheesesticks
                                <span class="price">$7.99</span><br>
                                <i style="font-size: small;">Delicious bread sticks covered in cheese</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Jalapeno Poppers
                                <span class="price">$9.99</span><br>
                                <i style="font-size: small;">Spicy Jalapeno peppers stuffed with cheese</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Loaded Poutine
                                <span class="price">$12.99</span><br>
                                <i style="font-size: small;">Fries covered in gravy and cheese</i>
                                </td>
                            </tr>
                        </table>
                    <h4 class="menu-category"> Mains </h4>
                        <table class="menu-items">
                            <tr>
                                <td>Hamburger
                                <span class="price">$6.99</span><br>
                                <i style="font-size: small;">Classic beef burger with your choice of veggies</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Cheeseburger
                                <span class="price">$7.99</span><br>
                                <i style="font-size: small;">Hamburger with a new twist: your choice of cheese</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Veggieburger
                                <span class="price">$5.99</span><br>
                                <i style="font-size: small;">100% plant-based meat burger</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Hotdog
                                <span class="price">$6.99</span><br>
                                <i style="font-size: small;">Beef sausage wrapped in hot dog bread with mustard</i>
                                </td>
                            </tr>
                        </table>
                    <h4 class="menu-category"> Sides </h4>
                        <table class="menu-items">
                            <tr>
                                <td>French Fries
                                <span class="price">$3.99</span><br>
                                <i style="font-size: small;">Freshly cut potatoes in strips</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Cesar Salad
                                <span class="price">$6.99</span><br>
                                <i style="font-size: small;">Chicken mixed with lettuce, tomatoe, and any dressing</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Fried Pickles
                                <span class="price">$9.99</span><br>
                                <i style="font-size: small;">Deep fried pickles served with any sauce of your choice</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Sweet Potato Fries
                                <span class="price">$4.99</span><br>
                                <i style="font-size: small;">Freshly cut strips from sweet potatoes</i>
                                </td>
                            </tr>
                        </table>
                    <h4 class="menu-category"> Desserts </h4>
                        <table class="menu-items">
                            <tr>
                                <td>Chocolate Sundae
                                <span class="price">$6.99</span><br>
                                <i style="font-size: small;">Chocolate and vanilla ice cream served with a cherry on top</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Cheesecake (1 pc.)
                                <span class="price">$3.99</span><br>
                                <i style="font-size: small;">Delicious cake with fresh cheese filling</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Caramel Brownie
                                <span class="price">$2.99</span><br>
                                <i style="font-size: small;">Brownie filled with caramel sauce</i>
                                </td>
                            </tr>
                        </table>
                    <h4 class="menu-category"> Drinks </h4>
                        <table class="menu-items">
                            (Choice of Fountain Drink)
                            <tr>
                                <td>Small
                                <span class="price">$1.99</span><br>
                                <i style="font-size: small;">16 oz</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Medium
                                <span class="price">$2.99</span><br>
                                <i style="font-size: small;">21 oz</i>
                                </td>
                            </tr>
                            <tr>
                                <td>Large
                                <span class="price">$3.99</span><br>
                                <i style="font-size: small;">30 oz</i>
                                </td>
                            </tr>
                        </table>
                </div>
 */