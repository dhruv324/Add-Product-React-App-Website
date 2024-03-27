import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const Navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const ChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 1
    ) {
      alert("Each input must have at least 5 characters");
      return;
    }

    const updatedProduct = {
      id: id,
      title: product.title,
      image: product.image,
      category: product.category,
      price: product.price,
      description: product.description,
    };

    const updatedProducts = products.map((p) =>
      p.id === id ? updatedProduct : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    Navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className=" mb-5 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="Image link"
        name="image"
        className=" text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 "
        onChange={ChangeHandler}
        value={product.image}
      />
      <input
        type="text"
        placeholder="title"
        name="title"
        className=" text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={ChangeHandler}
        value={product.title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          name="category"
          className=" text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={ChangeHandler}
          value={product.category}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          className=" text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={ChangeHandler}
          value={product.price}
        />
      </div>
      <textarea
        name="description"
        onChange={ChangeHandler}
        placeholder="Enter product description here"
        value={product.description}
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="10"
      ></textarea>

      <div className="w-1/2">
        <button className="py-3 px-4 border border-rounded border-blue-200 text-blue-300 ">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
