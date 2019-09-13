export const addToCart = data => {
  console.log("entro al action")
  return {
    type: 'ADD_CART',
    payload: data
  };
};


export const loadCart = () => {
  return {};
};
