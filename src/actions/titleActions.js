import axios from 'axios';

export const emptyList = () => {
  return { type: 'EMPTY_TITLE_LIST' };
};

// Iniciamos la request, solo estamos pidiendo los datos.
// Es el momento para cargar un Loader o Spinner, y luego quitarlo cuando haya un Success o Error (que indica que la api devolvió los datos)
// Notar que no tenemos un `payload`, solamente tenemos `type`. Esto es porque no manejamos data en este caso.
export const titlesRequest = () => {
  return { type: 'FETCH_TITLE_REQUEST' };
};

// El Success indica que se completó la Request existosamente (es la vía exita del async/await de más abajo en este archivo)
// Es el momento en el que quitaríamos el Loader o Spinner, porque ya recibimos datos de la api.
// Notar que el `payload` corresponde a lo que nos interesa de lo que va a devolver la api.
// En este ejericio terminamos pasando un data que es de la forma [{id: 1, title: 'Batman'}, {id: 2, title: 'Spider-Man'}]
export const titlesRequestSuccess = data => {
  return {
    type: 'FETCH_TITLE_SUCCESS',
    payload: data
  };
};

// El Error corresponde a un error de la API, por lo cual esto se dispatchea en el `catch` de más abajo en este archivo.
// Notar que el `payload` corresponde al error que va a devolver la api.
export const titlesRequestError = error => {
  return {
    type: 'FETCH_TITLE_ERROR',
    payload: error
  };
};

// esta es la action a la cual hacemos dispatch en el evento onClick de nuestor botón.
// aquí se manejan el resto de las actions, definidas más arriba. Se unifica el flujo de esta manera.
export const loadTitles = movieName => async dispatch => {
  // Iniciamos la request
  // Podemos tomar acciones como mostar un Spinner o un Loader
  dispatch(titlesRequest());

  try {
    // Llamamos a la API. Hay dos opciones: se carga `response` con lo que nos devuelva, o se va al `catch` si hubo un error
    const response = await axios.get(
      `http://www.omdbapi.com?s=${movieName}&apikey=93064b0b`
    );

    // La api de omdb devuelve errores dentro del `data`, si no fue un error de servidor propiamentedicho
    // si es el caso que hay un error en en el campo `data`, dispatcheamos como si hubiera entrado en el catch y no continuamos con la ejecución (retornamos)
    // Este es el caso de 'Movie not found', que la api no lo devuelve como un error, sino como un 200 OK entonces no entra al catch.
    if (response.data.Error) {
      dispatch(titlesRequestError(response.data.Error));
      return;
    }

    // Si se cargó response entonces es un Success y dispatcheamos el Success con la data que queramos como `payload`: definida arriba en el caso de Success
    // `Search` viene dentro de `data` en la respuesta de la api`
    // La idea de iterar sobre el `Search` es que el reducer y finalmente el componente reciben los datos 'traducidos' a nuestro dominio, y no tienen que leer directamente de `Search`
    // De esa manera si la api cambia, no tenemos que cambiar la siguiente línea de código.
    // A nuestro Componente `Titles` no le interesa el campo `Title` con mayúscula como lo devuelve la api, ni el `imdbId` que también devuleve la API.
    // Le interesa solo recibir un `título` y un `id` para poder mostar la lista de títulos. Independientemente de dónde y cómo se obtuvieron.
    // Es simplemente una traducción para separar nuestro dominio de la implementación de la API.
    const apiResponseData = response.data.Search.map(data => ({
      id: data.imdbID,
      title: data.Title
    }));

    // Terminamos pasando una lista que es de la forma [{id: 1, title: 'Batman'}, {id: 2, title: 'Spider-Man'}]
    dispatch(titlesRequestSuccess(apiResponseData));
  } catch (error) {
    // Si hubo un error con la api, dispatcheamos la acción de Error, pasándole el error que esperábamos en el `payload`: definido en el caso de Error
    dispatch(titlesRequestError(error));
  }
};
