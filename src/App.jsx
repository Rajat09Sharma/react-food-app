
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/cart-context";
import ModalContextProvider from "./store/modal-context";

function App() {
  return (

    <CartContextProvider>
      <ModalContextProvider>
        <Header />
        <Checkout />
        <Meals />
        <Footer />
      </ModalContextProvider>
    </CartContextProvider>

  );
}

export default App;
