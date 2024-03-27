import React from 'react';
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);

  distinct_category = [...new Set(distinct_category)];

  return (
    <nav className="w-[15%] h-full bg-zinc-400 flex flex-col pt-5 items-center">
      <Link
        className="py-3 px-4 border border-rounded border-grey-200 text-white"
        to="/create"
      >
        Add new Products
      </Link>

      <hr className="my-3 w-[80%]" />
      <h1 className="text-2xl w-[80%]">Categorise</h1>
      <div className="w-[80%]">
        {distinct_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`} // Corrected to use query parameters
            className="flex items-center mt-2 mb-3"
          >
            <span className="rounded-full mr-2 inline-block w-[15px] h-[15px] bg-blue-100"></span>{" "}
            {""}
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
