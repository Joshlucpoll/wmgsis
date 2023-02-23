from http.server import BaseHTTPRequestHandler
import psycopg2
import os

PGHOST = os.getenv('PGHOST')
PGDATABASE = os.getenv('PGDATABASE')
PGUSER = os.getenv('PGUSER')
PGPASSWORD = os.getenv('PGPASSWORD')
DATABASE_URL = os.getenv('DATABASE_URL')

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        con = psycopg2.connect(
          database=PGDATABASE,
          user=PGUSER,
          password=PGPASSWORD,
          host=DATABASE_URL,
          port= '5432'
        )

        self.rfile

        cursor = con.cursor()
        cursor.execute(f"SELECT * FROM users WHERE user = ")
        result = cursor.fetchall()


        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write(result.encode('utf-8'))
        return
