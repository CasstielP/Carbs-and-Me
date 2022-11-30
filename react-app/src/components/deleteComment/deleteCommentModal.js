import React, { useState } from "react";
import DeleteCommentPage from ".";
import { Modal } from "../../context/Modal";

const DeleteCommentModal = ({comment}) => {
    const [showModal, setShowModal] = useState(false)

    return(
        <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentPage
           setShowModal={setShowModal}
           comment={comment}
           />
        </Modal>
      )}
        </>
    )
}


export default DeleteCommentModal
