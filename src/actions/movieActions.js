import axios from 'axios';

// Iniciamos la request, solo estamos pidiendo los datos.
// Es el momento para cargar un Loader o Spinner, y luego quitarlo cuando haya un Success o Error (que indica que la api devolvió los datos)
// Notar que no tenemos un `payload`, solamente tenemos `type`. Esto es porque no manejamos data en este caso.
export const movieRequest = () => {
  return { type: 'FETCH_MOVIE_REQUEST' };
};

// El Success indica que se completó la Request existosamente (es la vía exita del async/await de más abajo en este archivo)
// Es el momento en el que quitaríamos el Loader o Spinner, porque ya recibimos datos de la api.
// Notar que el `payload` corresponde a lo que nos interesa de lo que va a devolver la api.
export const movieRequestSuccess = data => {
  return {
    type: 'FETCH_MOVIE_SUCCESS',
    payload: data
  };
};

// El Error corresponde a un error de la API, por lo cual esto se dispatchea en el `catch` de más abajo en este archivo.
// Notar que el `payload` corresponde al error que va a devolver la api.
export const movieRequestError = error => {
  return {
    type: 'FETCH_MOVIE_ERROR',
    payload: error
  };
};

// esta es la action a la cual hacemos dispatch en el evento onClick de nuestor botón.
// aquí se manejan el resto de las actions, definidas más arriba. Se unifica el flujo de esta manera.
export const loadMovie = movieName => async dispatch => {
  // Iniciamos la request
  // Podemos tomar acciones como mostar un Spinner o un Loader
  dispatch(movieRequest());

  try {
    // Llamamos a la API. Hay dos opciones: se carga `response` con lo que nos devuelva, o se va al `catch` si hubo un error
    const response = await axios.get(
      `http://www.omdbapi.com?t=${movieName}&apikey=93064b0b`
    );

    // La api de omdb devuelve errores dentro del `data`, si no fue un error de servidor propiamentedicho
    // si es el caso que hay un error en en el campo `data`, dispatcheamos como si hubiera entrado en el catch y no continuamos con la ejecución (retornamos)
    if (response.data.Error) {
      dispatch(movieRequestError(response.data.Error));
      return;
    }

    // Si se cargó response entonces es un Success y dispatcheamos el Success con la data que queramos como `payload`: definida arriba en el caso de Success
    dispatch(movieRequestSuccess(response.data));
  } catch (error) {
    // Si hubo un error con la api, dispatcheamos la acción de Error, pasándole el error que esperábamos en el `payload`: definido en el caso de Error
    dispatch(movieRequestError(error));
  }
};
