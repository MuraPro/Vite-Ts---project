import { createContext } from 'react';

// Определяем типы для контекста
interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

// Создаем контекст
export const ModalContext = createContext<ModalContextType | undefined>(
    undefined,
);
