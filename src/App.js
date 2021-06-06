import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BeerList from './components/BeerList';
import BeerDetails from "./components/BeerDetails"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Router>
      <div>
        <Route path="*" exact component={Navbar}/>
        <Switch>
          <Route path="/brewhaus" exact component={BeerList}/>
          <Route path="/brewhaus/beer-details/:beerId" exact component={BeerDetails}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
