import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BeerList from './components/BeerList';
import BeerDetails from "./components/BeerDetails"
import Navbar from "./components/Navbar"
import Redirect from "react-router-dom/es/Redirect"

function App() {
  return (
    <Router>
      <div>
        <Route path="*" exact component={Navbar}/>
        <Switch>
          <Route path="/brewhaus" exact component={BeerList}/>
          <Route path="/brewhaus/beer-details/:beerId" exact component={BeerDetails}/>
          <Redirect to='/brewhaus'/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
