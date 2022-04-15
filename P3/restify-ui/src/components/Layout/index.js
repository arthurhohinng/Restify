import {Link, Outlet} from "react-router-dom";
import Footer from '../Footer';

// TODO: Put proper Navbar HTML here
const Layout = () => {
    return <>
        <nav>
            <Link to="/">Home (Calculator)</Link>
            <Link to="/search">Search</Link>
        </nav>

        <Outlet />
        <Footer />
    </>
}

export default Layout