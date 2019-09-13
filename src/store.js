import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import moviesReducer from './reducers/moviesReducer';
import titlesReducer from './reducers/titlesReducer';
import cartReducer from './reducers/cartReducer';

// Combinamos nuestros dos reducers, en uno solo, que tiene dos keys: `titles` y `movies`
// La forma de acceder entonces al state en un componente desde mapStateToProps sería por ejemplo: `state.titles.data`, o `state.movies.data`
// porque si nos fijamos en cada reducer, están compuestos de la siguiente manera: { data: {}, isLoading: false, error: null }
const rootReducer = combineReducers({
  titles: titlesReducer,
  movies: moviesReducer,
  cart: cartReducer
});

// Creamos la Store. Le pasamos nuestro reducer.
// Indicamos que el middleware que vamos a estar usando es `thunkMiddleware`
export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
