/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  modal: "",
  modalData: null,
  openModal(type) {},
  closeModal() {},
});

const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState("");
  const [modalData, setModalData] = useState(null)
  function openModal(type, data = null) {
    setModal(type);
    setModalData(data)
  }

  function closeModal() {
    setModal("");
    setModalData(null)
  }
  const ctxValue = {
    modal,
    modalData,
    openModal,
    closeModal,
  };
  return <ModalContext value={ctxValue}>{children}</ModalContext>;
};

export const useModalContext = () => useContext(ModalContext);
export default ModalContextProvider;
