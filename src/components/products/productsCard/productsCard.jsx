import React, { useState, useEffect } from 'react';
import { IoCartOutline, IoCart, IoQrCode, IoFastFoodOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import './productsCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../../actions/productAction';
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';

function ProductsCard({ product, sendDataPaySuccess }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "En");
  const [cartItems, setCartItems] = useState([]);
  const cartProductsData = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [updateCart, setUpdateCart] = useState(false);
  const totalPrice = cartProductsData.reduce((total, item) => total + item.unit_price, 0);
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("1-5099-700-4959-7");
  const [qrCodePay, setqrCodePay] = useState("sample");

  useEffect(() => {
    setUpdateCart(false);
    let storedCartProducts = JSON.parse(localStorage.getItem('addToCartProducts')) || [];
    dispatch(fetchCart(storedCartProducts));
  }, [updateCart, dispatch]);

  setInterval(() => {
    const newLang = localStorage.getItem('lang');
    if (newLang !== lang) {
      setLang(newLang);
    }
  }, 500); 

  const addToCart = (id, item) => {
    let storedCartProducts = JSON.parse(localStorage.getItem('addToCartProducts')) || [];

    if (!storedCartProducts.some((cartItem) => cartItem.id === id)) {
      const newAddToCart = [...storedCartProducts, item];
      localStorage.setItem('addToCartProducts', JSON.stringify(newAddToCart));
    } else {
      const newAddToCart = storedCartProducts.filter((cartItem) => cartItem.id !== id);
      localStorage.setItem('addToCartProducts', JSON.stringify(newAddToCart));
    }
    setUpdateCart(true);
  };

  const removeFromCart = (product) => {
    let storedCartProducts = JSON.parse(localStorage.getItem('addToCartProducts')) || [];
    const updatedCartProducts = storedCartProducts.filter(item => item.id !== product.id);
    setCartItems(updatedCartProducts);
    localStorage.setItem('addToCartProducts', JSON.stringify(updatedCartProducts));
    setUpdateCart(true);
  };

  const handleQR = () => {
    document.getElementById('card-total').showModal();
    const total = parseFloat(totalPrice);
    setqrCodePay(generatePayload(phoneNumber, { amount: total }));
  };

  const testErroe = () => {
    setPayError(true);
  }

  const testSuscess = () => {
    setPaySuccess(true);
    setPayError(false);
    sendDataPaySuccess(cartProductsData);
    setTimeout(() => {
      setPaySuccess(false);
      document.getElementById('card-detail-product').close();
      document.getElementById('card-total').close();
      localStorage.removeItem('addToCartProducts');
      setUpdateCart(true);
    }, 5000);
  }

  return (
    <div>
      <div className="relative product-card" style={{ backgroundImage: `url(${product.image_url})` }}>
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-box flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{lang === 'En' ? 'Out of Stock' : 'สินค้าหมด'}</span>
          </div>
        )}
      </div>
      <div className="flex justify-evenly mb-4">
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(product.id, product)} disabled={product.stock_quantity === 0}>
            {cartProductsData && cartProductsData.some((dataFav) => dataFav.id === product.id) ?
              <IoCart size={25} />
              :
              <IoCartOutline size={25} />
            }
        </button>
        <button className="btn btn-warning" onClick={() => document.getElementById('card-detail-product').showModal()} disabled={cartProductsData.length < 1 || product.stock_quantity === 0}><BsCashCoin size={20}/></button>
      </div>
      
      <dialog id="card-detail-product" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-2xl font-bold mb-4">{lang === 'En' ? 'Cart' : 'ตะกร้า'}</h1>
          {cartProductsData.length > 0 ? (
            <div className="overflow-x-auto h-96">
              <table className="table table-pin-rows">
                <thead>
                  <tr>
                    <th className="text-center">{lang === 'En' ? 'Product' : 'สินค้า'}</th>
                    <th>{lang === 'En' ? 'Name' : 'รายการ'}</th>
                    <th className="text-center">{lang === 'En' ? 'Price' : 'ราคา'}</th>
                    <th className="text-center">{lang === 'En' ? 'Qty' : 'จำนวน'}</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartProductsData.map((item, index) => (
                    <tr key={index}>
                      <td className="flex justify-center">
                        <img className="max-h-20" src={item.image_url} alt="" />
                      </td>
                      <td>{item.name_en}</td>
                      <td className="text-center font-bold">{item.unit_price} {lang === 'En' ? 'THB' : 'บาท'}</td>
                      <td className="text-center">1</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-error" 
                          onClick={() => removeFromCart(item)}>
                          {lang === 'En' ? 'Remove' : 'ยกเลิก'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No items in cart.</p>
          )}

          <div className="modal-action flex justify-center">
            <h1 className="text-2xl mr-4">{lang === 'En' ? 'Unit' : 'จำนวน'}: <span className="text-2xl font-bold mx-4">{cartProductsData.length}</span></h1>
            <h1 className="text-2xl mr-4">{lang === 'En' ? 'Total' : 'ราคารวม'}: <span className="text-2xl font-bold mx-4">{totalPrice}</span> {lang === 'En' ? 'THB' : 'บาท'}</h1>
          </div>
          <div className="modal-action flex justify-center">
            <button className="btn btn-primary w-40 text-2xl font-bold" onClick={handleQR}>{lang === 'En' ? 'Pay' : 'ชำระเงิน'}</button>
            <form method="dialog">
              <button className="btn btn-warning w-40 text-2xl font-bold">{lang === 'En' ? 'Close' : 'ปิด'}</button>
            </form>
          </div>
        </div>
      </dialog>
      <p className="text-2xl font-extrabold text-center">{product.unit_price} {lang === 'En' ? 'THB' : 'บาท'}</p>
      <p className="text-md font-bold text-center">{lang === 'En' ? product.name_en : product.name_th}</p>

      <dialog id="card-total" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-2xl font-bold mb-4">{lang === 'En' ? 'Cart' : 'ตะกร้า'}</h1>
          <div className="modal-action flex justify-center">
            <h1 className="text-2xl mr-4">{lang === 'En' ? 'Unit' : 'จำนวน'}: <span className="text-2xl font-bold mx-4">{cartProductsData.length}</span></h1>
            <h1 className="text-2xl mr-4">{lang === 'En' ? 'Total' : 'ราคารวม'}: <span className="text-2xl font-bold mx-4">{totalPrice}</span> {lang === 'En' ? 'THB' : 'บาท'}</h1>
          </div>


          {loading ? (
            <div className="flex flex-col mx-auto gap-4 w-56 my-20">
              <div className="skeleton h-56 w-56"></div>
            </div>
          ) : (
            paySuccess ? (
              <div className="flex justify-center my-20 box-qrcode">
                <IoFastFoodOutline size={200} />
              </div>
            ) : (
              <div className="flex justify-center my-20 box-qrcode">
                <QRCode value={qrCodePay} />
              </div>
            )
          )}

          {payError ? (
            <p className="text-center text-xl font-bold text-red-600">{lang === 'En' ? 'Please double-check your payment.' : 'โปรดตรวจสอบการชำระเงินอีกครั้ง'}</p>
          ) : (
            paySuccess ? (
              <>
                <p className="text-center text-xl font-bold text-warning">{lang === 'En' ? 'ENJOIN!' : 'มีความสุขกับอาหารจ้า'}</p>
                <p className="text-center text-xl font-bold text-warning">{lang === 'En' ? 'Please collect your food and drinks below.' : 'กรุณารับอาหารและเครื่องดื่มด้านล่าง'}</p>
              </>
              ) : (
                <p className="text-center text-xl font-bold text-warning">
                  {lang === 'En' ? 'Scan for pay' : 'โปรดสแกนเพื่อชำระเงิน'}
                </p>
              )
  
          )}
          <p className="text-center text-md font-bold text-primary">({lang === 'En' ? 'Button for test pay' : 'ปุ่มสำหรับทดสอบการชำระเงิน'})</p>
          <div className="modal-action flex justify-center">
            <button className="btn btn-primary w-40 text-2xl font-bold" onClick={testErroe}>{lang === 'En' ? 'Error' : 'ผิดพลาด'}</button>
            <button className="btn btn-warning w-40 text-2xl font-bold" onClick={testSuscess}>{lang === 'En' ? 'Success' : 'สำเร็จ'}</button>
            <form method="dialog">
              <button className="btn btn-warning w-40 text-2xl font-bold">{lang === 'En' ? 'Close' : 'ปิด'}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ProductsCard;
