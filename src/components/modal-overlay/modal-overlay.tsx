import React from 'react';
import ModalOverlayStyles from './modal-overlay.module.css';

interface Props {
  children: JSX.Element;
  opened: Boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;

}

function ModalOverlay({ opened, onClose, children }: Props) {

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) onClose();
  }

  return (
    <div className={`${ModalOverlayStyles.overlay} ${opened && ModalOverlayStyles.popup_opened}` onClick={handleOverlayClick}}>
      { children }
    </div >
  );
}

export default ModalOverlay;