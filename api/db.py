import os
from flask import jsonify
from flask_jwt_extended import create_access_token
import psycopg2
from werkzeug.security import generate_password_hash

# load secrets to access the database with environment variables
PGHOST = os.getenv("PGHOST")
PGDATABASE = os.getenv("PGDATABASE")
PGUSER = os.getenv("PGUSER")
PGPASSWORD = os.getenv("PGPASSWORD")
DATABASE_URL = os.getenv("DATABASE_URL")


class DB:
    def __init__(self):
        # connection to database
        self.conn = psycopg2.connect(
            database=PGDATABASE,
            user=PGUSER,
            password=PGPASSWORD,
            host=PGHOST,
            port="5432",
        )
        # all actions are auto committed
        self.conn.set_session(autocommit=True)

    def getUserPass(self, email: str):
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT password FROM users WHERE email = %(email)s;", {"email": email}
        )
        result = cursor.fetchone()
        cursor.close()

        try:
            return result[0]
        except:
            return None

    def getUser(self, email: str):
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT email, role, auth_level, image_url FROM users WHERE email = %(email)s;",
            {"email": email},
        )
        result = cursor.fetchone()
        cursor.close()

        return dict(zip(("email", "role", "authLevel", "imageUrl"), result))

    def createUser(self, email: str, password: str):
        # if user already exists
        if self.getUserPass(email):
            return jsonify(message="Email already exists"), 409

        try:
            cursor = self.conn.cursor()
            # SQL statement to add user to database
            cursor.execute(
                """
                INSERT INTO users (email, password, image_url, auth_level, role)
                VALUES (%(email)s, %(password)s, null, 'user', 'Student');
                """,
                {"email": email, "password": generate_password_hash(password)},
            )
            cursor.close()

            # return with access token
            access_token = create_access_token(identity=email)
            return (
                jsonify(access_token=access_token, message="User created successfully"),
                201,
            )

        except Exception as e:
            return jsonify(message="Failed to create new user"), 500
