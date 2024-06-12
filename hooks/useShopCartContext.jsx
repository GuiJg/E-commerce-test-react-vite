import { useContext } from "react";

import { ShopCartContext } from "../contexts/ShopCartContext";

export const useShopCartContext = () => {
  const context = useContext(ShopCartContext);
  if (!context) {
    throw new Error("useShopCartContext must be used within a ShopCartContextProvider");
  }
  return context;
};
