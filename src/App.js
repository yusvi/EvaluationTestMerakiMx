import React from 'react';
//import logo from './logo.svg';
import './App.css';


import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Home} from './components/Home'
import {Products} from './components/Products'
import {Customers} from './components/Customers'
import {Orders} from './components/Orders'

import {Navigation} from './components/Navigation'

function App() {
  return (

    <BrowserRouter>
      <div className="container">
    
        <Navigation></Navigation>
        
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/EvaluationTestMerakiMx" component={Home} />
          <Route path="/products" component={Products}  />
          <Route path="/customers" component={Customers}  /> 
          <Route path="/orders" component={Orders}  /> 
        </Switch>

      </div>
    </BrowserRouter>




  );
}

export default App;
