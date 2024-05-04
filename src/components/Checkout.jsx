
import { useContext } from 'react'
import Modal from './Modal'
import { CartContext } from '../store/cart-context'
import Input from './Input'
import { ModalContext } from '../store/modal-context'
import { useHttp } from '../hook/useHttp'
import Error from './Error'

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}


export default function Checkout() {
    const { items,clearCart } = useContext(CartContext);
    const { modalName, closeModal } = useContext(ModalContext);
    const { isLoading, error, data, sendRequest, clearData } = useHttp("http://localhost:3000/orders", requestConfig);

    function handleClose() {
        closeModal();
    }

    function handleFinsh(){
        closeModal();
        clearCart();
        clearData();
    }

    function handleSuubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(
            JSON.stringify({
                order: {
                    items: items,
                    customer: customerData
                }
            }
            )
        );
    }

    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    let action = (<>
        <button className="text-button" type="button" onClick={handleClose}>Close</button>
        <button className="button" type="submit" >order</button>
    </>);

    if (isLoading) {
        action = <span>Sending order data...</span>
    }
    if (data && !error) {
        return <Modal open={modalName === "checked"} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your was submit successfully.</p>
            <p className="modal-action">
                <button className="button" onClick={handleFinsh}>Close</button>
            </p>
        </Modal>
    }
    return (
        <Modal open={modalName === "checked"} onClose={handleClose}>
            <form onSubmit={handleSuubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {cartTotal}</p>
                <Input label="Full Name" id="name" type="text" />
                <Input label="E-Mail Address" id="email" type="email" />
                <Input label="Address" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="number" />
                    <Input label="City" id="city" type="text" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">
                    {action}
                </p>
            </form>
        </Modal>
    )
}
