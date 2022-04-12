import './App.css';
import {useState} from "react";
import {searchContext} from "./Contexts/searchContext";
import Footer from './components/Footer';
import Results from "./components/Search";

/**
 * Until we turn this into the front page of the site, can just add your components here
 * to test them out easily.
 */
function App() {
  const [restaurants, setRestaurants] = useState([])
  return (
    <div className="App">
      <searchContext.Provider value={{restaurants, setRestaurants}}></searchContext.Provider>
      <Results />
      <Footer />
    </div>
  );
}

export default App;
