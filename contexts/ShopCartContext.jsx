import { createContext, useState } from 'react';

const initialState = [];

export const ShopCartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ShopCartContextProvider = ({ children }) => {
  const [shopCartProducts, setShopCartProducts] = useState(initialState);

  return (
    <ShopCartContext.Provider value={{ shopCartProducts, setShopCartProducts }}>{children}</ShopCartContext.Provider>
  );
};