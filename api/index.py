from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)
from werkzeug.security import check_password_hash, generate_password_hash
import os
import psycopg2

PGHOST = os.getenv("PGHOST")
PGDATABASE = os.getenv("PGDATABASE")
PGUSER = os.getenv("PGUSER")
PGPASSWORD = os.getenv("PGPASSWORD")
DATABASE_URL = os.getenv("DATABASE_URL")

con = psycopg2.connect(
    database=PGDATABASE,
    user=PGUSER,
    password=PGPASSWORD,
    host=DATABASE_URL,
    port="5432",
)


app = Flask(__name__)
app.config.update(
    JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY"),
)

jwt = JWTManager(app)

users = {
    "username": generate_password_hash("password"),
}


def getUsers(username):
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM users WHERE username = {username}")
    result = cursor.fetchall()

    return result


@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    if username in users:
        if check_password_hash(users.get(username), password):
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token), 200

    return "Wrong credentials", 400


@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(logged_in_as=get_jwt_identity()), 200


if __name__ == "__main__":
    app.run()
