import React from 'react';
import ReactDOM from 'react-dom';
import ModalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ModalProps {
  title: String;
  children: JSX.Element;
  onClose: () => void;
  opened: Boolean;
}


function Modal({ title, children, onClose, opened }: ModalProps) {

  return ReactDOM.createPortal(
    <ModalOverlay opened={opened} onClose={onClose}>
      <div className={`p-10 pb-15 ${ModalStyles.modal}`}>
        <p className="text text_type_main-large">{title}</p>
        <button onClick={onClose} className={`${ModalStyles.close}`}></button>
        <div className={`${ModalStyles.container}`}>
          {children}
        </div>

      </div>
    </ModalOverlay>
    ,
    document.getElementById("react-modals")!
  );
}

export default Modal;