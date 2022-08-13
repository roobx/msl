import React from 'react';
import ModalOverlayStyles from './modal-overlay.module.css';

interface Props {
  children: JSX.Element;
  opened: Boolean;
  onClose: () => void;
}

function ModalOverlay({ opened, children, onClose }: Props) {

  function handleOverlayClick(evt: React.MouseEvent<HTMLDivElement>) {
    if (evt.target === evt.currentTarget) onClose();
  }

  return (
    <div className={`${ModalOverlayStyles.overlay} ${opened && ModalOverlayStyles.popup_opened}`} onClick={handleOverlayClick}>
      {children}
    </div >
  );
}

export default ModalOverlay;