// Nuestra state inicial tiene los siguientes atributos, con sus respectivos valores por defecto.
// Notar que tenemos un atributo para cuando se está cargando lo que vino de la api.
// Y notar también que tenemos un atributo para mostrar los errores que vinieron de la api,
// los cuales podríamos mostrar luego con conditional rendering en nuestro componente: `error && <p> Ha ocurrido un error </>`
const initialState = {
  data: [],
  isLoading: false,
  error: null
};

// Importante! tener un `initialState` que define lo que vamos a estar guardando
export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    // Se inicia la request, ponemos isLoading en `true` para mostrar un Spinner
    case 'FETCH_TITLE_REQUEST':
      return { ...state, isLoading: true };

    // Recibimos la request con un OK, sacamos el isLoading porque ya cargó, no hay error (es null), y cargamos los datos del payload
    // En payload vendría lo que estaba en la `Search` que devolvió la api, traducido a nuestro dominio como un array de { id: NUMBER, title: STRING }
    case 'FETCH_TITLE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null
      };

    // Recibimos la request con un ERROR, sacamos el isLoading porque ya cargó, cargamos el error con lo que devolvió el payload, y nuestros datos son null porque solo tuvimos un `error`
    case 'FETCH_TITLE_ERROR':
      return {
        ...state,
        data: null,
        isLoading: false,
        error: action.payload
      };
    case 'EMPTY_TITLE_LIST':
      return initialState;
    // Importante! siempre retornar por defecto el `state`
    default:
      return state;
  }
}
