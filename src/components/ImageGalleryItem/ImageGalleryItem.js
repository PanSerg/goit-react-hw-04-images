import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";
import './GalleryItem.styled.css';

export const ImageGalleryItem = ({ largeImageURL, tags }) => {
  const [openModal, setOpenModal] = useState(false);
  const [src, setSrc] = useState('');

  const openModals = e => {
    setOpenModal(true);
    setSrc(e.target.src);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={largeImageURL}
          alt={tags}
          width="400px"
          onClick={openModals}
        />
      </li>
      {openModal === true && <Modal closeModal={closeModal} src={src} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
}