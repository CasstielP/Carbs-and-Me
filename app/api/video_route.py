from flask import Blueprint, request
from app.models import db, Video
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

video_routes = Blueprint("videos", __name__)


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
        user_id=1,
        url=url,
        title='testing title',
        description='testing description',
        )
    db.session.add(new_video)
    db.session.commit()
    return 'successful'
