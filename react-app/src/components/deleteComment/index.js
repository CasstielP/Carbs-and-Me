import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'

const DeleteCommentPage = ({commentId, setShowModal}) => {
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false)
        dispatch(commentActions.deleteCommentThunk(commentId))
        window.alert('successfully deleted comment')
    }

    return (
        <>
      <div>
        <h3>Delete Your Comment Permanetly?</h3>
        <form onSubmit={handleSubmit}>
          <button className="submit-button" type="button" onClick={()=>setShowModal(false)}>
            Cancel
          </button>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
    )
}


export default DeleteCommentPage
