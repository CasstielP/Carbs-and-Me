import React, { useState } from "react";
import DeleteCommentPage from ".";
import { Modal } from "../../context/Modal";
import deletebtn from './delete.png'
const DeleteCommentModal = ({comment}) => {
    const [showModal, setShowModal] = useState(false)

    return(
        <>
      <div className="edit-cmt-col" onClick={() => setShowModal(true)}>
        <img className="edit-pic" src={deletebtn}></img>
        <div id='cmt-delete-txt'>Delete</div>
        </div>
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
