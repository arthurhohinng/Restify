import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Results from '../Search';
import '../../App.css'
import Layout from '../Layout';
import Register from '../FormPages/Register';
import Login from '../FormPages/Login';
import Profile from '../FormPages/Profile';
import AddRestaurant from '../FormPages/AddRestaurant';
import AddBlog from '../FormPages/AddBlog';
import AddEditMenu from '../FormPages/AddEditMenu';
import Feed from '../Feed';

const Router = () => {
    // TODO: index element should be index of the page
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Results />} />
                    <Route path="search" element={<Results />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="restaurant/add-restaurant" element={<AddRestaurant />} />
                    <Route path="restaurant/add-blogpost" element={<AddBlog />} />
                    <Route path="restaurant/edit-menu/" element={<AddEditMenu />} />
                    <Route path="feed" element={<Feed />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router