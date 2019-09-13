import React from 'react';
import { connect } from 'react-redux';
import { loadMovie } from '../../actions/movieActions';
import { addToCart } from '../../actions/cartActions'

import './Movie.css';


class Movie extends React.Component {

  componentDidMount(){
    this.props.load(this.props.match.params.title)
  }

  render() {
    const { title, year, director, poster, error, isLoading } = this.props;

    // Si está cargando, mostramos el loader (es solo un div con css que se muestra mientras `isLoading` es `true`)
    if (isLoading) {
      return <div className="loader"></div>;
    }

    return (
      <div className="movie-container">
        {error ? (
          <div className="movie-error-container">
            <p className="movie-error"> {error} </p>
          </div>
        ) : (
          <div>
            <div className="button-container">
              <button onClick={() => 
                this.props.add({title})
                }>
                Add to Cart
              </button>
            </div>
            <div className="movie">
              <div className="title">
                <p className="name">
                  {title} {year}
                </p>
              </div>

              <div className="subtitle">
                <p className="director">{director}</p>
              </div>

              <img src={poster} alt={`${title} ${year}`} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Como `props` nuestro componente va a recibir title, year, director, poster, isLoading y error
// del state de la store, vamos a estar leyendo `state.movie.data`
// hacemos el checkeo de que `data` exista, por si hubo un error.
const mapStateToProps = state => {
  const { data } = state.movies;

  return {
    movie: data || {},
    title: data && data.Title,
    year: data && data.Year,
    director: data && data.Director,
    poster: data && data.Poster,
    isLoading: state.movies.isLoading,
    error: state.movies.error
  };
};

// Como `props` nuestro componente vs a recibir `load`
// de las actions vamos a dispatchear `loadMovie` (definida en actionCreators.js) pasándole como parámetro el nombre del película deseada
const mapDispatchToProps = dispatch => ({
  load: movieName => dispatch(loadMovie(movieName)),
  add: movieName => dispatch(addToCart(movieName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie);
