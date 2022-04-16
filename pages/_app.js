import { createContext } from "react";
import "../styles/globals.css";

const StoreContext = createContext();

const StoreProvider=({children})=>{
const initialState={
  latLong:"",
  CoffeeStores:[],
}
// must return never forget to write return
  return (<StoreContext.Provider value={{state:initialState}}>
    {children}
  </StoreContext.Provider>)
} 

function MyApp({ Component, pageProps }) {
  return (
    <>
    <StoreProvider>
      <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}

export default MyApp;
