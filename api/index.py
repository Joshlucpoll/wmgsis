from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)
from werkzeug.security import check_password_hash
from datetime import timedelta
import os
from .db import DB


db = DB()
app = Flask(__name__)
app.config.update(
    JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY"),
)

jwt = JWTManager(app)


@app.route("/api/auth/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    hashedPass = db.getUserPass(email)

    if hashedPass:
        if check_password_hash(hashedPass, password):
            access_token = create_access_token(
                identity=email, expires_delta=timedelta(minutes=20)
            )
            return jsonify(access_token=access_token), 200

    return "Wrong credentials", 400


@app.route("/api/auth/create-user", methods=["POST"])
def createUser():
    email = request.json.get("email")
    password = request.json.get("password")

    return db.createUser(email, password)


@app.route("/api/user/get", methods=["GET"])
@jwt_required()
def getUser():
    return jsonify(db.getUser(get_jwt_identity())), 200


if __name__ == "__main__":
    app.run()
