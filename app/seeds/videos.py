from app.models import db, Video, environment, SCHEMA


def seed_videos():
    vid1 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/blade-shredded-noodles.MOV", title="Blade Shredded Noodles with Beef in A Spicy Sauce", description="The blade-shredded noodles are one of the most popular noodle types in China, particularly in the northern region for its bouncy and chewy texture. Often comes with a bold spice-infused beef(pork)-bone broth, garnish with green veggies and fragrant herbs(cilantro) in the end for a balance of freshness. This recipe is easy to follow and when you make it, you’ll discover that the noodles, or should I say, Carbs are just as delicious if not more addictive than meat."
    )

    vid2 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/braised-pork.MOV", title="", description="good"
    )

    vid3 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/hui-noodles.MOV", title="huinoodles", description="good"
    )

    vid4 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/jennies-cookie.MOV", title="jenniecookie", description="good"
    )

    vid5 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/lurRou-rice.MOV", title="luroufan", description="good"
    )

    vid6 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/snowy-fudge.MOV", title="snowyfudge", description="good"
    )
    vid7 = Video(
        user_id=1, url="https://aaprojects.s3.us-west-1.amazonaws.com/32cdacf63b9e4fae9554ebff86fbf1ec.mp4", title="fengjing", description="good"
    )
    vid8 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/blade-shredded-noodles.MOV", title="blnoodles", description="good"
    )

    vid9 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/braised-pork.MOV", title="brpork", description="good"
    )

    vid10 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/hui-noodles.MOV", title="huinoodles", description="good"
    )

    vid11 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/jennies-cookie.MOV", title="jenniecookie", description="good"
    )

    vid12 = Video(
        user_id=2, url="https://aaprojects.s3.us-west-1.amazonaws.com/lurRou-rice.MOV", title="luroufan", description="good"
    )


    db.session.add(vid1)
    db.session.add(vid2)
    db.session.add(vid3)
    db.session.add(vid4)
    db.session.add(vid5)
    db.session.add(vid6)
    db.session.add(vid7)
    db.session.add(vid8)
    db.session.add(vid9)
    db.session.add(vid10)
    db.session.add(vid11)
    db.session.add(vid12)

    db.session.commit()


def undo_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
