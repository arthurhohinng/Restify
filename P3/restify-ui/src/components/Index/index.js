import React from 'react'
import Results from '../Search'
import './style.css'

const Index = () => {
    return <>
        <img className="mainlogo" src={require("../../assets/restify.png")} alt="Restify" width="500px"></img>
        <Results />
    </>
}

export default Index