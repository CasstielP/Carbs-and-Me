import React, { useState } from "react";
import DeleteVideoPage from ".";
import { Modal } from "../../context/Modal";


const DeleteVideoModal = ({ videoId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteVideoPage
           setShowModal={setShowModal}
           videoId={videoId}
           />
        </Modal>
      )}
        </>
    )

}


export default DeleteVideoModal
