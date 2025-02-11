import { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import { Portal } from '../../redesigned/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
    modalPersonallClass?: string;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy, modalPersonallClass } =
        props;

    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={classNames(cls.modal, mods, [
                    className,
                    'app_modal',
                ])}
            >
                <Overlay onClick={close} />
                <div className={`${cls.modal__content} ${modalPersonallClass}`}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
