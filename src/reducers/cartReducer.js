// Nuestra state inicial tiene los siguientes atributos, con sus respectivos valores por defecto.
const initialState = {items: [] };

// Importante! tener un `initialState` que define lo que vamos a estar guardando
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CART':
        console.log("adding to cart:" + action.payload.title )
        const toStore = { ...state, items: state.items.concat([action.payload.title]) }
        localStorage.setItem('cart', JSON.stringify(toStore))
        return toStore

    // Importante! siempre retornar por defecto el `state`
    default:
      return state;
  }
}
