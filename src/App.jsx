import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
//
import { Route, Link, BrowserRouter as Router, NavLink, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTutorial from './component/add-tutorial.component';
import Tutorial from './component/tutorial.component';
import TutorialsList from './component/tutorials-list.component';
import NotFound from './component/notfound-page.component';

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">Webbies </a>
            <li style={{listStyleType:'none'}} className="nav-item">
              <NavLink to={"/tutorials"} className="nav-link" activeStyle={{color: 'magenta'}}>Tutorials</NavLink>
            </li>
            <li style={{listStyleType:'none'}} className="nav-item">
              <NavLink to={"/add"} className="nav-link" activeStyle={{color: 'magenta'}}>Add</NavLink>
            </li>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={['/', '/tutorials']} component={TutorialsList}/> 
              <Route exact path='/add' component={AddTutorial} />
              <Route path='/tutorials/:id' component={Tutorial}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
