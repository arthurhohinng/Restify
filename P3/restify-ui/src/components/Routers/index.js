import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Results from '../Search';
import Footer from '../Footer';
import Layout from '../Layout';

const Router = () => {
    // TODO: index element should be index of the page
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Footer />} />
                    <Route path="search" element={<Results />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router