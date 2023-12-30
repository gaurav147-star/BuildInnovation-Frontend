// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Action creators
export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};
