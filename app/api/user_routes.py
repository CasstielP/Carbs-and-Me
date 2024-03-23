from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/subscribe/<int:id>', methods=['POST'])
@login_required
def toggle_subscription(id):
  user_to_toggle = User.query.get(id)
#   return user_to_toggle.to_dict()
  if id == current_user.id:
     return jsonify({'message': 'you Cannot subscribe to yourself'}), 400
  if not user_to_toggle:
     return jsonify({'message': 'user not found'})

  if current_user.is_subscribed(user_to_toggle):
     current_user.unsubscribe(user_to_toggle)
     action = True
  else:
     current_user.subscribe(user_to_toggle)
     action = False
  db.session.commit()
  return user_to_toggle.to_dict()

@user_routes.route('/subscribe/<int:id>')
@login_required
def getSubStatus(id):
   user_to_check = User.query.get(id)
   status = current_user.is_subscribed(user_to_check)
   return jsonify(status)
