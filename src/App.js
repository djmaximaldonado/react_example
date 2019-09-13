import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Movie from './components/movies/Movie';
import Titles from './components/titles/Titles';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';

// Tenemos el Provider de react-redux alrededor de lo que sería nuestra aplicación y le pasamos la store
// La store la importamos en la linea 4, y viene del archivo store.js que simplemente exporta el resultado de `createStore`
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/titles" component={Titles} />
            <Route path="/movie/:title" component={Movie} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>;
    </Provider>
  );
}

export default App;
