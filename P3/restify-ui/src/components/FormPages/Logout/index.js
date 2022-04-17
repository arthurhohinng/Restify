import "../style.css";
import BASEURL from '../../BASEURL';

const Logout = () => {
    const logoutHandler = () =>{
        localStorage.removeItem('token')
        window.location.href= BASEURL
    }

    return (
        <input className="btn btn-outline-success my-2 my-sm-0 btn-block" type="button" value="Logout" onClick={logoutHandler}/>
    )
}

export default Logout;