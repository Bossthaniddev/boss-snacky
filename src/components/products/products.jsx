import React, { useEffect, useState } from 'react';
import ProductsCard from './productsCard/productsCard';
import './products.css';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, fetchProduct } from '../../actions/productAction';

function Products() {
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "En");
  const [category, setCategory] = useState(localStorage.getItem("category") || "All");
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.product.products);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(fetchProduct());
    }, 2000);
  }, [category, dispatch]);

  setInterval(() => {
    const newLang = localStorage.getItem('lang');
    if (newLang !== lang) {
      setLang(newLang);
    }
  }, 500); 

  const filteredProducts = category === "All"
    ? productsData
    : productsData.filter(product => product.category === category.toLowerCase());

  const selectCategory = (nameCategory) => {
    setCategory(nameCategory);
    localStorage.setItem("category", nameCategory);
  };

  const sendDataPaySuccess = async (DataPaySuccess) => {
    DataPaySuccess.map(async (product) => {
      const updatedProduct = { ...product, stock_quantity: product.stock_quantity - 1 };
      await dispatch(editProduct(updatedProduct));
    });
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-5xl font-bold text-center mb-4">{lang === 'En' ? 'ENJOIN' : 'มีความสุขกับอาหาร'}!</h1>
      <div className="flex justify-center mb-4">
        <div className="join">
          <input
            className={`join-item text-md font-bold btn ${category === "All" ? "btn-error" : "btn-warning"}`}
            type="radio"
            name="options"
            aria-label={lang === 'En' ? 'All' : 'ทั้งหมด'}
            checked={category === "All"}
            onChange={() => selectCategory("All")}
          />
          <input
            className={`join-item text-md font-bold btn ${category === "Drinks" ? "btn-error" : "btn-warning"}`}
            type="radio"
            name="options"
            aria-label={lang === 'En' ? 'Drinks' : 'เครื่องดื่ม'}
            checked={category === "drinks"}
            onChange={() => selectCategory("drinks")}
          />
          <input
            className={`join-item text-md font-bold btn ${category === "Snacks" ? "btn-error" : "btn-warning"}`}
            type="radio"
            name="options"
            aria-label={lang === 'En' ? 'Snacks' : 'ขนม'}
            checked={category === "snacks"}
            onChange={() => selectCategory("snacks")}
          />
        </div>
      </div>

      {loading ? (
        <div className="products-grid p-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 w-52 p-4">
              <div className="skeleton h-60 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductsCard key={product.id} product={product} sendDataPaySuccess={sendDataPaySuccess}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
