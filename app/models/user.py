from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True, default=None)

    videos = db.relationship('Video', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship("Like", back_populates='user')
    dislikes = db.relationship('DisLike', back_populates='user')
    cmtlikes = db.relationship('CmtLike', back_populates='user')
    cmtdislikes = db.relationship('CmtDisLike', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'profile_pic': self.profile_pic
        }



class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    url = db.Column(db.String(200), nullable=False)
    thumbnail = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    likeCount = db.Column(db.Integer, nullable=False, default=0)
    DislikeCount = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='videos')
    comments = db.relationship('Comment', back_populates='video', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='video')
    dislikes = db.relationship('DisLike', back_populates='video')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'url': self.url,
            'thumbnail': self.thumbnail,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at,
            'comments': self.comments_to_dict(),
            'user': self.user.to_dict(),
            'likes': [like.to_dict() for like in list(Like.query.filter(self.id == Like.video_id).all())],
            'dislikes': [dislike.to_dict() for dislike in list(DisLike.query.filter(self.id == DisLike.video_id).all())],
        }

    def comments_to_dict(self):
        cmt_dict = {}
        for comment in self.comments:
            cmt_dict[comment.to_dict()['id']] = comment.to_dict()
        return cmt_dict


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    video_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('videos.id')
    ))
    content = db.Column(db.String(2000), nullable=False)
    likeCount = db.Column(db.Integer, nullable=False, default=0)
    DislikeCount = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='comments')
    video = db.relationship('Video', back_populates='comments')
    cmtlikes = db.relationship('CmtLike', back_populates='comment')
    cmtdislikes = db.relationship('CmtDisLike', back_populates='comment')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'content': self.content,
            'created_at': self.created_at,
            'user': self.user.to_dict(),
            'likes': [like.to_dict() for like in list(CmtLike.query.filter(self.id == CmtLike.comment_id).all())],
            'dislikes': [dislike.to_dict() for dislike in list(CmtDisLike.query.filter(self.id == CmtDisLike.comment_id).all())]
        }


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("videos.id")
    ), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("users.id")
    ), nullable=False)

    video = db.relationship("Video", back_populates='likes')
    user = db.relationship("User", back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'videoId': self.video_id,
            'userId': self.user_id
        }


class DisLike(db.Model):
    __tablename__ = 'dislikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("videos.id")
    ), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("users.id")
    ), nullable=False)

    video = db.relationship("Video", back_populates='dislikes')
    user = db.relationship("User", back_populates='dislikes')

    def to_dict(self):
        return {
            'id': self.id,
            'videoId': self.video_id,
            'userId': self.user_id
        }


class CmtLike(db.Model):
    __tablename__ = 'cmtlikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("comments.id")
    ), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("users.id")
    ), nullable=False)

    comment = db.relationship("Comment", back_populates='cmtlikes')
    user = db.relationship("User", back_populates='cmtlikes')

    def to_dict(self):
        return {
            'id': self.id,
            'commentId': self.comment_id,
            'userId': self.user_id
        }


class CmtDisLike(db.Model):
    __tablename__ = 'cmtdislikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("comments.id")
    ), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey (
        add_prefix_for_prod("users.id")
    ), nullable=False)

    comment = db.relationship("Comment", back_populates='cmtdislikes')
    user = db.relationship("User", back_populates='cmtdislikes')

    def to_dict(self):
        return {
            'id': self.id,
            'commentId': self.comment_id,
            'userId': self.user_id
        }
