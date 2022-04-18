import React from 'react'
import BASEURL from "../BASEURL"
import './style.css'

const PageNotFound = () => {

    return <>
    <br></br>
    <h1 id="err">404: Page Not Found!</h1>
    <br></br>
    <a id="returnurl" href={BASEURL}>Return to Home</a>
    </>
}

export default PageNotFound