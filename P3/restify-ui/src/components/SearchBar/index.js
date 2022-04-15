// From Lecture 11 code (src/components/Input/index.js)
import React from 'react';
import '../../App.css'
import "./style.css"

// This component is to be different from the inputs used in forms
class SearchBar extends React.Component {
    render(){
        const {title, update, value, placeholder} = this.props
        return <>
            <div className="search">
                <h1 className="title">{title}</h1>
                <form className="d-flex flex-column align-items-center search-bar">
                    <input className="form-control me-2"
                        type="search"
                        placeholder={placeholder}
                        aria-label="Search"
                        value={value}
                        onChange={event => update(event.target.value)}
                    />
                </form>
            </div>
        </>
    }
}

export default SearchBar;
