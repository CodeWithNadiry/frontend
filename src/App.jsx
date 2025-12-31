import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import ModalContextProvider from "./context/ModalContext";
import ProductContextProvider from "./context/ProductContext";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <AppRouter />
          </CartContextProvider>
        </ProductContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
};

export default App;
