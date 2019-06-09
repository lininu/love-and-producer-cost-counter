import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './scss/main.scss';
import Boiling from './Gavin/Boiling';
import Summer from './ALL/19summer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Summer} />
          <Route path="/boiling" component={Boiling} />
        </div>
      </Router>
    );
  }
}

export default App;
