import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios';
import Loading from './Loading';
import { useEffect } from 'react';
import { ProductContext } from '../utils/Context';


const Details = () => {
  const navigate = useNavigate();
  const [products , setproducts ] = useContext(ProductContext)

  const [product , setproduct] = useState()

   

  const {id} = useParams();
  console.log(id);


  // const getsingleProduct = async () => {
    
  //   try {
  //     const { data } = await axios.get(`/products/${id}`); 
  //     setproduct(data)
     
  //   } catch (error) {
  //     console.error(error); 
  //   }
  // };

useEffect(() => {
  if (!product){
    setproduct(products.filter((p) => p.id === id)[0])
  }
  
}, []);

const ProductDeleteHandler = (id) => {
  const FilteredProducts = products.filter((p) => p.id !== id)
  setproducts(FilteredProducts);
  localStorage.setItem("products" , JSON.stringify(FilteredProducts));
  navigate("/");
}


  return ( product ? 
    <div className='w-[70%] h-full m-auto justify-between bg-zinc-500 flex items-center p-[10%]'>
        <img
        className='w-[50%] h-[70%] object-contain' 
        src={`${product.image}` }
        alt="" />

        <div className='content w-[40%]'>
            <h1 className='text-4xl'> {product.title}</h1>
            <h3 className=' text-zinc-400 my-5'>$ {product.price}</h3>
            <h2 className=' text-red-300 mb-3'>{product.category}</h2>
            <p className='mb-[7%]'>
            {product.description}
            </p>

            <Link to={`/edit/${product.id}`} className="mr-4 py-3 px-4 border border-rounded border-red-200 text-red ">Edit</Link>
            <button onClick={() => ProductDeleteHandler(product.id)} className=" py-3 px-4 border border-rounded border-green-200 text-green ">Delete</button>


        </div>
      
    </div> :( <Loading/>)
  )
}

export default Details
