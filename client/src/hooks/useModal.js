import { useState, useRef } from "react";

const useModal = ({ modalState }) => {
  if (!modalState) modalState = false;
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(modalState);

  return { modalRef, showModal, setShowModal };
};

export default useModal;
