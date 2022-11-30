from flask import Blueprint, request, jsonify, session, redirect
from app.models import db, Comment
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

comment_routes = Blueprint("comments", __name__)


# ------------------------GET ALL VIDEO COMMENTS---------------------------------
@comment_routes.route('/videos/<int:video_id>')
def get_all_video_comments(video_id):
    all_video_comments = []
    data = Comment.query.filter(Comment.video_id==video_id).all()
    # order to change the entry orders
    for comment in data:
         all_video_comments.append(comment.to_dict())
    return jsonify( all_video_comments)



# ------------------------GET ALL USER COMMENTS---------------------------------
@comment_routes.route('/users/<int:user_id>')
def get_all_user_comments(user_id):
    all_user_comments = []
    data = Comment.query.filter(Comment.user_id==user_id).all()
    for comment in data:
         all_user_comments.append(comment.to_dict())
    return jsonify( all_user_comments)




# ------------------------GET SINGLE COMMENTS---------------------------------
@comment_routes.route('/<int:id>')
def get_one_comment(id):
    data = Comment.query.get(id).to_dict()
    return data




# ------------------------CREATE NEW COMMENT---------------------------------
@comment_routes.route('', methods=['POST'])
def create_comment():
    data = request.get_json()
    new_comment = Comment(
        user_id= data['user_id'],
        video_id=data['video_id'],
        content=data['content']
    )
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()



# ------------------------UPDATE COMMENT---------------------------------
@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "message": "Comments not found",
            "statusCode": 404,
        }
    data = request.get_json()
    comment.content = data['content']
    db.session.commit()
    return data




# ------------------------DELETE COMMENT---------------------------------
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return 'successfully deleted comment'
