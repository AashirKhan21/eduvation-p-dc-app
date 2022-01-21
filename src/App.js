import './App.css';
import React from 'react';
import Logo  from './Assets/eduvation.png';
import { Class } from './Components/Class';
import { Teacher } from './Components/Teacher';
import { Navigation } from './Components/Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <img src={Logo} alt="logo" className="logo"/>
      <h3 className="m-3 d-flex justify-content-center">
        Eduvation - School Management System
      </h3>
      <Navigation />
      <Switch>
        <Route exact path="/class" component={Class} />
        <Route exact path="/teacher" component={Teacher} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
