import React, { useState } from "react";
import DeleteVideoPage from ".";
import { Modal } from "../../context/Modal";


const DeleteVideoModal = ({ videoId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
      <div className="user-page-bt" onClick={() => setShowModal(true)}>Delete</div>
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
