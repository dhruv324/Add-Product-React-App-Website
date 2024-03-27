import React, { Profiler, useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";  
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext); 
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(products);

  const getproductcategory= async () => {
    try {
      const { data } = await axios.get(`/products/category/${category} `);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if(!filteredProducts || category == "undefined")
  setfilteredProducts(products);
if( category != "undefined") {

  // getProductsByCategory()
  setfilteredProducts(products.filter((p) => p.category == category));
}
} , [category , products]);
  



 return products ? (
  <>
    <Nav />
    <div className="w-[85%] h-full bg-zinc-200 p-10 py-[5%] flex flex-wrap ">
      {filteredProducts &&
        filteredProducts.map((p, i) => (
          <Link
            key={p.id}
            to={`/details/${p.id}`}
            className="mr-3 mb-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center"
          >
            <div
              className="hover:scale-110 mb-3 w-full bg-contain bg-no-repeat h-[80%] bg-center"
              style={{ backgroundImage: `url(${p.image})` }}
            ></div>
            <h1 className="hover:text-blue-300">{p.title}</h1>
          </Link>
        ))
       }
    </div>
  </>
): (
  <Loading />
)
}


export default Home;
