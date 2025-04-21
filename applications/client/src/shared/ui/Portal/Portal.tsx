import React from 'react';
import { createPortal } from 'react-dom';
import { PortalProps } from './types';


export const Portal: React.FC<PortalProps> = ({ children }) => {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
        console.error('Контейнер для портала не найден!');
        return <>{children}</>;
    }

    return createPortal(children, modalRoot);
};