import {Link, Outlet} from "react-router-dom";
import Footer from '../Footer';
import '../../App.css'

// TODO: Put proper Navbar HTML here
const Layout = () => {
    return <>
        <Outlet />
        <Footer />
    </>
}

export default Layout