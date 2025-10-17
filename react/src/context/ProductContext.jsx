import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("");
  }
  return context;
};
