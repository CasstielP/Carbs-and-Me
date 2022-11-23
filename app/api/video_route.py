from flask import Blueprint, request, jsonify, session, redirect
from app.models import db, Video
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

video_routes = Blueprint("videos", __name__)


# ------------------------GET ALL VIDEOS---------------------------------
@video_routes.route('/')
def get_all_videos():
    all_videos = []
    data = Video.query.all()
    for video in data:
        all_videos.append(video.to_dict())
    return jsonify(all_videos)


# ------------------------GET SINGLE VIDEOS---------------------------------
@video_routes.route('/<int:id>')
def get_one_video(id):
    data = Video.query.get(id).to_dict()
    return data




# ------------------------CREATE NEW VIDEO---------------------------------
@video_routes.route('', methods=['POST'])
def upload_video():
    if "video" not in request.files:
        return {"errors": "video required"}, 400
    video = request.files["video"]

    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400

    video.filename = get_unique_filename(video.filename)

    upload = upload_file_to_s3(video)


    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    new_video = Video(
        user_id=2,
        url=url,
        title='testing title',
        description='testing description',
        )
    db.session.add(new_video)
    db.session.commit()
    return 'successful'




# ------------------------UPDATE A VIDEO---------------------------------
@video_routes.route('/<int:id>', methods=['PUT'])
def update_video(id):
    video = Video.query.get(id)
    if not video:
        return {
            "message": "Video not found",
            "statusCode": 404,
        }
    data = request.get_json()
    video.title = data['title']
    video.description = data['description']
    db.session.commit()
    return data



# ------------------------DELETE A VIDEO---------------------------------
@video_routes.route('/<int:id>', methods=['DELETE'])
def delete_video(id):
    video = Video.query.get(id)
    db.session.delete(video)
    db.session.commit()
    return 'successfully deleted video'
