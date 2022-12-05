import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import ModalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { IModalProps } from '../../utils/types';



const Modal: FC<IModalProps> = ({ title, children, onClose, opened }) => {

  React.useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    if (opened) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [opened])

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