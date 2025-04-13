import { useEffect, useState, useRef } from "react";

const useModal = ({ modalState = false } = {}) => {
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(modalState);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return { modalRef, showModal, setShowModal };
};

export default useModal;
