from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comment1 = Comment(
        user_id=1, video_id=1, content='great'
    )
    comment2 = Comment(
        user_id=1, video_id=2, content='great'
    )
    comment3 = Comment(
        user_id=1, video_id=2, content='great'
    )
    comment4 = Comment(
        user_id=1, video_id=3, content='great'
    )
    comment5 = Comment(
        user_id=1, video_id=3, content='great'
    )
    comment6 = Comment(
        user_id=1, video_id=4, content='great'
    )
    comment7 = Comment(
        user_id=1, video_id=6, content='great'
    )
    comment8 = Comment(
        user_id=2, video_id=7, content='great'
    )
    comment9 = Comment(
        user_id=2, video_id=7, content='great'
    )
    comment10 = Comment(
        user_id=2, video_id=7, content='great'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
