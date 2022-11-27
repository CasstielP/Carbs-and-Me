import React, { useState } from "react";
import EditVideoPage from ".";
import { Modal } from "../../context/Modal";

const EditVideoModal = ({ videoId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
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
