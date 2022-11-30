import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditVideoPage from ".";
import { Modal } from "../../context/Modal";
import * as videoActions from '../../store/video'
const EditVideoModal = ({ videoId }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const handleEditButton =() => {
    setShowModal(true)
    dispatch(videoActions.fetchSingleVideo(videoId))
  }
  return (
    <>
      <button onClick={handleEditButton}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditVideoPage
           setShowModal={setShowModal}
           videoId={videoId}
           />
        </Modal>
      )}
    </>
  );
};

export default EditVideoModal;
