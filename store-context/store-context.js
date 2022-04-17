import React, { createContext, useReducer } from 'react';


// context consumer
export const  StoreContext = createContext();

// action types for reducer
export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};
// reducer function
const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
// context provider
const  StoreProvider=({children})=>{
    
const initialState={
  latLong:"",
  coffeeStores:[],
}
// useReducer hook
const [state, dispatch] = useReducer(storeReducer, initialState);
// must write return never forget to write return
  return (<StoreContext.Provider value={{state,dispatch}}>
    {children}
  </StoreContext.Provider>)
} 

export default StoreProvider;