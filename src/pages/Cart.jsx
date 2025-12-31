import Modal from "../components/ui/modal/Modal";
import { useModalContext } from "../context/ModalContext";
import CartList from "../features/cart/components/cart-list/CartList";

const Cart = () => {
  const { modal, closeModal } = useModalContext();

  return (
    <Modal open={modal === "cart"} onClose={closeModal}>
      <CartList />
    </Modal>
  );
};

export default Cart;
