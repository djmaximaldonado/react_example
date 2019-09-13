import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";

import { loadTitles, emptyList } from '../../actions/titleActions';
import { loadMovie } from '../../actions/movieActions';

import './Titles.css';
import '../Loader.css';

class Titles extends React.Component {
  // Manejamos un state privado para controlar el campo de texto, lo inicializamos con Batman
  state = { movieName: '' };

  componentDidMount() {
    this.props.emptyTitleList();
  }

  render() {
    // Obtenemos por props lo que obtuvimos del mapStateToProps y mapDispatchToProps
    const { titles, isLoading, error } = this.props;

    return (
      <div>
        <div className="title-search">
          <input
            type="text"
            value={this.state.movieName}
            onChange={e => this.setState({ movieName: e.target.value })}
          />
          <button onClick={() => this.props.loadTitles(this.state.movieName)}>
            Buscar
          </button>
        </div>

        {error ? (
          <div className="title-error-container">
            <p className="title-error"> {error} </p>
          </div>
        ) : (
          <div className="titles">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <ul className="list">
                {/* iteramos los titulos que obtuvimos por props, y leímos del estado usando el mapStateToProps */}
                {/* en el reducer, definimos que los titulos iban a ser de la forma { id: NUMBER, title: STRING } */}
                {titles.map(data => (
                  <li key={data.id} className="element">
                    <Link to={`/movie/${data.title}`}>
                      {data.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

// Como `props` nuestro componente va a recibir title, year, director, poster, isLoading y error
// del state de la store, vamos a estar leyendo `state.titles.data`
// hacemos el checkeo de que `data` exista, por si hubo un error.
const mapStateToProps = state => {
  return {
    titles: state.titles.data,
    isLoading: state.titles.isLoading,
    error: state.titles.error
  };
};

// Como `props` nuestro componente vs a recibir `load`
// de las actions vamos a dispatchear `loadTitles` (definida en actionCreators.js) pasándole como parámetro el nombre del película deseada
const mapDispatchToProps = dispatch => ({
  loadMovie: movieName => dispatch(loadMovie(movieName)),
  loadTitles: movieName => dispatch(loadTitles(movieName)),
  emptyTitleList: () => dispatch(emptyList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Titles);
