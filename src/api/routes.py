from flask import request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import APIException

api = Blueprint('api', __name__)
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token, "msg": "Login successful"}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "msg": "This is a private route",
        "email": user.email
    }), 200