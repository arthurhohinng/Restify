import React from 'react'
import "./style.css"

const Footer = () => {

    // Footer adapted from https://mdbootstrap.com/docs/standard/navigation/footer/
    return <footer className="text-center bg-dark">
        <div className="text-center py-3">© 2022 Copyright<img src="/assets/restify.png" alt="Restify" width="90px"></img>
        </div>
    </footer>
}

export default Footer