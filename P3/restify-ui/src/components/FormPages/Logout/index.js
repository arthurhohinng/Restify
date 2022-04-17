import BASEURL from '../../BASEURL';

const Logout = () => {
    const logoutHandler = () =>{
        localStorage.removeItem('token')
        window.location.href= BASEURL
    }

    return (
        <div className="btn btn-outline-success my-2 my-sm-0 btn-block" onClick={logoutHandler}>Logout</div>
    )
}

export default Logout;