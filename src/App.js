import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from "./components/Modal";

function App() {
  const cart = useSelector((store) => store.cart);
  const  modal = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  if (cart.isLoading)
    return <div>
      <h1>Loading...</h1>
    </div>
  return <main>
    {modal.isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;
