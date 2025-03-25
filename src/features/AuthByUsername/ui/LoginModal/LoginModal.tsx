import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal';
import { Loader } from '@/shared/ui/redesigned/Loader';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <ToggleFeatures
        feature="isAppRedesigned"
        on={
            <Modal
                className={classNames('', {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync onSuccess={onClose} />
                </Suspense>
            </Modal>
        }
        off={
            <ModalDeprecated
                className={classNames('', {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync onSuccess={onClose} />
                </Suspense>
            </ModalDeprecated>
        }
    />
);
