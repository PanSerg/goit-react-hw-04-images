import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, Window } from './Modal.Styled.jsx';

export const Modal = ({src, closeModal}) => {

  useEffect(() => {
    
    const onCloseEsc = e => {
      if (e.code === 'Escape') {
        closeModalWindow();
      }
    };

    window.addEventListener('keydown', onCloseEsc);
  });
  
    const closeModalWindow = () => {
      closeModal();
    };

    return (
      <Overlay onClick={closeModal}>
        <Window>
          <img src={src} alt="modalWindow" width="700" />
        </Window>
      </Overlay>
    );
};

Modal.propTypes = {
    src: PropTypes.string.isRequired
}