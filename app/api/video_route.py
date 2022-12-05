from flask import Blueprint, request, jsonify, session, redirect
from app.models import db, Video
from datetime import datetime
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

video_routes = Blueprint("videos", __name__)




# ------------------------GET ALL VIDEOS---------------------------------
@video_routes.route('/')
# @login_required
def get_all_videos():
    all_videos = []
    data = Video.query.all()
    for video in data:
        all_videos.append(video.to_dict())
    return jsonify(all_videos)




# ------------------------GET USER VIDEOS---------------------------------
@video_routes.route('/users/<int:user_id>')
def get_user_videos(user_id):
    all_user_videos = []
    data = Video.query.filter(Video.user_id == user_id).all()
    for video in data:
        all_user_videos.append(video.to_dict())
    return jsonify(all_user_videos)




# ------------------------GET SINGLE VIDEOS---------------------------------
@video_routes.route('/<int:id>')
def get_one_video(id):
    data = Video.query.get(id).to_dict()
    return data




# ------------------------CREATE NEW VIDEO URL ---------------------------------
@video_routes.route('', methods=['POST'])
def upload_video():
    # if "video" not in request.files:
    #     return {"errors": "video required"}, 400
    video = request.files["video"]
    title = request.get_data()

    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400

    video.filename = get_unique_filename(video.filename)
    print(video)

    upload = upload_file_to_s3(video)


    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # title = videoInfo['title']
    # user_id = videoInfo['user_id']
    # description = videoInfo['description']

    # new_video = Video(
    #     user_id=user_id,
    #     url=url,
    #     title=title,
    #     description=description
    #     )
    # db.session.add(new_video)
    # db.session.commit()
    print('==============================================',url)
    return url




# ------------------------CREATE NEW VIDEO  ---------------------------------
@video_routes.route('/new', methods=['POST'])
def upload_video_info():
    data = request.get_json()
    new_video = Video(
        url= data['url'],
        user_id=data['user_id'],
        title=data['title'],
        description=data['description'],
        created_at =datetime.now()

        )
    print('================got here', data)
    db.session.add(new_video)
    db.session.commit()
    return new_video.to_dict()



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
    return video.to_dict()



# ------------------------DELETE A VIDEO---------------------------------
@video_routes.route('/<int:id>', methods=['DELETE'])
def delete_video(id):
    video = Video.query.get(id)
    db.session.delete(video)
    db.session.commit()
    return 'successfully deleted video'
