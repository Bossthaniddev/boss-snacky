import { useState } from 'react';
import NavBar from './components/navBar/navBar';
import Promotions from './components/promotions/promotions';
import Products from './components/products/products';
import Footer from './components/footer/footer';

function App() {

  return (
    <>
      <NavBar/>
      <Promotions/>
      <Products/>
      <Footer/>
    </>
  )
}

export default App
