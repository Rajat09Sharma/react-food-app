import { useContext } from 'react'
import { CartContext } from '../store/cart-context'
import { ModalContext } from '../store/modal-context';
import CartItem from './CartItem';

export default function Cart() {
    const { items, removeItem, addItem } = useContext(CartContext);
    const { closeModal,showCheckoutModal } = useContext(ModalContext);

    function handleClose() {
        closeModal();
    }

    function handleGoToCheckout(){
        showCheckoutModal();
    }

    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Your order</h2>
            <ul>
                {items.map(item => {
                    return <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onRemove={() => removeItem(item.id)}
                        onAdd={() => addItem(item)}
                    />
                })}
            </ul>
            {cartTotal === 0 ? <p>Empty cart</p> : <p className="cart-total">Total Price: ₹{cartTotal}</p>}
            <p className="modal-actions">
                <button className="text-button" onClick={handleClose}>Close</button>
                {cartTotal > 0 && <button className='button' onClick={handleGoToCheckout}>Go to Checkout</button>}
            </p>

        </div>
    )
}
