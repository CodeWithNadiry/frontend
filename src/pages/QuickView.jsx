import Modal from "../components/ui/modal/Modal";
import { useModalContext } from "../context/ModalContext";
import Product from "./Product";
import styles from "./QuickView.module.css";

const QuickView = () => {
  const { modal, modalData, closeModal } = useModalContext();

  if (!modalData) return null; // Prevent rendering if no product selected

  return (
    <Modal
      variant="quick-view"
      open={modal === "quickview"}
      onClose={closeModal}
    >
      <div className={styles.quickViewCard}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={closeModal}>
          ✕
        </button>

        {/* Product Details */}
        <Product product={modalData} isModal />
      </div>
    </Modal>
  );
};

export default QuickView;