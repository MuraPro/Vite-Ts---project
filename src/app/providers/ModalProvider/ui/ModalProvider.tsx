import { useState, ReactNode, useCallback } from 'react';
import { ModalContext } from '../lib/ModalContext';

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);
    const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <ModalContext.Provider
            value={{ isModalOpen, openModal, closeModal, toggleModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};
