import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Results from '../Search';
import '../../App.css'
import Layout from '../Layout';
import Register from '../Register';

const Router = () => {
    // TODO: index element should be index of the page
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Results />} />
                    <Route path="search" element={<Results />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router