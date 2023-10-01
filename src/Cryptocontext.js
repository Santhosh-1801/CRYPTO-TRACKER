import React, { createContext, useContext, useEffect, useState } from 'react'


const Crypto=createContext();

const Cryptocontext = ({children}) => {

  const[currency,setCurrency]=useState("INR"); 
  const[symbol,setSymbol]=useState("₹");

  useEffect(()=>{
    if(currency === "INR"){
        setSymbol("₹");
    }
    else if(currency === "USD"){
        setSymbol("$");
    }
  },[currency])

  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,setSymbol}}>
        {children}
    </Crypto.Provider>
  )
}

export default Cryptocontext 


export const CryptoState=()=>{
    return useContext(Crypto)
}