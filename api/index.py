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

    try:
        hashedPass = db.getUserPass(email)
    except:
        db.connect()
        return "Database error", 500

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

    try:
        return db.createUser(email, password)
    except:
        db.connect()
        return "Database error", 500


@app.route("/api/user/get", methods=["GET"])
@jwt_required()
def getUser():
    try:
        return jsonify(db.getUser(get_jwt_identity())), 200
    except:
        db.connect()
        return "Database error", 500


@app.route("/api/diversity/get-options", methods=["GET"])
@jwt_required()
def getDiversityOptions():
    try:
        return jsonify(db.getDiversityOptions()), 200
    except:
        db.connect()
        return "Database error", 500


@app.route("/api/diversity/get-data", methods=["POST"])
@jwt_required()
def getDiversityData():
    attribute = request.json.get("attribute")
    group = request.json.get("group")

    try:
        res = db.getDiversityData(group, attribute)
        if res:
            return jsonify(res), 200

        if res == None:
            return "Could not process parameters", 400

        if res == False:
            return "Not authorised", 401

    except:
        db.connect()
        return "Database error", 500


@app.route("/api/diversity/get-personal", methods=["GET"])
@jwt_required()
def getPersonalDiversityData():
    email = get_jwt_identity()
    try:
        res = db.getPersonalDiversityData(email)
        if res:
            return jsonify(res), 200

    except:
        db.connect()
        return "Database error", 500


@app.route("/api/diversity/set-personal", methods=["POST"])
@jwt_required()
def setPersonalDiversityData():
    email = get_jwt_identity()
    data = request.json

    try:
        res = db.setPersonalDiversityData(email, data)
        if res:
            return "Updated diversity data", 204

    except:
        db.connect()
        return "Database error", 500


if __name__ == "__main__":
    app.run()
