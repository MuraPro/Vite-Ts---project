import { useContext } from "react";
import { ModalContext } from "./ModalContext";

interface ModalProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

// Хук для использования контекста
export const useModal = (): ModalProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
