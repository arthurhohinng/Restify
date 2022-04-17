import React from 'react'
import "./style.css"

const Footer = () => {

    // Footer adapted from https://mdbootstrap.com/docs/standard/navigation/footer/
    return <footer className="text-center bg-dark">
        <img src={require("../../assets/restify.png")} alt="Restify" width="70px"></img>
    </footer>
}

export default Footer