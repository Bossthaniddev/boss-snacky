import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo/logoboss.png';
import { useSelector } from 'react-redux';

function NavBar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "autumn");
  const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "En");
  const cartProductsData = useSelector((state) => state.cart.cartItems);

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("coffee");
    } else {
      setTheme("autumn");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLang = (e) => {
    if (e.target.checked) {
      setLang("Th");
    } else {
      setLang("En");
    }
  };

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const openCart = () => {
    if (cartProductsData.length > 0) {
      document.getElementById('card-detail-product').showModal();
    }
  }

  return (
    <>
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 shadow-xl">
      <div className="flex-1">
        <div className="w-10">
          <img alt="logo" src={Logo} />
        </div>
      </div>
      <div className="flex-none">
        <div className="btn btn-ghost btn-circle mr-2" onClick={openCart}>
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="badge badge-sm badge-warning  indicator-item">{cartProductsData.length}</span>
          </div>
        </div>

        <label className="cursor-pointer grid place-items-center mr-5">
          <input 
            type="checkbox" 
            value="synthwave" 
            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"  
            onChange={handleTheme} 
            checked={theme === "autumn" ? false : true}
          />
          <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>

        <label className="swap swap-rotate">
          <input type="checkbox" onChange={handleLang} checked={lang === "En" ? false : true} />
          <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="300" height="200"><rect width="1200" height="800" fill="#A51931"/><rect y="160" width="1200" height="160" fill="#F4F5F8"/><rect y="320" width="1200" height="160" fill="#2D2A4A"/><rect y="480" width="1200" height="160" fill="#F4F5F8"/><rect y="640" width="1200" height="160" fill="#A51931"/></svg>
          <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="300" height="150"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#a)"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="10"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="6"/><path d="M0,15 H60 M30,0 V30" stroke="#FFF" strokeWidth="10"/><path d="M0,15 H60 M30,0 V30" stroke="#C8102E" strokeWidth="6"/><clipPath id="a"><path d="M30,15 H60 V30 H0 V15 H30 Z"/></clipPath></svg>
        </label>
      </div>
    </div>
    </>
  );
}

export default NavBar;
