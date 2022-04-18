import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Results from '../Search';
import '../../App.css'
import Layout from '../Layout';
import Register from '../FormPages/Register';
import Login from '../FormPages/Login';
import Profile from '../FormPages/Profile';
import AddRestaurant from '../FormPages/AddRestaurant';
import Feed from '../Feed';
import RestaurantPage from '../RestaurantPage'
import PageNotFound from '../PageNotFound'
import Index from '../Index'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="search/" element={<Results />} />
                    <Route path="register/" element={<Register />} />
                    <Route path="login/" element={<Login />} />
                    <Route path="profile/" element={<Profile />} />
                    <Route path="profile/edit/" element={<Profile isEdit={true}/>} />
                    <Route path="restaurant/:id/" element={<RestaurantPage />} />
                    <Route path="restaurant/add-restaurant/" element={<AddRestaurant />} />
                    <Route path="feed/" element={<Feed />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router