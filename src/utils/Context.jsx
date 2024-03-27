import axios from './axios'; // Check if the path is correct
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const Context = (props) => {
    const [products, setProducts] = useState(
      JSON.parse(localStorage.getItem("products")) || null  
    ); // Corrected setProducts name

//     const getProducts = async () => {
//       try {
//         const { data } = await axios.get("/products"); 
//         setProducts(data); 
//       } catch (error) {
//         console.error(error); 
//       }
//     };
//  console.log(products);
//   useEffect(() => {
//     getProducts();
//   }, []);
    
  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
