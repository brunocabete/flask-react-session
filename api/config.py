from dotenv import load_dotenv
import os


load_dotenv()

class ApplicationConfig:

    SECRET_KEY = os.environ["SECRET_KEY"]
    SESSION_TYPE = 'filesystem'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{os.environ['DB_NAME']}:{os.environ['DB_PASS']}@localhost/{os.environ['DB_TABLE']}"