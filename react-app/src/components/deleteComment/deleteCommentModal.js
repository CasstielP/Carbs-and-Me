import React, { useState } from "react";
import DeleteCommentPage from ".";
import { Modal } from "../../context/Modal";

const DeleteCommentModal = ({commentId}) => {
    const [showModal, setShowModal] = useState(false)

    return(
        <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentPage
           setShowModal={setShowModal}
           commentId={commentId}
           />
        </Modal>
      )}
        </>
    )
}


export default DeleteCommentModal
