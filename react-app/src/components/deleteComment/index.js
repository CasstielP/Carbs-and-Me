import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'

const DeleteCommentPage = ({comment, setShowModal}) => {
    const dispatch = useDispatch()

    // useEffect(()=>{
    //   dispatch(commentActions.fetchAllComments(comment.video_id))

    // }, [comment.video_id])

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false)
        dispatch(commentActions.deleteCommentThunk(comment.id))
        window.alert('successfully deleted comment')
    }

    return (
        <>
      <div>
        <h3>Delete Your Comment Permanetly?</h3>
        <form onSubmit={handleSubmit}>
          <button className="sd-ce-button" type="button" onClick={()=>setShowModal(false)}>
            Cancel
          </button>
          <button className="sd-ce-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
    )
}


export default DeleteCommentPage
