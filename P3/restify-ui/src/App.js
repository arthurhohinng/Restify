import './App.css';
import {useState} from 'react';
import {searchContext} from './Contexts/searchContext';
import Router from './components/Routers';
import Footer from './components/Footer';
import ContactInfo from "./components/ContactInfo";
import Comment from "./components/Comment";
import EditRestaurant from "./components/EditRestaurant";

/**
 * Until we turn this into the front page of the site, can just add your components here
 * to test them out easily.
 */
function App() {
  const [restaurants, setRestaurants] = useState([])
  return (
    <div className="App">
      <searchContext.Provider value={{restaurants, setRestaurants}}>
        <Router />
      </searchContext.Provider>
    </div>
  );
}

export default App;
