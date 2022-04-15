import {Link, Outlet} from "react-router-dom";
import Footer from '../Footer';
import '../../App.css'

// TODO: Put proper Navbar HTML here
const Layout = () => {
    return <>
        <nav>
            <Link to="/">Home </Link>
            <Link to="/search">Search</Link>
        </nav>
        <Footer />
 
        <Outlet />
    </>
}

export default Layout