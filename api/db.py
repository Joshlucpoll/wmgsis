import os
from flask import jsonify
from flask_jwt_extended import create_access_token
import psycopg2
from psycopg2 import sql
import unittest
from werkzeug.security import generate_password_hash

# load secrets to access the database with environment variables
PGHOST = os.getenv("PGHOST")
PGDATABASE = os.getenv("PGDATABASE")
PGUSER = os.getenv("PGUSER")
PGPASSWORD = os.getenv("PGPASSWORD")
DATABASE_URL = os.getenv("DATABASE_URL")


class DB:
    def __init__(self):
        self.conn = None
        self.connect()

    def connect(self):
        if self.conn:
            self.conn.close()
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

    def getDiversityOptions(self):
        cursor = self.conn.cursor()
        cursor.execute(
            """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name   = 'diversity';
            """
        )
        attributes = list(map(lambda x: x[0], cursor.fetchall()))
        attributes.remove("email")

        cursor.execute(
            """
            SELECT *
            FROM class;
            """
        )
        groups = list(map(lambda x: x[0], cursor.fetchall()))

        cursor.close()

        return {"attributes": attributes, "groups": groups}

    def getDiversityData(self, group: str, attribute: str):
        cursor = self.conn.cursor()
        try:
            cursor.execute(
                sql.SQL(
                    f"""
                        SELECT diversity.{attribute}, count(diversity.{attribute}) FROM users
                        INNER JOIN diversity ON users.email=diversity.email
                        INNER JOIN student_class as sc ON users.email=sc.student
                        INNER JOIN class ON sc.class=class.id
                        WHERE class.id = '{group}'
                        GROUP BY diversity.{attribute};
                    """
                )
            )

            result = cursor.fetchall()
            cursor.close()

            return dict(result)

        except:
            cursor.close()
            return None

    def getPersonalDiversityData(self, email: str):
        cursor = self.conn.cursor()
        cursor.execute(
            """
            SELECT gender, race, religion, sexuality, disability
            FROM diversity
            WHERE email = %s;
            """,
            (email,),
        )

        result = cursor.fetchone()
        if result:
            columns = ("gender", "race", "religion", "sexuality", "disability")
            return dict(zip(columns, result))

        return {
            "gender": None,
            "race": None,
            "religion": None,
            "sexuality": None,
            "disability": None,
        }

    def setPersonalDiversityData(self, email: str, data):
        ge, ra, re, se, di = [
            data[k] for k in ("gender", "race", "religion", "sexuality", "disability")
        ]

        cursor = self.conn.cursor()
        cursor.execute(
            """
            INSERT INTO diversity (email, gender, race, religion, sexuality, disability)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (email) 
            DO UPDATE SET
                gender = EXCLUDED.gender,
                race = EXCLUDED.race,
                religion = EXCLUDED.religion,
                sexuality = EXCLUDED.sexuality,
                disability = EXCLUDED.disability
            """,
            (email, ge, ra, re, se, di),
        )
        self.conn.commit()
        return True


class TestDatabase(unittest.TestCase):
    def testCreateUser(self):
        db = DB()
        self.assertEqual(db.createUser("new.user@example.com", 123)[1], 201)


if __name__ == "__main__":
    print("Enter test database url endpoint")
    PGHOST = "ep-weathered-cloud-790588.eu-central-1.aws.neon.tech"
    unittest.main()
