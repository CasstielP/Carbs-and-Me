from flask import Blueprint, request, jsonify, session, redirect
from ffmpy import FFmpeg
from app.models import db, Video, Like, DisLike
from datetime import datetime
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

import os
from io import BytesIO


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
    thumbnail = request.files["thumbnail"]


    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400

    #uploading video file to aws s3
    video.filename = get_unique_filename(video.filename)
    video_upload = upload_file_to_s3(video)
    video_url = video_upload["url"]

    #uploading thumbnail file to aws s3
    thumbnail.filename = get_unique_filename(thumbnail.filename)
    thumbnail_upload = upload_file_to_s3(thumbnail)
    thumbnail_url = thumbnail_upload.get('url')

    if "url" not in video_upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return video_upload, 400



    # temp_video_path = os.path.join('/tmp', video.filename)
    # video.save(temp_video_path)


    #create a unique filename for the thumbnail
    # thumbnail_filename = f"{os.path.splitext(video.filename)[0]}_thumbnail.jpg"



    # Use ffmpeg to extract a frame from the video as a thumbnail
    # try:
    #     out, _ = (
    #         FFmpeg
    #         .input(video.stream)
    #         .output('pipe:', vframes=1, format='image2', vcodec='mjpeg')
    #         .run(capture_stdout=True, capture_stderr=True)
    #     )
    #     thumbnail_io = BytesIO(out)
    #     thumbnail_io.seek(0)  # Go to the beginning of the BytesIO object
    # except FFmpeg.Error as e:
    #     return {"errors": "Failed to create thumbnail"}, 500

    # thumbnail_upload = upload_file_to_s3(thumbnail_io, filename=thumbnail_filename)
    # if "url" not in thumbnail_upload:
    #     return thumbnail_upload, 400
    # thumbnail_url = thumbnail_upload["url"]

    print('==============================================',thumbnail_url)

    return {"video_url": video_url, "thumbnail_url": thumbnail_url}




# ------------------------CREATE NEW VIDEO  ---------------------------------
@video_routes.route('/new', methods=['POST'])
def upload_video_info():
    data = request.get_json()
    new_video = Video(
        url= data['url'],
        thumbnail=data['thumbnail'],
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


# ------------------------EDIT VIDEO LIKES---------------------------------
@video_routes.route('/likes', methods=['PUT'])
# <int:id>
def updateLikes():
    req = request.get_json()
    videoId = req['videoId']
    userId = req['userId']

    video = Video.query.get(videoId)

    likeExist = Like.query.filter(Like.user_id == userId, Like.video_id == videoId).one_or_none()

    if(likeExist == None):
        video.likeCount += 1;
        newLike = Like(
            user_id = userId,
            video_id = videoId
        )
        db.session.add(newLike)
        db.session.commit()
        print("ADD LIKE")
    else:
        if video.likeCount != 0:
            video.likeCount -= 1

        db.session.delete(likeExist)
        db.session.commit()
        print('REMOVE LIKES')

    data = Video.query.get(videoId).to_dict()
    return data


# ------------------------EDIT VIDEO DISLIKES---------------------------------
@video_routes.route('/dislikes', methods=['PUT'])
# <int:id>
def updateDisLikes():
    req = request.get_json()
    videoId = req['videoId']
    userId = req['userId']

    video = Video.query.get(videoId)

    DislikeExist = DisLike.query.filter(DisLike.user_id == userId, DisLike.video_id == videoId).one_or_none()

    if(DislikeExist == None):
        video.DislikeCount += 1;
        newDisLike = DisLike(
            user_id = userId,
            video_id = videoId
        )
        db.session.add(newDisLike)
        db.session.commit()
        print("ADD DISLIKE")
    else:
        if video.DislikeCount != 0:
            video.DislikeCount -= 1

        db.session.delete(DislikeExist)
        db.session.commit()
        print('REMOVE LIKES')

    data = Video.query.get(videoId).to_dict()
    return data
