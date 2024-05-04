import { useContext } from "react"
import Cart from "./Cart"
import Modal from "./Modal"
import LOGO from "/logo.jpg"
import { CartContext } from "../store/cart-context"
import { ModalContext } from "../store/modal-context"

export default function Header() {
    const { items } = useContext(CartContext);
    const { modalName, showCartModal, closeModal} = useContext(ModalContext);

    function handleClick() {
        showCartModal();
    }
    

    const numOfIteamInCart = items.reduce((numberOfItem, item) => {
        return numberOfItem + item.quantity;
    }, 0);

    return (
        <>
            <Modal open={modalName === "cart"} onClose={modalName==="cart"?() => closeModal():null}>
               <Cart />
            </Modal>
            <header id="main-header">
                <div id="title">
                    <img src={LOGO} alt="App logo iamge" />
                    <h1>Foodie Pie</h1>
                </div>
                <button className='text-button' onClick={handleClick} >Cart{numOfIteamInCart > 0 && ` (${numOfIteamInCart})`}</button>
            </header>
        </>
    )
}
