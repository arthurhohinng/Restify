import {Outlet} from "react-router-dom";
import Footer from '../Footer';
import './style.css'

// TODO: navbar component must be linked in here
const Layout = () => {
    return <>
        <div className="all-content">
            <div className="outlet-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    </>
}

export default Layout